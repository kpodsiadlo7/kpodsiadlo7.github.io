/**Global Variables */
var storedData = localStorage.getItem("soles");
var soles = JSON.parse(storedData);
/**Global Variables */

document.addEventListener("DOMContentLoaded", function () {
    if (storedData) {
        console.log("Dane znalezione w localStorage:");

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

function checkWhichDayWasHottestAndColdest() {
    var hottestSol;
    var warmDate;
    var month;
    var pressure;
    var coldDate;

    var coldestDayTemp = 0;
    var hottesDayTemp = 0;

    soles.soles.forEach(function (sol) {
        if (sol.max_temp === '--' || sol.min_temp === '--') return;
        if (hottesDayTemp < sol.max_temp) {
            hottesDayTemp = sol.max_temp;
            hottestSol = sol.sol;
            warmDate = sol.terrestrial_date;
            month = sol.season;
            pressure = sol.pressure;
        }
        if (coldestDayTemp > sol.min_temp) {
            coldestDayTemp = sol.min_temp;
            coldDate = sol.terrestrial_date;
        }
    });

    return {
        warmDate,
        hottesDayTemp,
        month,
        pressure,
        coldDate,
        coldestDayTemp,
        hottestSol
    };
}

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
            console.log("Dane pobrane i zapisane w localStorage:");
            soles = data;
            getLast7DaysInfo();
        })
        .catch((error) => console.error("Błąd pobierania danych:", error));
}

function getLast7DaysInfo() {
    fillInfoAboutWeather();
    if (soles && soles.soles && soles.soles.length >= 6) {
        var list = document.querySelector('.forecast');

        createAndAppendDivForEachDay();
    }

    function createAndAppendDivForEachDay() {
        for (var i = 0; i <= 6; i++) {
            var day = document.createElement("div");

            var {
                dayName
            } = formatDate(soles.soles[i].terrestrial_date);
            var {
                minTemp, maxTemp
            } = getMinMaxTemp(i);
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

function getMinMaxTemp(i) {
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
    toggleClickedDayColor(sol);
    document.querySelector('.details-container').scrollIntoView({
        behavior: 'smooth'
    });
    var dayDiv = document.querySelector('.details-day');
    var solDiv = document.querySelector('.details-sol');
    var dayTempDiv = document.querySelector('.day-temp-details');
    var groundTempDiv = document.querySelector('.ground-temp');
    var pressureDiv = document.querySelector('.pressure');
    var uvDiv = document.querySelector('.uv');
    var opacityDiv = document.querySelector('.opacity');
    var sunriseDiv = document.querySelector('.sunrise');
    var sunsetDiv = document.querySelector('.sunset');
    var monthDiv = document.querySelector('.month');
    var seasonDiv = document.querySelector('.season');

    soles.soles.forEach((element) => {
        if (element.sol === sol.toString()) {
            dayDiv.innerHTML = formatDate(element.terrestrial_date).dayName;
            solDiv.innerHTML = 'Sol(dzień): ' + element.sol;
            dayTempDiv.innerHTML = 'Temperatura powietrza: ' + element.max_temp + '°C / ' + element.min_temp + '°C';
            groundTempDiv.innerHTML = 'Temperatura przy ziemi: ' + element.max_gts_temp + '°C / ' + element.min_gts_temp + '°C';
            pressureDiv.innerHTML = 'Ciśnienie: ' + element.pressure + 'Pa';
            uvDiv.innerHTML = 'Promieniowanie UV: ' + getPolishNameUV(element.local_uv_irradiance_index);
            opacityDiv.innerHTML = 'Pogoda: ' + getPolishNameWeather(element.atmo_opacity);
            sunriseDiv.innerHTML = 'Wschód słońca: ' + element.sunrise;
            sunsetDiv.innerHTML = 'Zachód słońca: ' + element.sunset;
            monthDiv.innerHTML = 'Miesiąc: ' + element.season.replace(/^Month\s+/i, '');
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

let lastClickedSol;

function toggleClickedDayColor(sol) {
    const daySolElements = document.querySelectorAll('.day');
    let nowClickedSol = sol;

    if (nowClickedSol !== lastClickedSol) {
        setClickedColor(nowClickedSol, daySolElements);
        restoreLastClickedColorToDefault(lastClickedSol, daySolElements);
        lastClickedSol = nowClickedSol;
    }
}

function setClickedColor(sol, daySolElements) {
    daySolElements.forEach(element => {
        if (element.textContent.includes(sol)) {
            element.style.backgroundColor = 'rgba(255, 99, 71, 0.1)';
        }
    });
}

function restoreLastClickedColorToDefault(lastClickedSol, daySolElements) {
    if (!lastClickedSol) return; 
    daySolElements.forEach(element => {
        if (element.textContent.includes(lastClickedSol)) {
            element.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        }
    });
}



function intoSelectWeahterDay() {
    document.querySelector('.weather-app').scrollIntoView({
        behavior: 'smooth'
    });
}

function fillInfoAboutWeather() {
    var {
        warmDate,
        hottesDayTemp,
        month,
        pressure,
        coldDate,
        coldestDayTemp,
        hottestSol
    } = checkWhichDayWasHottestAndColdest();

    var detailsBottomDiv = document.querySelector(".details-bottom");
    var aboutWeather = document.createElement("div");
    aboutWeather.innerHTML = `
                                W dniu ${warmDate}, na Marsie w rejonie Gale Crater zanotowano rekordową dotychczasową temperaturę dodatnią, dochodzącą do około <a style="color:red; font-weight: bold;">${hottesDayTemp}°C</a>. Był to <a style="color:#FF6347; font-weight: bold;">sol ${hottestSol}</a>, miesiąc ${month.replace(/^Month\s+/i, '')}. Wówczas ciśnienie atmosferyczne oscylowało w granicach ${pressure} paskali, a atmosfera charakteryzowała się wyjątkową przejrzystością, intensywność promieniowania ultrafioletowego była wysoka. Natomiast najzimniejszy dzień to ${coldDate}, wówczas temperatura spadła do<a style="color:rgb(54, 171, 255); font-weight: bold;"> ${coldestDayTemp}°C</a>. Marsjański rok ma 687 dni.
    `;
    detailsBottomDiv.appendChild(aboutWeather);
}

function redirectTo20DaysWeather() {
    window.location.href = "mars-20-days.html";
}