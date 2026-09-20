const roomData = {

    "Deluxe Room": {
        image: "assets/room-deluxe.webp",
        title: "Deluxe Room",
        description: "A comfortable and elegant room designed for a relaxing stay.",
        guests: "Up to 2 Guests",
        bed: "King Bed",
        price: 4500
    },

    "Executive Suite": {
        image: "assets/room-suite.webp",
        title: "Executive Suite",
        description: "A spacious suite offering premium comfort and a refined stay.",
        guests: "Up to 4 Guests",
        bed: "King Bed",
        price: 8200
    },

    "Premium Sea View": {
        image: "assets/room-seaview.webp",
        title: "Premium Sea View",
        description: "Enjoy beautiful views and a peaceful premium accommodation experience.",
        guests: "Up to 4 Guests",
        bed: "King Bed",
        price: 6800
    },

    "Private Pool Villa": {
        image: "assets/room-villa.webp",
        title: "Private Pool Villa",
        description: "A luxurious private villa with an exclusive pool and premium amenities.",
        guests: "Up to 4 Guests",
        bed: "King Bed",
        price: 12000
    }

};


let selectedRoom = null;


/* ================= LOAD ROOM ================= */

function loadRoom() {

    const params = new URLSearchParams(window.location.search);

    const roomName = params.get("room");

    if (!roomName || !roomData[roomName]) {

        document.getElementById("roomName").textContent =
            "No Room Selected";

        document.getElementById("roomTitle").textContent =
            "Please select a room first";

        return;
    }

    selectedRoom = roomData[roomName];

    document.getElementById("roomName").textContent =
        roomName;

    document.getElementById("roomTitle").textContent =
        selectedRoom.title;

    document.getElementById("roomDescription").textContent =
        selectedRoom.description;

    document.getElementById("roomGuests").textContent =
        selectedRoom.guests;

    document.getElementById("roomBed").textContent =
        selectedRoom.bed;

    document.getElementById("roomPrice").textContent =
        selectedRoom.price.toLocaleString("en-IN");

    document.getElementById("roomImage").src =
        selectedRoom.image;

    document.getElementById("roomImage").alt =
        selectedRoom.title;

    document.getElementById("summaryRoom").textContent =
        roomName;

    document.getElementById("summaryPrice").textContent =
        selectedRoom.price.toLocaleString("en-IN");
}


/* ================= DATES ================= */

function setMinimumDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;

    document.getElementById("checkIn").min =
        todayString;

    document.getElementById("checkOut").min =
        todayString;
}


/* ================= CALCULATE NIGHTS ================= */

function calculateNights() {

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;

    if (!checkIn || !checkOut) {

        document.getElementById("summaryNights").textContent =
            "0";

        document.getElementById("summaryTotal").textContent =
            "0";

        return;
    }


    const startDate =
        new Date(checkIn);

    const endDate =
        new Date(checkOut);


    const difference =
        endDate - startDate;


    const nights =
        difference / (1000 * 60 * 60 * 24);


    if (nights <= 0) {

        document.getElementById("summaryNights").textContent =
            "0";

        document.getElementById("summaryTotal").textContent =
            "0";

        return;
    }


    const numberOfRooms =
        Number(document.getElementById("rooms").value);


    const total =
        selectedRoom.price *
        nights *
        numberOfRooms;


    document.getElementById("summaryNights").textContent =
        nights;


    document.getElementById("summaryTotal").textContent =
        total.toLocaleString("en-IN");
}


/* ================= UPDATE SUMMARY ================= */

function updateSummary() {

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;

    const guests =
        document.getElementById("guests").value;

    const rooms =
        document.getElementById("rooms").value;


    document.getElementById("summaryCheckIn").textContent =
        checkIn || "-";


    document.getElementById("summaryCheckOut").textContent =
        checkOut || "-";


    document.getElementById("summaryGuests").textContent =
        guests;


    document.getElementById("summaryRooms").textContent =
        rooms;


    calculateNights();
}


/* ================= CONTINUE ================= */

function continueBooking() {

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;

    const guests =
        document.getElementById("guests").value;

    const rooms =
        document.getElementById("rooms").value;


    const error =
        document.getElementById("bookingError");


    error.style.display = "none";


    if (!selectedRoom) {

        error.textContent =
            "Please select a room before continuing.";

        error.style.display = "block";

        return;
    }


    if (!checkIn || !checkOut) {

        error.textContent =
            "Please select your check-in and check-out dates.";

        error.style.display = "block";

        return;
    }


    if (checkOut <= checkIn) {

        error.textContent =
            "Check-out date must be after check-in date.";

        error.style.display = "block";

        return;
    }


    const url =
        "availability.html" +
        "?room=" + encodeURIComponent(getRoomName()) +
        "&checkIn=" + encodeURIComponent(checkIn) +
        "&checkOut=" + encodeURIComponent(checkOut) +
        "&guests=" + encodeURIComponent(guests) +
        "&rooms=" + encodeURIComponent(rooms);


    window.location.href = url;
}


/* ================= GET ROOM NAME ================= */

function getRoomName() {

    const params =
        new URLSearchParams(window.location.search);

    return params.get("room");
}


/* ================= EVENTS ================= */

document.addEventListener("DOMContentLoaded", function () {

    loadRoom();

    setMinimumDate();


    document
        .getElementById("checkIn")
        .addEventListener("change", function () {

            document.getElementById("checkOut").min =
                this.value;

            updateSummary();

        });


    document
        .getElementById("checkOut")
        .addEventListener("change", updateSummary);


    document
        .getElementById("guests")
        .addEventListener("change", updateSummary);


    document
        .getElementById("rooms")
        .addEventListener("change", updateSummary);

});