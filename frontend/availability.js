/* ================= GET BOOKING DATA ================= */

const params =
    new URLSearchParams(window.location.search);


const roomName =
    params.get("room");


const checkIn =
    params.get("checkIn");


const checkOut =
    params.get("checkOut");


const guests =
    params.get("guests");


const rooms =
    params.get("rooms");


/* ================= ROOM DATA ================= */

const roomData = {

    "Deluxe Room": {
        price: 4500
    },

    "Executive Suite": {
        price: 8200
    },

    "Premium Sea View": {
        price: 6800
    },

    "Private Pool Villa": {
        price: 12000
    }

};


/* ================= LOAD BOOKING SUMMARY ================= */

function loadSummary() {

    document.getElementById("summaryRoom")
        .textContent = roomName || "-";


    document.getElementById("summaryCheckIn")
        .textContent = checkIn || "-";


    document.getElementById("summaryCheckOut")
        .textContent = checkOut || "-";


    document.getElementById("summaryGuests")
        .textContent =
        guests
            ? guests + " Guest(s)"
            : "-";


    const nights =
        calculateNights();


    document.getElementById("summaryNights")
        .textContent =
        nights > 0
            ? nights
            : "-";

}


/* ================= CALCULATE NIGHTS ================= */

function calculateNights() {

    if (!checkIn || !checkOut) {

        return 0;

    }


    const startDate =
        new Date(checkIn);


    const endDate =
        new Date(checkOut);


    const difference =
        endDate - startDate;


    const nights =
        difference /
        (1000 * 60 * 60 * 24);


    if (nights <= 0) {

        return 0;

    }


    return nights;

}


/* ================= GET ROOM PRICE ================= */

function getRoomPrice() {

    if (
        !roomName ||
        !roomData[roomName]
    ) {

        return 4500;

    }


    return roomData[roomName].price;

}


/* ================= LOAD RATES ================= */

function loadRates() {

    const basePrice =
        getRoomPrice();


    /*
        Number of rooms
    */

    const numberOfRooms =
        Number(rooms) || 1;


    const nights =
        calculateNights();


    /*
        Rate prices
    */

    const standardPrice =
        basePrice;


    const breakfastPrice =
        basePrice + 1000;


    const premiumPrice =
        basePrice + 2500;


    /*
        Update nightly prices
    */

    document.getElementById(
        "standardPrice"
    ).textContent =
        standardPrice.toLocaleString("en-IN");


    document.getElementById(
        "breakfastPrice"
    ).textContent =
        breakfastPrice.toLocaleString("en-IN");


    document.getElementById(
        "premiumPrice"
    ).textContent =
        premiumPrice.toLocaleString("en-IN");


    /*
        Calculate totals
    */

    const standardTotal =
        standardPrice *
        nights *
        numberOfRooms;


    const breakfastTotal =
        breakfastPrice *
        nights *
        numberOfRooms;


    const premiumTotal =
        premiumPrice *
        nights *
        numberOfRooms;


    /*
        Update totals
    */

    document.getElementById(
        "standardTotal"
    ).textContent =
        standardTotal.toLocaleString("en-IN");


    document.getElementById(
        "breakfastTotal"
    ).textContent =
        breakfastTotal.toLocaleString("en-IN");


    document.getElementById(
        "premiumTotal"
    ).textContent =
        premiumTotal.toLocaleString("en-IN");

}


/* ================= SELECT RATE ================= */

function selectRate(rateName) {

    if (
        !roomName ||
        !checkIn ||
        !checkOut
    ) {

        alert(
            "Booking information is missing. Please return to the booking page."
        );

        return;

    }


    const nights =
        calculateNights();


    const numberOfRooms =
        Number(rooms) || 1;


    const basePrice =
        getRoomPrice();


    let ratePrice = 0;


    if (rateName === "Standard Rate") {

        ratePrice =
            basePrice;

    }


    if (rateName === "Breakfast Rate") {

        ratePrice =
            basePrice + 1000;

    }


    if (rateName === "Premium Rate") {

        ratePrice =
            basePrice + 2500;

    }


    const total =
        ratePrice *
        nights *
        numberOfRooms;


    /*
        Send selected booking
        information to Booking Details.
    */

    const url =
        "booking-details.html" +
        "?room=" +
        encodeURIComponent(roomName) +

        "&checkIn=" +
        encodeURIComponent(checkIn) +

        "&checkOut=" +
        encodeURIComponent(checkOut) +

        "&guests=" +
        encodeURIComponent(guests || 1) +

        "&rooms=" +
        encodeURIComponent(numberOfRooms) +

        "&rate=" +
        encodeURIComponent(rateName) +

        "&price=" +
        encodeURIComponent(ratePrice) +

        "&total=" +
        encodeURIComponent(total);


    window.location.href = url;

}


/* ================= BACK TO BOOKING ================= */

function goBackToBooking() {

    let url =
        "booking.html";


    if (roomName) {

        url +=
            "?room=" +
            encodeURIComponent(roomName);

    }


    window.location.href = url;

}


/* ================= INITIALIZE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadSummary();

        loadRates();

    }
);