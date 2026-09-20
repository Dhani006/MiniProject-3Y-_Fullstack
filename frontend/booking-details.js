const params = new URLSearchParams(window.location.search);

const room = params.get("room") || "Deluxe Room";
const checkIn = params.get("checkIn") || "";
const checkOut = params.get("checkOut") || "";
const guests = params.get("guests") || "1";
const rooms = params.get("rooms") || "1";
const rate = params.get("rate") || "Standard";
const price = Number(params.get("price")) || 0;
const total = Number(params.get("total")) || 0;


// Calculate nights
let nights = 1;

if (checkIn && checkOut) {

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const difference = endDate - startDate;

    nights = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (nights < 1) {
        nights = 1;
    }
}


// Format date
function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


// Format currency
function formatPrice(value) {

    return "₹" + Number(value).toLocaleString("en-IN");
}


// Display information

document.getElementById("summaryRoom").textContent = room;

document.getElementById("summaryRate").textContent = rate;

document.getElementById("summaryCheckIn").textContent =
    formatDate(checkIn);

document.getElementById("summaryCheckOut").textContent =
    formatDate(checkOut);

document.getElementById("summaryGuests").textContent =
    guests + (guests == 1 ? " Guest" : " Guests");

document.getElementById("summaryRooms").textContent =
    rooms + (rooms == 1 ? " Room" : " Rooms");

document.getElementById("summaryNights").textContent =
    nights + (nights == 1 ? " Night" : " Nights");

document.getElementById("nightlyPrice").textContent =
    formatPrice(price);

document.getElementById("priceNights").textContent =
    nights;

document.getElementById("priceRooms").textContent =
    rooms;

document.getElementById("totalPrice").textContent =
    formatPrice(total);


// FORM SUBMISSION

document.getElementById("bookingForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const country = document.getElementById("country").value.trim();
    const specialRequest =
        document.getElementById("specialRequest").value.trim();

    const terms = document.getElementById("terms").checked;


    if (!firstName || !lastName || !email || !phone) {

        alert("Please fill in all required fields.");

        return;
    }


    if (!terms) {

        alert("Please accept the Terms & Conditions.");

        return;
    }


    const confirmationURL =
        "confirmation.html" +
        "?room=" + encodeURIComponent(room) +
        "&checkIn=" + encodeURIComponent(checkIn) +
        "&checkOut=" + encodeURIComponent(checkOut) +
        "&guests=" + encodeURIComponent(guests) +
        "&rooms=" + encodeURIComponent(rooms) +
        "&rate=" + encodeURIComponent(rate) +
        "&price=" + encodeURIComponent(price) +
        "&total=" + encodeURIComponent(total) +
        "&firstName=" + encodeURIComponent(firstName) +
        "&lastName=" + encodeURIComponent(lastName) +
        "&email=" + encodeURIComponent(email) +
        "&phone=" + encodeURIComponent(phone) +
        "&address=" + encodeURIComponent(address) +
        "&city=" + encodeURIComponent(city) +
        "&country=" + encodeURIComponent(country) +
        "&specialRequest=" + encodeURIComponent(specialRequest);


    window.location.href = confirmationURL;

});