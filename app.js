window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    let darkSkybut = document.querySelector("#darkSky");
    let openWeatherbut = document.querySelector("#openWeather");
    let weatherUnit = "F";
    let tempInF = null;

    temperatureSection.addEventListener("click", () => {
        changeUnit();
        setWeather();
    })

    // Allow/Block find your location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/a3f6e105434bb120691e7e8ef4cf6303/${lat},${long}`;
            const api2 = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=b0dd24d4643315fefa7f09ed84a843ec`;

            // OpenWeather API button
            openWeatherbut.addEventListener("click", () => {
                fetch(api2)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        // Set DOM Elem from the API
                        temperatureDescription.textContent = data.weather[0].description;
                        locationTimezone.textContent = data.sys.country;
                        // Set Icon
                        setIconsOpenWeather(data.weather[0].description, document.querySelector(".icon"));
                        tempInF = data.main.temp
                        setWeather();
                    })
            })

            // DarkSky API button
            darkSkybut.addEventListener("click", () => {
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const { temperature, summary, icon } = data.currently;
                        // Set DOM Elem from the API
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        // Set Icon
                        setIconDarkSky(icon, document.querySelector(".icon"));
                        tempInF = temperature
                        setWeather();
                    })
            });
        });
    }

    function changeUnit() {
        if (weatherUnit == "F") {
            weatherUnit = "C"
        }
        else {
            weatherUnit = "F"
        }
    }

    function setWeather() {
        if (tempInF == null) {
            temperatureDegree.textContent = "N/A";
        }
        let celsius = (tempInF - 32) * (5 / 9);
        if (weatherUnit === "C") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
        } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = tempInF;
        }
    }

    function setIconsOpenWeather(type, iconId) {
        switch (type) {
            case "wind":
                setIcons("WIND", iconId)
                break;
            case "clear sky":
                setIcons("CLEAR_DAY", iconId)
                break;
            case "clear night":
                setIcons("CLEAR_NIGHT", iconId)
                break;
            case "partly cloudy day":
                setIcons("PARTLY_CLOUDY_DAY", iconId)
                break;
            case "partly cloudy night":
                setIcons("PARTLY_CLOUDY_NIGHT", iconId)
                break;
            case "cloudy":
                setIcons("CLOUDY", iconId)
                break;
            case "rain":
                setIcons("RAIN", iconId)
                break;
            case "sleet":
                setIcons("SLEET", iconId)
                break;
            case "snow":
                setIcons("SNOW", iconId)
                break;
            case "fog":
                setIcons("FOG", iconId)
                break;
            default:
                break;
        }
    }

    function setIconDarkSky(icon, iconId) {
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        setIcons(currentIcon, iconId)
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        skycons.play();
        return skycons.set(iconID, Skycons[icon]);
    }
});
