//index.html
function redirectToLol(){
    window.location.href="/lolhome.html";
}
//end index.html

//lolhome.html
function redirectToSummoner(){
    window.location.href="/summoner.html";
}
//end lolhome.html

//summoner.html
async function searchSummoner(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const apiUrl = `https://0d68-79-163-203-158.ngrok-free.app/?summonerName=${encodeURIComponent(name)}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });
        const data = await response.json();
        

        const summonerIcon = document.getElementById('summonerIcon');
        summonerIcon.src = data.iconUrl;
        
        const summonerName = document.getElementById('summonerName');
        summonerName.textContent = data.name;

        const summonerRank = document.getElementById('rank');
        summonerRank.textContent = data.rank;
        summonerRank.style.color = data.rankColor;

        const sumonnerLv = document.getElementById('upperLv');
        sumonnerLv.textContent = data.summonerLevel;

        //CHAMP ICONS
        for (let i = 1; i <= 3; i++) {
            const champIcon = document.getElementById(`champIcon${i}`);
            champIcon.src = `img/champions/${data[`champName${i}`]}.jpeg`;
        }           

        //CHAMP NAMES
        for (let i = 1; i <= 3; i++) {
            const nameMain1 = document.getElementById(`nameMain${i}`);
            nameMain1.textContent = data[`champName${i}`];
        }

        //CHAMP LEVLES
        for (let i = 1; i <= 3; i++) {
            const champLv = document.getElementById(`champLv${i}`);
            champLv.textContent = "Lv: "+data[`champLv${i}`];
        }

        //LAST 3 MATCHES
        //CHAMP ICONS
        for (let i = 1; i <= 3; i++) {
            const champImg1 = document.getElementById(`champImg${i}`);
            champImg1.src = `img/champions/${data[`matchChampName${i}`]}.jpeg`;
        }
        
        //CHAMP NAMES
        for (let i = 1; i <= 3; i++) {
            const champNameMiddle1 = document.getElementById(`champNameMiddle${i}`);
            champNameMiddle1.textContent = data[`matchChampName${i}`];
        }

        //LAST 3 MATCHES INFO
        //MATCH 1 INFO
        for (let i = 1; i <= 3; i++) {
            const kills = document.getElementById(`kills${i}`);
            kills.textContent = "Zabójstwa: "+data[`kills${i}`];

            const assists = document.getElementById(`assists${i}`);
            assists.textContent = "Asysty: "+data[`assists${i}`];

            const deaths = document.getElementById(`deaths${i}`);
            deaths.textContent = "Śmierci: "+data[`deaths${i}`];

            const kda = document.getElementById(`kda${i}`);
            kda.textContent = "KDA: "+data[`kda${i}`];
            
            const killingSprees = document.getElementById(`killingSprees${i}`);
            killingSprees.textContent = "Killing sprees: "+data[`killingSprees${i}`];

            const soloKills = document.getElementById(`soloKills${i}`);
            soloKills.textContent = "Solo kills: "+data[`soloKills${i}`];

            const doubleKills = document.getElementById(`doubleKills${i}`);
            doubleKills.textContent = "Double kills: "+data[`doubleKills${i}`];

            const tripleKills = document.getElementById(`tripleKills${i}`);
            tripleKills.textContent = "Triple kills: "+data[`tripleKills${i}`];

            const multikills = document.getElementById(`multikills${i}`);
            multikills.textContent = "Multi kills: "+data[`multikills${i}`];

            const quadraKills = document.getElementById(`quadraKills${i}`);
            quadraKills.textContent = "Quadra kills: "+data[`quadraKills${i}`];

            const pentaKills = document.getElementById(`pentaKills${i}`);
            pentaKills.textContent = "Penta kills: "+data[`pentaKills${i}`];

            const dealtDamage = document.getElementById(`dealtDamage${i}`);
            dealtDamage.textContent = "Zadane obrażenia: "+data[`dealtDamage${i}`];

            const win = document.getElementById(`win${i}`);
            if(data[`win${i}`] == "WYGRANA") {
                win.textContent = data[`win${i}`];
                win.style.color = data[`winColor${i}`];
            } else if(data[`win`] === "BRAK DANYCH") {
                win.textContent = "BRAK DANYCH";
            } else {
                win.textContent = data[`win${i}`];
                win.style.color = data[`winColor${i}`];
            }
            
        }
    } catch (error) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
    }
}
//end summoner.html