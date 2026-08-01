// ==========================================
// Forecast API
// ==========================================

async function fetchForecast(lat, lon) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Forecast unavailable");
        }

        const data = await response.json();

        updateHourlyForecast(data.list);

        updateFiveDayForecast(data.list);

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// 24 Hour Forecast
// ==========================================

function updateHourlyForecast(list) {

    const container = document.getElementById("hourlyContainer");

    container.innerHTML = "";

    // Next 24 Hours = 8 Forecasts (Every 3 Hours)

    list.slice(0,8).forEach(item => {

        const time = new Date(item.dt * 1000);

        const card = document.createElement("div");

        card.className = "hour-card";

        card.innerHTML = `

            <h3>
                ${time.toLocaleTimeString([],{
                    hour:"numeric"
                })}
            </h3>

            <img
                src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
            >

            <h2>${Math.round(item.main.temp)}°C</h2>

            <p>${item.weather[0].main}</p>

        `;

        container.appendChild(card);

    });

}

// ==========================================
// 5 Day Forecast
// ==========================================

function updateFiveDayForecast(list) {

    const container =
        document.getElementById("forecastContainer");

    container.innerHTML = "";

    const dailyForecast = {};

    list.forEach(item => {

        const date =
            item.dt_txt.split(" ")[0];

        if(!dailyForecast[date]){

            dailyForecast[date] = item;

        }

    });

    Object.values(dailyForecast)

        .slice(0,5)

        .forEach(day=>{

            const date =
                new Date(day.dt*1000);

            const card =
                document.createElement("div");

            card.className="forecast-card";

            card.innerHTML=`

                <h3>

                    ${date.toLocaleDateString([],{

                        weekday:"long"

                    })}

                </h3>

                <img

                src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"

                >

                <h2>

                    ${Math.round(day.main.temp)}°C

                </h2>

                <p>

                    ${day.weather[0].description}

                </p>

                <small>

                    H ${Math.round(day.main.temp_max)}°

                    |

                    L ${Math.round(day.main.temp_min)}°

                </small>

            `;

            container.appendChild(card);

        });

}