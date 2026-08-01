// ==========================================
// Clock Module
// ==========================================

// Start Clock
function startClock() {

    updateClock();

    // Update every second
    setInterval(updateClock, 1000);

}

// ==========================================
// Update Clock
// ==========================================

function updateClock() {

    const now = new Date();

    // Clock
    const time = now.toLocaleTimeString("en-US", {

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true

    });

    // Date
    const date = now.toLocaleDateString("en-US", {

        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"

    });

    document.getElementById("clock").textContent = time;

    document.getElementById("date").textContent = date;

}