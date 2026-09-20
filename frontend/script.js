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


    window.location.href =
        "rooms.html?checkIn=" +
        encodeURIComponent(checkIn) +
        "&checkOut=" +
        encodeURIComponent(checkOut) +
        "&guests=" +
        encodeURIComponent(guests);
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


    window.location.href =
        "rooms.html?search=" +
        encodeURIComponent(searchText);
}


/* ================= ROOM DATA ================= */

const roomData = {

    "Deluxe Room": {

        image: "assets/room-deluxe.webp",

        description:
            "A perfect blend of comfort and elegance. Enjoy a relaxing stay with modern facilities and a comfortable king-size bed.",

        guests: "2 Guests",

        bed: "1 King Bed",

        price: "₹4,500 / night"

    },


    "Executive Suite": {

        image: "assets/room-suite.webp",

        description:
            "More space for a memorable stay. The Executive Suite provides extra comfort and a spacious environment for guests.",

        guests: "4 Guests",

        bed: "1 King Bed",

        price: "₹8,200 / night"

    },


    "Premium Sea View": {

        image: "assets/room-seaview.webp",

        description:
            "Wake up to breathtaking views. Enjoy a comfortable room with beautiful surroundings and premium facilities.",

        guests: "2 Guests",

        bed: "1 King Bed",

        price: "₹6,800 / night"

    },


    "Private Pool Villa": {

        image: "assets/room-villa.webp",

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
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );


    modal.show();

}


/* ================= GO TO BOOKING ================= */

function goToBooking() {

    if (!selectedRoom) {
        return;
    }


    window.location.href =
        "booking.html?room=" +
        encodeURIComponent(selectedRoom);

}


/* =========================================================
   LOGIN / SIGNUP
========================================================= */


/* OPEN AUTH MODAL */

function openAuthModal(type) {

    const modalElement =
        document.getElementById("authModal");


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );


    switchAuth(type);


    modal.show();
}


/* SWITCH LOGIN / SIGNUP */

function switchAuth(type) {

    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");

    const loginTab =
        document.getElementById("loginTab");

    const signupTab =
        document.getElementById("signupTab");

    const title =
        document.getElementById("authTitle");

    const subtitle =
        document.getElementById("authSubtitle");


    if (type === "login") {

        loginForm.style.display =
            "block";

        signupForm.style.display =
            "none";


        loginTab.classList.add("active");

        signupTab.classList.remove("active");


        title.textContent =
            "Welcome Back";


        subtitle.textContent =
            "Login to manage your reservations.";

    }

    else {

        loginForm.style.display =
            "none";

        signupForm.style.display =
            "block";


        loginTab.classList.remove("active");

        signupTab.classList.add("active");


        title.textContent =
            "Create Account";


        subtitle.textContent =
            "Join GLA Hotel for a better experience.";

    }

}


/* PASSWORD VISIBILITY */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(inputId);


    const icon =
        button.querySelector("i");


    if (input.type === "password") {

        input.type = "text";


        icon.classList.remove(
            "bi-eye"
        );


        icon.classList.add(
            "bi-eye-slash"
        );

    }

    else {

        input.type = "password";


        icon.classList.remove(
            "bi-eye-slash"
        );


        icon.classList.add(
            "bi-eye"
        );

    }

}


/* LOGIN FORM */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            alert(
                "Login functionality will be connected to the backend."
            );

        }
    );

}


/* SIGNUP FORM */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const password =
                document.getElementById(
                    "signupPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match."
                );

                return;
            }


            alert(
                "Account creation will be connected to the backend."
            );

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            alert(
                "Thank you! Your message has been received."
            );


            contactForm.reset();

        }
    );

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