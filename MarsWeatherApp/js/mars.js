function showDetails(day) {
    // Pobieranie elementów
    const dayNameElement = document.getElementById('day-name');
    const dateElement = document.getElementById('date');
    const solElement = document.getElementById('sol');
    const pressureElement = document.getElementById('pressure');
    const monthElement = document.getElementById('month');
    const uvIndexElement = document.getElementById('uv-index');
    const transparencyElement = document.getElementById('transparency');
    const minTempElement = document.getElementById('min-temp');
    const maxTempElement = document.getElementById('max-temp');
    const minGroundTempElement = document.getElementById('min-ground-temp');
    const maxGroundTempElement = document.getElementById('max-ground-temp');
    const sunriseElement = document.getElementById('sunrise');
    const sunsetElement = document.getElementById('sunset');

    // Symulacja danych dla wybranego dnia
    const data = {
        'Poniedziałek': {
            name: 'Poniedziałek',
            date: '30.05.2024',
            sol: 1234,
            pressure: '610 Pa',
            month: 'Czerwiec',
            uvIndex: 5,
            transparency: 'Wysoka',
            minTemp: '-70°C',
            maxTemp: '-20°C',
            minGroundTemp: '-75°C',
            maxGroundTemp: '-25°C',
            sunrise: '05:30',
            sunset: '18:45'
        },
        'Wtorek': {
            name: 'Wtorek',
            date: '31.05.2024',
            sol: 1235,
            pressure: '615 Pa',
            month: 'Czerwiec',
            uvIndex: 6,
            transparency: 'Średnia',
            minTemp: '-68°C',
            maxTemp: '-18°C',
            minGroundTemp: '-72°C',
            maxGroundTemp: '-22°C',
            sunrise: '05:32',
            sunset: '18:47'
        },
        'Środa': {
            name: 'Środa',
            date: '01.06.2024',
            sol: 1236,
            pressure: '620 Pa',
            month: 'Czerwiec',
            uvIndex: 7,
            transparency: 'Wysoka',
            minTemp: '-67°C',
            maxTemp: '-19°C',
            minGroundTemp: '-73°C',
            maxGroundTemp: '-23°C',
            sunrise: '05:34',
            sunset: '18:49'
        },
        // Dodaj inne dni w podobny sposób
    };

    // Ustawianie danych dla wybranego dnia
    const selectedData = data[day];
    dayNameElement.textContent = selectedData.name;
    dateElement.textContent = selectedData.date;
    solElement.textContent = selectedData.sol;
    pressureElement.textContent = selectedData.pressure;
    monthElement.textContent = selectedData.month;
    uvIndexElement.textContent = selectedData.uvIndex;
    transparencyElement.textContent = selectedData.transparency;
    minTempElement.textContent = selectedData.minTemp;
    maxTempElement.textContent = selectedData.maxTemp;
    minGroundTempElement.textContent = selectedData.minGroundTemp;
    maxGroundTempElement.textContent = selectedData.maxGroundTemp;
    sunriseElement.textContent = selectedData.sunrise;
    sunsetElement.textContent = selectedData.sunset;
}
