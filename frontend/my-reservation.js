// GET SAVED RESERVATION

const savedReservation =
    localStorage.getItem("glaReservation");


// CHECK IF RESERVATION EXISTS

if (!savedReservation) {

    alert("No reservation found.");

    window.location.href = "index.html";

}


// CONVERT JSON TO OBJECT

const reservation =
    JSON.parse(savedReservation);


// GET DATA

const reservationId =
    reservation.reservationId;

const room =
    reservation.room;

const rate =
    reservation.rate;

const checkIn =
    reservation.checkIn;

const checkOut =
    reservation.checkOut;

const guests =
    reservation.guests;

const rooms =
    reservation.rooms;

const nights =
    reservation.nights;

const price =
    reservation.price;

const total =
    reservation.total;

const firstName =
    reservation.firstName;

const lastName =
    reservation.lastName;

const email =
    reservation.email;

const phone =
    reservation.phone;

const city =
    reservation.city;

const country =
    reservation.country;

const specialRequest =
    reservation.specialRequest;


// FORMAT DATE

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// FORMAT PRICE

function formatPrice(value) {

    return "₹" +
        Number(value).toLocaleString("en-IN");
}


// RESERVATION ID

document.getElementById("reservationId")
    .textContent =
    reservationId;


// ROOM

document.getElementById("roomName")
    .textContent =
    room || "-";

document.getElementById("rateName")
    .textContent =
    rate || "-";


// DATES

document.getElementById("checkIn")
    .textContent =
    formatDate(checkIn);

document.getElementById("checkOut")
    .textContent =
    formatDate(checkOut);


// NIGHTS

document.getElementById("nights")
    .textContent =
    nights +
    (Number(nights) === 1
        ? " Night"
        : " Nights");


// GUESTS

document.getElementById("guests")
    .textContent =
    guests +
    (Number(guests) === 1
        ? " Guest"
        : " Guests");


// GUEST NAME

document.getElementById("guestName")
    .textContent =
    `${firstName} ${lastName}`.trim() || "-";


// EMAIL

document.getElementById("guestEmail")
    .textContent =
    email || "-";


// PHONE

document.getElementById("guestPhone")
    .textContent =
    phone || "-";


// LOCATION

let locationText = "";

if (city) {
    locationText = city;
}

if (country) {

    if (locationText) {
        locationText += ", ";
    }

    locationText += country;
}

document.getElementById("guestLocation")
    .textContent =
    locationText || "-";


// SPECIAL REQUEST

document.getElementById("specialRequest")
    .textContent =
    specialRequest || "No special requests.";


// PAYMENT

document.getElementById("nightlyPrice")
    .textContent =
    formatPrice(price);

document.getElementById("numberOfNights")
    .textContent =
    nights;

document.getElementById("numberOfRooms")
    .textContent =
    rooms;

document.getElementById("totalPrice")
    .textContent =
    formatPrice(total);


// PRINT

function printReservation() {

    window.print();

}