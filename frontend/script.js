/* ================= BOOKING SEARCH ================= */

function searchRooms() {

    const checkIn =
        document.getElementById("checkIn").value;

    const checkOut =
        document.getElementById("checkOut").value;

    const guests =
        document.getElementById("guests").value;


    if (!checkIn || !checkOut) {

        alert(
            "Please select your check-in and check-out dates."
        );

        return;
    }


    if (checkOut <= checkIn) {

        alert(
            "Check-out date must be after check-in date."
        );

        return;
    }


    /*
        For now this sends the user to
        the Rooms page.

        Later we will pass:
        dates + guests
        to the booking flow.
    */

    window.location.href =
        "rooms.html?checkIn=" +
        checkIn +
        "&checkOut=" +
        checkOut +
        "&guests=" +
        guests;
}


/* ================= SEARCH POPUP ================= */

function openSearch() {

    document
        .getElementById("searchOverlay")
        .classList.add("show");


    document
        .getElementById("siteSearch")
        .focus();
}


function closeSearch() {

    document
        .getElementById("searchOverlay")
        .classList.remove("show");


    document
        .getElementById("searchMessage")
        .textContent = "";


    document
        .getElementById("siteSearch")
        .value = "";
}


function performSearch() {

    const searchText =
        document
            .getElementById("siteSearch")
            .value
            .trim();


    const message =
        document.getElementById("searchMessage");


    if (!searchText) {

        message.textContent =
            "Please enter something to search.";

        return;
    }


    /*
        Send the search to the Rooms page.
    */

    window.location.href =
        "rooms.html?search=" +
        encodeURIComponent(searchText);
}


/* ================= ROOM DATA ================= */

const roomData = {

    "Deluxe Room": {

        image: "assets/room-deluxe.jpg",

        description:
            "A perfect blend of comfort and elegance. Enjoy a relaxing stay with modern facilities and a comfortable king-size bed.",

        guests: "2 Guests",

        bed: "1 King Bed",

        price: "₹4,500 / night"

    },


    "Executive Suite": {

        image: "assets/room-suite.jpg",

        description:
            "More space for a memorable stay. The Executive Suite provides extra comfort and a spacious environment for guests.",

        guests: "4 Guests",

        bed: "1 King Bed",

        price: "₹8,200 / night"

    },


    "Premium Sea View": {

        image: "assets/room-seaview.jpg",

        description:
            "Wake up to breathtaking views. Enjoy a comfortable room with beautiful surroundings and premium facilities.",

        guests: "2 Guests",

        bed: "1 King Bed",

        price: "₹6,800 / night"

    },


    "Private Pool Villa": {

        image: "assets/room-villa.jpg",

        description:
            "Your own private escape. Enjoy additional privacy, spacious accommodation and a luxurious stay.",

        guests: "4 Guests",

        bed: "2 Beds",

        price: "₹12,000 / night"

    }

};


/* ================= SELECTED ROOM ================= */

let selectedRoom = "";


/* ================= ROOM DETAILS ================= */

function showRoomDetails(roomName) {

    const room =
        roomData[roomName];


    if (!room) {
        return;
    }


    selectedRoom = roomName;


    document
        .getElementById("modalRoomName")
        .textContent = roomName;


    document
        .getElementById("modalRoomTitle")
        .textContent = roomName;


    document
        .getElementById("modalRoomImage")
        .src = room.image;


    document
        .getElementById("modalRoomDescription")
        .textContent = room.description;


    document
        .getElementById("modalGuests")
        .innerHTML =
            '<i class="bi bi-people"></i> ' +
            room.guests;


    document
        .getElementById("modalBed")
        .innerHTML =
            '<i class="bi bi-bed"></i> ' +
            room.bed;


    document
        .getElementById("modalPrice")
        .textContent = room.price;


    const modalElement =
        document.getElementById("roomModal");


    const modal =
        new bootstrap.Modal(modalElement);


    modal.show();

}


/* ================= GO TO BOOKING ================= */

function goToBooking() {

    if (!selectedRoom) {

        return;

    }


    /*
        The booking page doesn't exist yet.

        Once we create booking.html,
        this will carry the selected room.
    */

    window.location.href =
        "booking.html?room=" +
        encodeURIComponent(selectedRoom);

}


/* ================= ESCAPE KEY ================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeSearch();

        }

    }
);

