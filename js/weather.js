// ================================
// OpenWeatherMap API Key
// ================================

const API_KEY = "8b7832d62783abf4d0d8b47776470e33";

// ================================
// Fetch Weather by City
// ================================

async function fetchWeather(city) {

    showLoading();

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        updateWeatherUI(data);

        fetchForecast(data.coord.lat, data.coord.lon);

        saveRecentSearch(city);

    } catch (error) {

        showError(error.message);

    } finally {

        hideLoading();

    }

}

// ================================
// Fetch Weather by Coordinates
// ================================

async function fetchWeatherByCoords(lat, lon) {

    showLoading();

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        updateWeatherUI(data);

        fetchForecast(lat, lon);

    } catch {

        showError("Unable to fetch weather.");

    } finally {

        hideLoading();

    }

}

// ================================
// Update UI
// ================================

function updateWeatherUI(data) {

    document.getElementById("city").textContent =
        `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").textContent =
        `${Math.round(data.main.temp)}°C`;

    document.getElementById("weather").textContent =
        data.weather[0].description;

    document.getElementById("feelsLike").textContent =
        `${Math.round(data.main.feels_like)}°C`;

    document.getElementById("minTemp").textContent =
        `${Math.round(data.main.temp_min)}°C`;

    document.getElementById("maxTemp").textContent =
        `${Math.round(data.main.temp_max)}°C`;

    document.getElementById("humidity").textContent =
        `${data.main.humidity}%`;

    document.getElementById("wind").textContent =
        `${data.wind.speed} km/h`;

    document.getElementById("pressure").textContent =
        `${data.main.pressure} hPa`;

    document.getElementById("visibility").textContent =
        `${(data.visibility / 1000).toFixed(1)} km`;

    document.getElementById("sunrise").textContent =
        formatTime(data.sys.sunrise);

    document.getElementById("sunset").textContent =
        formatTime(data.sys.sunset);

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    updateBackground(data.weather[0].main);

}

// ================================
// Format Time
// ================================

function formatTime(unixTime) {

    const date = new Date(unixTime * 1000);

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

// ================================
// Change Background
// ================================

function updateBackground(condition) {

    document.body.classList.remove(
        "sunny",
        "cloudy",
        "rain",
        "snow",
        "thunder",
        "mist",
        "night"
    );

    switch (condition.toLowerCase()) {

        case "clear":
            document.body.classList.add("sunny");
            break;

        case "clouds":
            document.body.classList.add("cloudy");
            break;

        case "rain":
        case "drizzle":
            document.body.classList.add("rain");
            break;

        case "snow":
            document.body.classList.add("snow");
            break;

        case "thunderstorm":
            document.body.classList.add("thunder");
            break;

        default:
            document.body.classList.add("mist");

    }

}