function openPopup() {

    fetch('popup.html') 
    .then(response => response.text()) 
    .then(html => {
        document.getElementById('popupContainer').innerHTML = html; 
        document.getElementById('myPopup').style.display = 'block'; 
    })
    .catch(error => console.error('Wystąpił błąd podczas pobierania popupa:', error));
}
function closePopup() {
    var popup = document.getElementById('myPopup');
    var content = document.getElementById('content');

    content.style.animation = 'none';
    content.style.animation = 'fadeOutPopup 0.3s ease forwards';

    setTimeout(function() {
        popup.style.display = 'none';
    }, 300);
}