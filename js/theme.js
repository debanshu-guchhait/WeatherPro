// ==========================================
// Theme Module
// ==========================================

const themeBtn = document.getElementById("themeBtn");

// ==========================================
// Load Saved Theme
// ==========================================

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        document.body.classList.remove("dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

}

// ==========================================
// Toggle Theme
// ==========================================

function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

}

// ==========================================
// Button Event
// ==========================================

themeBtn.addEventListener("click", toggleTheme);