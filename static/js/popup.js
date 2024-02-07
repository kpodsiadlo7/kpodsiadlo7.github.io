function openPopup(event, matchId) {
    event.preventDefault();
    
    fetch('popup.html') 
    .then(response => response.text()) 
    .then(html => {
        document.getElementById('popupContainer').innerHTML = html; 
        document.getElementById('myPopup').style.display = 'block'; 
        document.getElementById('text').innerText = matchId;
    })
    .catch(error => console.error('Wystąpił błąd podczas pobierania popupa:', error));
}
function closePopup() {
    document.getElementById('myPopup').style.display = 'none';
}