// ======================================
// Location Module
// ======================================

// Auto Detect Location
function getCurrentLocation() {

    if (!navigator.geolocation) {

        showError("Geolocation is not supported by your browser.");

        return;

    }

    showLoading();

    navigator.geolocation.getCurrentPosition(

        successLocation,

        errorLocation,

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}

// ======================================
// Location Success
// ======================================

function successLocation(position) {

    const latitude = position.coords.latitude;

    const longitude = position.coords.longitude;

    fetchWeatherByCoords(latitude, longitude);

}

// ======================================
// Location Error
// ======================================

function errorLocation(error) {

    hideLoading();

    switch (error.code) {

        case error.PERMISSION_DENIED:

            showError("Location permission denied.");

            // Default city
            fetchWeather("Kolkata");

            break;

        case error.POSITION_UNAVAILABLE:

            showError("Location unavailable.");

            fetchWeather("Kolkata");

            break;

        case error.TIMEOUT:

            showError("Location request timed out.");

            fetchWeather("Kolkata");

            break;

        default:

            showError("Unable to get your location.");

            fetchWeather("Kolkata");

    }

}

// ======================================
// Current Location Button
// ======================================

const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {

    getCurrentLocation();

});