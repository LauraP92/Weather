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
    let weatherstackbut = document.querySelector("#weatherstack");
    let weatherUnit = "F";
    let tempInF = null;
    let openpage = false;
    
    temperatureSection.addEventListener("click", () => {
        if (openpage == true) {
            changeUnit();
            setWeather();
        }
    })


    // Allow/Block know your location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/a3f6e105434bb120691e7e8ef4cf6303/${lat},${long}`;
            const api2 = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=b0dd24d4643315fefa7f09ed84a843ec`;
            const api3 = `${proxy}http://api.weatherstack.com/current?access_key=e73da029a52c40748c6df693a526f172&query=${lat},${long}&units=f`;

            // weatherstack API button
            weatherstackbut.addEventListener("click", () => {
                weatherstackbut.classList.add('activebutton');
                darkSkybut.classList.remove('activebutton');
                openWeatherbut.classList.remove('activebutton');
                openpage = true;
                fetch(api3)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        // Set DOM Elem from the API
                        temperatureDescription.textContent = data.current.weather_descriptions[0];
                        locationTimezone.textContent = data.location.name;
                        // Set Icon
                        setIconsweatherstack(data.current.weather_descriptions[0], document.querySelector(".icon"));
                        tempInF = data.current.temperature;
                        setWeather();
                    })
            })

            // OpenWeather API button
            openWeatherbut.addEventListener("click", () => {
                openWeatherbut.classList.add('activebutton');
                darkSkybut.classList.remove('activebutton');
                weatherstackbut.classList.remove('activebutton');
                openpage = true;
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
                        setIconsOpenWeather(data.weather[0].main, document.querySelector(".icon"));
                        tempInF = data.main.temp;
                        setWeather();
                    })
            })

            // DarkSky API button
            darkSkybut.addEventListener("click", () => {
                darkSkybut.classList.add('activebutton');
                openWeatherbut.classList.remove('activebutton');
                weatherstackbut.classList.remove('activebutton');
                openpage = true;
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
                        tempInF = temperature;
                        setWeather();
                    })
            })
        })
    }

    // Change unit temp measure Fahrenheit/Celsius
    function changeUnit() {
        if (weatherUnit == "F") {
            weatherUnit = "C";
        }
        else {
            weatherUnit = "F";
        }
    }

    // Convert Fahrenheit to Celsius
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
            temperatureDegree.textContent = Math.floor(tempInF);
        }
    }


    // Icons for weatherstack
    function setIconsweatherstack(type, iconId) {
        switch (type) {
            case "Sunny":
                setIcons("CLEAR_DAY", iconId)
                break;
            case "Clear":
                setIcons("CLEAR_NIGHT", iconId)
                break;
            case "Partly cloudy":
                setIcons("PARTLY_CLOUDY_DAY", iconId)
                break;
            case "Partly cloudy":
                setIcons("PARTLY_CLOUDY_NIGHT", iconId)
                break;
            case "Cloudy":
                setIcons("CLOUDY", iconId)
                break;
            case "Heavy rain at times":
            case "Light rain":
            case "Patchy rain possible":
            case "Thundery":
            case "Patchy light rain":
            case "Moderate rain at times":
            case "Light freezing rain":
                setIcons("RAIN", iconId)
                break;
            case "Patchy snow possible":
            case "Patchy freezing drizzle possible":
            case "Blowing snow":
            case "Blizzard":
            case "Patchy light drizzle":
            case "Light drizzle":
            case "Freezing drizzle":
            case "Heavy freezing drizzle":
                setIcons("SNOW", iconId)
                break;
            case "Fog":
            case "Mist":
            case "Freezing fog":
                setIcons("FOG", iconId)
                break;
            default:
                break;
        }
    }


    // Icons for OpenWeather
    function setIconsOpenWeather(type, iconId) {
        switch (type) {
            case "Tornado":
            case "Squall":
                setIcons("WIND", iconId)
                break;
            case "Clear":
                setIcons("CLEAR_DAY", iconId)
                break;
            case "Clear":
                setIcons("CLEAR_NIGHT", iconId)
                break;
            case "Clouds":
                setIcons("CLOUDY", iconId)
                break;
            case "Rain":
            case "Thunderstorm":
                setIcons("RAIN", iconId)
                break;
            case "Drizzle":
                setIcons("SLEET", iconId)
                break;
            case "Snow":
                setIcons("SNOW", iconId)
                break;
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Sand":
            case "Ash":
                setIcons("FOG", iconId)
                break;
            default:
                break;
        }
    }

    // Icon for DarkSky
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
