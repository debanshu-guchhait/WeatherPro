// ==========================================
// WeatherPro - Main Script
// ==========================================

// Default city
const DEFAULT_CITY = "Kolkata";

// ==========================================
// DOM Elements
// ==========================================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

// ==========================================
// Search Weather
// ==========================================

function searchWeather() {

    const city = cityInput.value.trim();

    if (city === "") {

        showError("Please enter a city name.");

        return;

    }

    fetchWeather(city);

    cityInput.value = "";

}

// ==========================================
// Search Button
// ==========================================

searchBtn.addEventListener("click", searchWeather);

// ==========================================
// Enter Key Search
// ==========================================

cityInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        searchWeather();

    }

});

// ==========================================
// Loading
// ==========================================

function showLoading(){

    loading.style.display = "flex";

}

function hideLoading(){

    loading.style.display = "none";

}

// ==========================================
// Error Message
// ==========================================

function showError(message){

    errorBox.textContent = message;

    errorBox.style.display = "block";

    setTimeout(() => {

        errorBox.style.display = "none";

    },3000);

}

// ==========================================
// Initialize Application
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    // Theme
    loadTheme();

    // Clock
    startClock();

    // Local Storage
    displayRecentSearches();

    displayFavoriteCities();

    // Auto Location
    getCurrentLocation();

    // If location isn't available,
    // show default city after a delay
    setTimeout(() => {

        const cityName =
            document.getElementById("city").textContent;

        if(
            cityName === "" ||
            cityName === "City Name"
        ){

            fetchWeather(DEFAULT_CITY);

        }

    },3000);

});