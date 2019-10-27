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


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/a3f6e105434bb120691e7e8ef4cf6303/${lat},${long}`;
            const api2 = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=b0dd24d4643315fefa7f09ed84a843ec`;

            openWeatherbut.addEventListener("click", () => {
                fetch(api2)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        // Set DOM Elem from the API
                        temperatureDegree.textContent = data.main.temp;
                        temperatureDescription.textContent = data.weather[0].description;
                        locationTimezone.textContent = data.sys.country;
                        // Formula for Celsius
                        let celsius = (data.main.temp - 32) * (5 / 9);
                        // Set Icon
                        setIcons(data.weather[0].icon, document.querySelector(".icon"));

                        // Change temp to Celsius/Farenheit
                        temperatureSection.addEventListener("click", () => {
                            if (temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = Math.floor(celsius);
                            } else {
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = data.main.temp;
                            }
                        })
                    })
            })

            darkSkybut.addEventListener("click", () => {
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const { temperature, summary, icon } = data.currently;
                        // Set DOM Elem from the API
                        temperatureDegree.textContent = temperature;
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        // Formula for Celsius
                        let celsius1 = (temperature - 32) * (5 / 9);
                        // Set Icon
                        setIcons(icon, document.querySelector(".icon"));

                        // Change temp to Celsius/Farenheit
                        temperatureSection.addEventListener("click", () => {
                            if (temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = Math.floor(celsius1);
                            } else {
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = temperature;
                            }
                        })
                    })
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
