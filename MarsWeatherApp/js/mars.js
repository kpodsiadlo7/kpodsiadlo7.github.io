/**Global Variables */
var storedData = localStorage.getItem("soles");
var soles = JSON.parse(storedData);
/**Global Variables */

document.addEventListener("DOMContentLoaded", function () {
    if (storedData) {
        console.log("Dane znalezione w localStorage:", soles);

        if (checkIf24HoursPassedSinceDataSaved()) {
            console.log("Doba minęła, aktualizuję dane");
            getDataFromNasa();
            return;
        } else {
            console.log("Nie minęła doba od ostatniego pobrania danych");
        }
    } else {
        getDataFromNasa();
    }
    getLast7DaysInfo();
});

function checkIf24HoursPassedSinceDataSaved() {
    var timeReqestStorage = new Date(localStorage.getItem("time"));
    return (
        timeReqestStorage.setHours(timeReqestStorage.getHours() + 24) < new Date()
    );
}

function getDataFromNasa() {
    fetch(
            "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json"
        )
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("soles", JSON.stringify(data));
            localStorage.setItem("time", new Date());
            console.log("Dane pobrane i zapisane w localStorage:", data);
            soles = data;
            getLast7DaysInfo();
        })
        .catch((error) => console.error("Błąd pobierania danych:", error));
}

function getLast7DaysInfo() {
    if (soles && soles.soles && soles.soles.length >= 6) {
        var list = document.getElementsByClassName("forecast")[0];

        for (var i = 0; i <= 6; i++) {
            var day = document.createElement("div");

            var {
                dayName
            } = formatDate(soles.soles[i].terrestrial_date);
            var {
                minTemp,
                maxTemp
            } = getTemp(i);
            var {
                sol
            } = getSol(i);
            day.innerHTML = `
      <div class="day" onclick="provideDetailsByCurrentDay(${sol})">
        <div class="day-temp" style="float: left;">
            <div class="day-name">${dayName}</div>
            <div class="day-temperature">${maxTemp}°C / ${minTemp}°C</div>
        </div>
        <div class="day-sol" style="text-align: right;">Sol: ${sol}</div>
      </div>
    `;
            list.appendChild(day);
        }
    }
}

function formatDate(terrestrial_date) {
    var date = new Date(terrestrial_date);
    var options = {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    var dayName = new Intl.DateTimeFormat("pl-PL", options).format(date);
    return {
        dayName
    };
}

function getTemp(i) {
    var minTemp = soles.soles[i].min_temp;
    var maxTemp = soles.soles[i].max_temp;
    return {
        minTemp,
        maxTemp
    };
}

function getSol(i) {
    var sol = soles.soles[i].sol;
    return {
        sol
    };
}

function provideDetailsByCurrentDay(sol) {
    var dayDiv = document.getElementsByClassName("details-day")[0];
    var dateDiv = document.getElementsByClassName("details-date")[0];
    var solDiv = document.getElementsByClassName("details-sol")[0];

    var dayTempDiv = document.getElementsByClassName("day-temp-details")[0];
    var groundTempDiv = document.getElementsByClassName("ground-temp")[0];
    var pressureDiv = document.getElementsByClassName("pressure")[0];
    var uvDiv = document.getElementsByClassName("uv")[0];
    var opacityDiv = document.getElementsByClassName("opacity")[0];
    var sunriseDiv = document.getElementsByClassName("sunrise")[0];
    var sunsetDiv = document.getElementsByClassName("sunset")[0];
    var monthDiv = document.getElementsByClassName("month")[0];
    var seasonDiv = document.getElementsByClassName("season")[0];

    soles.soles.forEach((element) => {
        if (element.sol === sol.toString()) {
            dayDiv.innerHTML = formatDate(element.terrestrial_date).dayName;
            solDiv.innerHTML = 'Sol: ' + element.sol;
            dayTempDiv.innerHTML = 'Temperatura powietrza: ' + element.max_temp + '°C / ' + element.min_temp + '°C';
            groundTempDiv.innerHTML = 'Temperatura przy ziemi: ' + element.max_gts_temp + '°C / ' + element.min_gts_temp + '°C';
            pressureDiv.innerHTML = 'Ciśnienie: ' + element.pressure + 'Pa';
            uvDiv.innerHTML = 'Promieniowanie UV: ' + getPolishNameUV(element.local_uv_irradiance_index);
            opacityDiv.innerHTML = 'Pogoda: ' + getPolishNameWeather(element.atmo_opacity);
            sunriseDiv.innerHTML = 'Wschód słońca: ' + element.sunrise;
            sunsetDiv.innerHTML = 'Zachód słońca: ' + element.sunset;
            monthDiv.innerHTML = 'Miesiąc: ' + element.season;
            seasonDiv.innerHTML = 'Pora roku: ' + getMonth(element.ls);
        }
    });

    function getPolishNameUV(local_uv_irradiance_index) {
        if (local_uv_irradiance_index === 'Low') {
            return 'Niskie';
        }
        if (local_uv_irradiance_index === 'Moderate') {
            return 'Umiarkowane';
        }
        if (local_uv_irradiance_index === 'High') {
            return 'Wysokie';
        }
        return "Brak danych";
    }

    function getPolishNameWeather(weatherName) {
        if (weatherName === 'Sunny') return 'Słonecznie';
        return 'Brak danych';
    }

    function getMonth(ls) {
        if (ls >= 0 && ls < 90) return 'Wiosna';
        if (ls >= 90 && ls < 180) return 'Lato';
        if (ls >= 180 && ls < 270) return 'Jesień';
        if (ls >= 270 && ls <= 360) return 'Zima';
    }
}