/* ================= ROOM DATA ================= */

const rooms = {

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


/* ================= FILTER ROOMS ================= */

function filterRooms() {

    const searchText =
        document
            .getElementById("roomSearch")
            .value
            .toLowerCase();


    const guestFilter =
        document
            .getElementById("guestFilter")
            .value;


    const priceFilter =
        document
            .getElementById("priceFilter")
            .value;


    const roomItems =
        document.querySelectorAll(".room-item");


    let visibleRooms = 0;


    roomItems.forEach(function(room) {


        const name =
            room.dataset.name.toLowerCase();


        const guests =
            room.dataset.guests;


        const price =
            Number(room.dataset.price);


        const matchesSearch =
            name.includes(searchText);


        const matchesGuests =
            guestFilter === "all" ||
            guests === guestFilter;


        const matchesPrice =
            priceFilter === "all" ||
            price <= Number(priceFilter);


        if (
            matchesSearch &&
            matchesGuests &&
            matchesPrice
        ) {

            room.style.display = "";

            visibleRooms++;

        } else {

            room.style.display = "none";

        }

    });


    document.getElementById("roomCount").textContent =
        visibleRooms + " rooms available";


    if (visibleRooms === 0) {

        document
            .getElementById("noResults")
            .style.display = "block";

    } else {

        document
            .getElementById("noResults")
            .style.display = "none";

    }

}


/* ================= ROOM DETAILS ================= */

let selectedRoom = "";


function showRoomDetails(roomName) {

    const room =
        rooms[roomName];


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
        .textContent =
            room.price;


    const modal =
        new bootstrap.Modal(
            document.getElementById("roomModal")
        );


    modal.show();

}


/* ================= BOOK ROOM ================= */

function goToBooking() {

    if (!selectedRoom) {

        return;

    }


    /*
        booking.html will be created next.

        The selected room is passed
        through the URL.
    */

    window.location.href =
        "booking.html?room=" +
        encodeURIComponent(selectedRoom);

}


/* ================= SEARCH FROM HOME ================= */

function focusRoomSearch() {

    const searchInput =
        document.getElementById("roomSearch");


    searchInput.focus();


    searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* ================= LOAD SEARCH FROM URL ================= */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const search =
            params.get("search");


        if (search) {

            document
                .getElementById("roomSearch")
                .value = search;


            filterRooms();

        }

    }
);

