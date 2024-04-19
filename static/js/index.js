function redirectToLol() {
    window.location.href = "/lolhome.html";
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
        if (response.ok) {
            const data = await response.json();
            addPhotoWithData(data);
        } else {
            throw new Error('Wystąpił problem z pobieraniem danych.');
        }
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
});

function addPhotoWithData({copyright, url, title, date}) {
    document.getElementById('astronomyImg').src = url;
    document.getElementById('title').innerText = 'Tytuł: '+title; 
    document.getElementById('author').innerText = ' Autor: '+copyright; 
    document.getElementById('date').innerText = date;
}

function redirectToNasa(){
    window.location.href='https://apod.nasa.gov/apod/astropix.html';
}