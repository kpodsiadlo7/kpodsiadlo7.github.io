const photoDetails = document.getElementById('photoDetails');
const modalOverlay = document.getElementById('modalOverlay');

function showDetails(photoCard) {
    const photoAlt = photoCard.querySelector('img').alt;
    const photoSize = photoCard.querySelector('p').textContent;

    photoDetails.innerHTML = `
        <h2>${photoSize}</h2>
        <img src="${photoCard.querySelector('img').src}" alt="${photoAlt}">
        <p>Data: 22.02.2022</p>
        <p>Godzina: 22:37</p>
        <p>Lokalizacja: kod google</p>
        <p>Waga: 7kg</p>
        <p>Metoda: Przytrzymanie</p>
        <p>Guma ripper hot dog</p>
        <p>ciśnienie pobierane automatycznie + spadek, wzrost, stałe przez 3 dni ostatnie</p>
        <p>faza księzyca pobierana automatycznie</p>
        <p>temperatura pobierana automatycznie</p>
        <p>pogoda pobierana automatycznie</p>
        <p>ochłodzenie ? pobierane automatycznie</p>
    `;

    photoDetails.classList.add('active');
    modalOverlay.classList.add('active');
    const photo = photoDetails.querySelector('img');
    photo.style.transition = 'transform 0.3s ease-in-out';
}

function hideDetails() {
    photoDetails.classList.remove('active');
    modalOverlay.classList.remove('active');
}
