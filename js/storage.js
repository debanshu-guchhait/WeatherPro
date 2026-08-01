// ==========================================
// Storage Module
// ==========================================

const RECENT_KEY = "recentCities";
const FAVORITE_KEY = "favoriteCities";

// ==========================================
// Recent Searches
// ==========================================

function saveRecentSearch(city) {

    city = city.trim();

    if (city === "") return;

    let recentCities = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];

    // Remove duplicate city
    recentCities = recentCities.filter(item =>
        item.toLowerCase() !== city.toLowerCase()
    );

    // Add latest city to beginning
    recentCities.unshift(city);

    // Keep only last 5 cities
    recentCities = recentCities.slice(0, 5);

    localStorage.setItem(
        RECENT_KEY,
        JSON.stringify(recentCities)
    );

    displayRecentSearches();

}

// ==========================================
// Display Recent Searches
// ==========================================

function displayRecentSearches() {

    const recentList = document.getElementById("recentList");

    recentList.innerHTML = "";

    const recentCities =
        JSON.parse(localStorage.getItem(RECENT_KEY)) || [];

    recentCities.forEach(city => {

        const item = document.createElement("div");

        item.className = "recent-item";

        item.textContent = city;

        item.addEventListener("click", () => {

            fetchWeather(city);

        });

        recentList.appendChild(item);

    });

}

// ==========================================
// Favorite Cities
// ==========================================

function addFavoriteCity() {

    const city =
        document.getElementById("city").textContent.split(",")[0];

    if (city === "" || city === "City Name") return;

    let favorites =
        JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];

    if (!favorites.includes(city)) {

        favorites.push(city);

        localStorage.setItem(
            FAVORITE_KEY,
            JSON.stringify(favorites)
        );

        displayFavoriteCities();

    }

}

// ==========================================
// Remove Favorite
// ==========================================

function removeFavoriteCity(city) {

    let favorites =
        JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];

    favorites = favorites.filter(item => item !== city);

    localStorage.setItem(
        FAVORITE_KEY,
        JSON.stringify(favorites)
    );

    displayFavoriteCities();

}

// ==========================================
// Display Favorites
// ==========================================

function displayFavoriteCities() {

    const favoriteList =
        document.getElementById("favoriteList");

    favoriteList.innerHTML = "";

    const favorites =
        JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];

    favorites.forEach(city => {

        const item = document.createElement("div");

        item.className = "favorite-city";

        item.innerHTML = `

            <span>${city}</span>

            <i class="fa-solid fa-xmark"></i>

        `;

        // Search when clicking city
        item.querySelector("span").addEventListener("click", () => {

            fetchWeather(city);

        });

        // Remove favorite
        item.querySelector("i").addEventListener("click", (e) => {

            e.stopPropagation();

            removeFavoriteCity(city);

        });

        favoriteList.appendChild(item);

    });

}

// ==========================================
// Favorite Button
// ==========================================

document
    .getElementById("addFavorite")
    .addEventListener("click", addFavoriteCity);