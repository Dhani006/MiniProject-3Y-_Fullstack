const params = new URLSearchParams(window.location.search);


// GET BOOKING DATA

const room = params.get("room") || "";
const checkIn = params.get("checkIn") || "";
const checkOut = params.get("checkOut") || "";
const guests = params.get("guests") || "1";
const rooms = params.get("rooms") || "1";
const rate = params.get("rate") || "";
const price = Number(params.get("price")) || 0;
const total = Number(params.get("total")) || 0;


// GET GUEST DATA

const firstName = params.get("firstName") || "";
const lastName = params.get("lastName") || "";
const email = params.get("email") || "";
const phone = params.get("phone") || "";
const address = params.get("address") || "";
const city = params.get("city") || "";
const country = params.get("country") || "";
const specialRequest = params.get("specialRequest") || "";


// CALCULATE NIGHTS

let nights = 1;

if (checkIn && checkOut) {

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const difference = endDate - startDate;

    nights = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    if (nights < 1) {
        nights = 1;
    }
}


// GENERATE RESERVATION ID

let reservationId =
    localStorage.getItem("glaReservationId");

if (!reservationId) {

    reservationId =
        "GLA-" +
        Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem(
        "glaReservationId",
        reservationId
    );
}


// CREATE COMPLETE RESERVATION OBJECT

const reservation = {

    reservationId: reservationId,

    room: room,

    rate: rate,

    checkIn: checkIn,

    checkOut: checkOut,

    guests: guests,

    rooms: rooms,

    nights: nights,

    price: price,

    total: total,

    firstName: firstName,

    lastName: lastName,

    email: email,

    phone: phone,

    address: address,

    city: city,

    country: country,

    specialRequest: specialRequest,

    status: "Confirmed"

};


// SAVE COMPLETE RESERVATION

localStorage.setItem(
    "glaReservation",
    JSON.stringify(reservation)
);


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


// DISPLAY DATA ON CONFIRMATION PAGE

document.getElementById("reservationId")
    .textContent = reservationId;

document.getElementById("roomName")
    .textContent = room || "Room";

document.getElementById("rateName")
    .textContent = rate || "Standard";

document.getElementById("checkIn")
    .textContent = formatDate(checkIn);

document.getElementById("checkOut")
    .textContent = formatDate(checkOut);

document.getElementById("guests")
    .textContent =
    guests +
    (Number(guests) === 1
        ? " Guest"
        : " Guests");

document.getElementById("rooms")
    .textContent =
    rooms +
    (Number(rooms) === 1
        ? " Room"
        : " Rooms");


document.getElementById("guestName")
    .textContent =
    `${firstName} ${lastName}`.trim() || "-";

document.getElementById("guestEmail")
    .textContent =
    email || "-";

document.getElementById("guestPhone")
    .textContent =
    phone || "-";


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


document.getElementById("specialRequest")
    .textContent =
    specialRequest || "No special requests.";


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