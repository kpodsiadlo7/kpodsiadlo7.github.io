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
    initializeWeatherDataFor20Days();
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
            console.log("Dane pobrane i zapisane w localStorage:");
            soles = data;
            initializeWeatherDataFor20Days();
        })
        .catch((error) => console.error("Błąd pobierania danych:", error));
}

function initializeWeatherDataFor20Days() {
    if (soles && soles.soles && soles.soles.length > 0) {
        var {
            lastYearSols,
            howManyDaysForward,
            howManyYearsLeftToCheckWeather,
            lastYearDays,
            marsYearDays
        } = prepareVariables();

        ({
            i,
            lastYearSols,
            howManyDaysForward
        } = aggregateMaxTempsForYears(howManyYearsLeftToCheckWeather, lastYearSols, lastYearDays, howManyDaysForward, marsYearDays));

        calculateAverageForLastYearDays(lastYearDays);
        fillCardsWithWeatherData(lastYearDays);
    }
}

function prepareVariables() {
    var currentSol = soles.soles[0].sol;
    var marsYearDays = 687;
    var howManyYearsLeftToCheckWeather = Math.floor(currentSol / marsYearDays);
    var lastYearDays = new Map();

    var lastYearSols = currentSol - marsYearDays + 20;
    var howManyDaysForward = 20;
    return {
        lastYearSols,
        howManyDaysForward,
        howManyYearsLeftToCheckWeather,
        lastYearDays,
        marsYearDays
    };
}

function aggregateMaxTempsForYears(howManyYearsLeftToCheckWeather, lastYearSols, lastYearDays, howManyDaysForward, marsYearDays) {
    for (var i = 1; i <= howManyYearsLeftToCheckWeather; i++) {
        for (var j = 0; j < soles.soles.length; j++) {
            var sol = soles.soles[j];
            if (sol.sol <= lastYearSols) {
                if (sol.max_temp === '--') continue;
                var currentVal = lastYearDays.get(howManyDaysForward) || 0;
                lastYearDays.set(howManyDaysForward, Number(sol.max_temp) + currentVal);
                lastYearSols--;
                howManyDaysForward--;
                if (howManyDaysForward === 0) {
                    howManyDaysForward = 20;
                    break;
                }
            }
        }
        lastYearSols -= marsYearDays;
    }
    return {
        i,
        lastYearSols,
        howManyDaysForward
    };
}

function calculateAverageForLastYearDays(lastYearDays) {
    for (var i = lastYearDays.size; 1 <= i; i--) {
        lastYearDays.set(i, Math.trunc(lastYearDays.get(i) / 6));
    }
}

function fillCardsWithWeatherData(lastYearDays) {
    var firstFloor = document.querySelector('.first-floor');
    var secondFloor = document.querySelector('.second-floor');
    var thirdFloor = document.querySelector('.third-floor');
    var fourthFloor = document.querySelector('.fourth-floor');

    var floors = [firstFloor, secondFloor, thirdFloor, fourthFloor];
    var currentDate = new Date(); 
    currentDate.setDate(currentDate.getDate() + 1);
    
    var dayOfWeekShort = ['nd', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];
    
    for (var j = 0; j < floors.length; j++) {
        for (var i = 0; i < 5; i++) {
            var floor = document.createElement('div');
            floor.classList.add('floor');
        
            var dateDiv = document.createElement('div'); 
            dateDiv.classList.add('date');
            
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
    
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
    
            var dayOfWeekIndex = currentDate.getDay();
            var dayOfWeek = dayOfWeekShort[dayOfWeekIndex];
    
            dateDiv.textContent = `${dayOfWeek}, ${day}.${month}.${year}`;
    
            currentDate.setDate(currentDate.getDate() + 1);
            
            var tempDiv = document.createElement('div'); 
            tempDiv.classList.add('temp');
            tempDiv.textContent = lastYearDays.get(j * 5 + i + 1)+'°C';
        
            floor.appendChild(dateDiv); 
            floor.appendChild(tempDiv); 
        
            floors[j].appendChild(floor); 
        }
    }
}