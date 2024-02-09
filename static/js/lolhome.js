function redirectToSummoner(){
    window.location.href="/summoner.html";
}
function redirectToMatches(){
    window.location.href="/matchinfo.html"
}

document.addEventListener('DOMContentLoaded', async function() {
    fetch(`${window.home_url}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }})
});