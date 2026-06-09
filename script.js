// ======================================
// GLOBAL VARIABLE
// ======================================

let lastDistance = 0;

// ======================================
// DISTANCE CALCULATION
// ======================================

async function calculateDistance() {

    const start = document.getElementById("startLocation").value.trim();
    const dest = document.getElementById("destination").value.trim();
    const mode = document.getElementById("mode").value;

    if (!start && !dest) {
        alert("Please enter both Starting Location and Destination.");
        return;
    }

    if (!start) {
        alert("Please enter the Starting Location.");
        return;
    }

    if (!dest) {
        alert("Please enter the Destination.");
        return;
    }

    document.getElementById("resultText").innerText =
        "Calculating distance and expense...";

    try {

        const startCoords = await getCoordinates(start);
        const destCoords = await getCoordinates(dest);

        if (!startCoords || !destCoords) {
            document.getElementById("resultText").innerText =
                "Unable to find one or both locations.";
            return;
        }

        const distance = getDistance(
            startCoords,
            destCoords
        );

        lastDistance = distance;

        displayDistanceAndExpenses(
            distance,
            mode,
            start,
            dest
        );

    } catch (error) {

        console.error(error);

        document.getElementById("resultText").innerText =
            "Error calculating distance.";
    }
}

// ======================================
// GET COORDINATES
// ======================================

async function getCoordinates(place) {

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
        );

        const data = await response.json();

        if (data.length > 0) {

            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };

        }

        return null;

    } catch (error) {

        console.error(error);
        return null;
    }
}

// ======================================
// HAVERSINE DISTANCE
// ======================================

function getDistance(c1, c2) {

    const R = 6371;

    const dLat =
        (c2.lat - c1.lat) *
        Math.PI / 180;

    const dLon =
        (c2.lon - c1.lon) *
        Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(c1.lat * Math.PI / 180) *
        Math.cos(c2.lat * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return (
        R *
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        )
    );
}

// ======================================
// EXPENSE DISPLAY
// ======================================

function displayDistanceAndExpenses(
    distance,
    mode,
    start,
    dest
) {

    const rates = {
        car: 10,
        train: 5,
        bus: 3,
        flight: 20
    };

    const cost =
        distance *
        (rates[mode] || 0);

    document.getElementById("resultText").innerHTML =
        `
        <strong>Trip Summary</strong><br><br>

        📍 From: ${start}<br>
        📍 To: ${dest}<br>
        🚗 Mode: ${mode.toUpperCase()}<br>
        💰 Estimated Cost: ₹${cost.toFixed(2)}
        `;

    document.getElementById("distanceText").innerHTML =
        `
        📏 Distance:
        <strong>${distance.toFixed(2)} km</strong>
        `;
}

// ======================================
// NAVIGATION
// ======================================

function showNextInterface() {

    const start =
        document.getElementById(
            "startLocation"
        ).value.trim();

    const dest =
        document.getElementById(
            "destination"
        ).value.trim();

    if (!start || !dest) {

        alert(
            "Please enter Starting Location and Destination first."
        );

        return;
    }

    document.getElementById("interface1")
        .style.display = "none";

    document.getElementById("interface2")
        .style.display = "block";
}

function showPreviousInterface() {

    document.getElementById("interface2")
        .style.display = "none";

    document.getElementById("interface1")
        .style.display = "block";
}

function showPreviousInterfaceFromLocalServices() {

    document.getElementById(
        "localServicesInterface"
    ).style.display = "none";

    document.getElementById(
        "interface2"
    ).style.display = "block";
}

function showPreviousInterfaceFromTransportFacilities() {

    document.getElementById(
        "transportFacilitiesInterface"
    ).style.display = "none";

    document.getElementById(
        "interface2"
    ).style.display = "block";
}

function showPreviousInterfaceFromEmergency() {

    document.getElementById(
        "emergencyInterface"
    ).style.display = "none";

    document.getElementById(
        "localServicesInterface"
    ).style.display = "block";
}

function showPreviousInterfaceFromWeather() {

    document.getElementById(
        "weatherInterface"
    ).style.display = "none";

    document.getElementById(
        "interface2"
    ).style.display = "block";
}

function showPreviousInterfaceFromCarbon() {

    document.getElementById(
        "carbonInterface"
    ).style.display = "none";

    document.getElementById(
        "interface2"
    ).style.display = "block";
}

function toggleView(hide, show) {

    document.getElementById(hide)
        .style.display = "none";

    document.getElementById(show)
        .style.display = "block";
}

// ======================================
// WEATHER
// ======================================

async function showWeather() {

    const start =
        document.getElementById(
            "startLocation"
        ).value.trim();

    const dest =
        document.getElementById(
            "destination"
        ).value.trim();

    if (!start || !dest) {

        alert(
            "Please enter Starting Location and Destination first."
        );

        return;
    }

    toggleView(
        "interface2",
        "weatherInterface"
    );

    document.getElementById(
        "weatherData"
    ).innerHTML =
        "⏳ Fetching Weather Data...";

    try {

        const response = await fetch(
            `https://wttr.in/${encodeURIComponent(dest)}?format=%C|%t|%h|%w`
        );

        const weather =
            await response.text();

        const data =
            weather.split("|");

        document.getElementById(
            "weatherData"
        ).innerHTML =
            `
            <h3>${dest}</h3>

            <p>🌤 Condition:
            <strong>${data[0]}</strong></p>

            <p>🌡 Temperature:
            <strong>${data[1]}</strong></p>

            <p>💧 Humidity:
            <strong>${data[2]}</strong></p>

            <p>🌬 Wind:
            <strong>${data[3]}</strong></p>

            <hr>

            <p>
            Route:
            <strong>${start}</strong>
            ➜
            <strong>${dest}</strong>
            </p>
            `;

    } catch (error) {

        document.getElementById(
            "weatherData"
        ).innerHTML =
            "❌ Unable to fetch weather information.";
    }
}

// ======================================
// CARBON FOOTPRINT
// ======================================

function showCarbon() {

    if (lastDistance <= 0) {

        alert(
            "Please calculate trip first."
        );

        return;
    }

    toggleView(
        "interface2",
        "carbonInterface"
    );

    const mode =
        document.getElementById(
            "mode"
        ).value;

    const factors = {
        car: 0.12,
        bus: 0.05,
        train: 0.04,
        flight: 0.18
    };

    const carbon =
        lastDistance *
        factors[mode];

    let rating = "";

    if (carbon < 20) {
        rating = "🟢 Eco Friendly";
    }
    else if (carbon < 80) {
        rating = "🟡 Moderate";
    }
    else {
        rating = "🔴 High Emission";
    }

    document.getElementById(
        "carbonData"
    ).innerHTML =
        `
        <p>
        📏 Distance:
        <strong>${lastDistance.toFixed(2)} km</strong>
        </p>

        <p>
        🚗 Transport:
        <strong>${mode.toUpperCase()}</strong>
        </p>

        <p>
        🌱 CO₂ Emission:
        <strong>${carbon.toFixed(2)} kg</strong>
        </p>

        <p>
        📊 Sustainability:
        <strong>${rating}</strong>
        </p>
        `;
}

// ======================================
// ICON ACTIONS
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .querySelectorAll(".icon")
            .forEach(icon => {

                icon.addEventListener(
                    "click",
                    () => {

                        switch(icon.id) {

                            case "hotel":
                                window.open(
                                    "https://www.booking.com",
                                    "_blank"
                                );
                                break;

                            case "transport":
                                toggleView(
                                    "interface2",
                                    "transportFacilitiesInterface"
                                );
                                break;

                            case "services":
                                toggleView(
                                    "interface2",
                                    "localServicesInterface"
                                );
                                break;

                            case "weather":
                                showWeather();
                                break;

                            case "carbon":
                                showCarbon();
                                break;

                            case "food":
                                window.open(
                                    "https://www.zomato.com",
                                    "_blank"
                                );
                                break;

                            case "regionalTraveling":
                                window.open(
                                    "https://www.olacabs.com",
                                    "_blank"
                                );
                                break;

                            case "emergencyContacts":
                                toggleView(
                                    "localServicesInterface",
                                    "emergencyInterface"
                                );
                                break;

                            case "instantBooking":
                                window.open(
                                    "https://www.abhibus.com",
                                    "_blank"
                                );
                                break;

                            case "carRenting":
                                window.open(
                                    "https://www.zoomcar.com",
                                    "_blank"
                                );
                                break;
                        }

                    }
                );
            });
    }
);