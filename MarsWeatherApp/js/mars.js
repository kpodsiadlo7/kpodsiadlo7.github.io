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
      localStorage.setItem("soles", data);
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

      var { dayName } = formatDate(i);
      var { minTemp, maxTemp } = getTemp(i);
      var { sol } = getSol(i);
      day.innerHTML = `
      <div class="day" onclick="testing(${sol})">
        <div class="day-temp" style="float: left;">
            <div class="day-name">${dayName}</div>
            <div class="day-temperature">${minTemp}°C / ${maxTemp}°C</div>
        </div>
        <div class="day-sol" style="text-align: right;">Sol: ${sol}</div>
      </div>
    `;
      list.appendChild(day);
    }
  }
}

function formatDate(i) {
  var date = new Date(soles.soles[i].terrestrial_date);
  var options = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  var dayName = new Intl.DateTimeFormat("pl-PL", options).format(date);
  return { dayName };
}

function getTemp(i) {
  var minTemp = soles.soles[i].min_temp;
  var maxTemp = soles.soles[i].max_temp;
  return { minTemp, maxTemp };
}

function getSol(i) {
  var sol = soles.soles[i].sol;
  return { sol };
}

function testing(sol) {
  soles.soles.forEach((element) => {});
}
