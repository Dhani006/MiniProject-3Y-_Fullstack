function searchRooms() {

    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const guests = document.getElementById("guests").value;

    if (!checkIn || !checkOut) {
        alert("Please select your check-in and check-out dates.");
        return;
    }

    if (checkOut <= checkIn) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    alert(
        "Searching rooms...\n\n" +
        "Check-in: " + checkIn +
        "\nCheck-out: " + checkOut +
        "\nGuests: " + guests
    );
}