//index.html
function redirectToLol(){
    window.location.href="/lolhome.html";
}
//end index.html

//lolhome.html
function redirectToSummoner(){
    window.location.href="/summoner.html";
}
function redirectToMatches(){
    window.location.href="/matchinfo.html"
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

//matchinfo.html

function setPropertiesForLeftTeam(teamLeft,leftTeamContainer){
    teamLeft.textContent = "Twoja drużyna";
    leftTeamContainer.style.setProperty('box-shadow', 'var(--box-shadow)');
}

function removePropertiesForRightTeam(teamRight,RightTeamContainer){
    teamRight.textContent = "";
    RightTeamContainer.style.setProperty('box-shadow', 'none');
}

function setPropertiesForRightTeam(teamRight,RightTeamContainer){
    teamRight.textContent = "Twoja drużyna";
    RightTeamContainer.style.setProperty('box-shadow', 'var(--box-shadow)');
}

function removePropertiesForLeftTeam(teamLeft,leftTeamContainer){
    teamLeft.textContent = "";
    leftTeamContainer.style.setProperty('box-shadow', 'none');
}

function setLeftTeam(summoner,i){
    const img = document.getElementById(`champMatchIcon${i}`);
    const name = document.getElementById(`name${i}`);
    const rank = document.getElementById(`rank${i}`);
    const champ = document.getElementById(`champ${i}`);
    const spellL = document.getElementById(`champPerkLeft${i}`);
    const spellR = document.getElementById(`champPerkRight${i}`);

    img.src = `img/champions/${summoner['champName']}.jpeg`;
    spellL.src = `img/spells/${summoner['1spellName']}.png`;
    spellR.src = `img/spells/${summoner['2spellName']}.png`;

    name.textContent = summoner['summonerName'];
    rank.textContent = summoner['rank'];
    rank.style.color = summoner['rankColor'];
    if (summoner['rank'] !== "BRAK RANGI") {
        rank.style.fontWeight = 700;
    }
    champ.textContent = summoner['champName'];
}

function setRightTeam(summoner,i){
    const img = document.getElementById(`champMatchIconR${i}`);
    const name = document.getElementById(`nameR${i}`);
    const rank = document.getElementById(`rankR${i}`);
    const champ = document.getElementById(`champR${i}`);
    const spellL = document.getElementById(`champPerkLeftR${i}`);
    const spellR = document.getElementById(`champPerkRightR${i}`);


    img.src = `img/champions/${summoner['champName']}.jpeg`;
    spellL.src = `img/spells/${summoner['1spellName']}.png`;
    spellR.src = `img/spells/${summoner['2spellName']}.png`;

    name.textContent = summoner['summonerName'];
    rank.textContent = summoner['rank'];
    rank.style.color = summoner['rankColor'];
    if (summoner['rank'] !== "BRAK RANGI") {
        rank.style.fontWeight = 800;
    }
    champ.textContent = summoner['champName'];
}

function setBannedList(champions){
    if(champions && champions.length > 1){
        for (let i = 1; i <= 10; i++) {
            const img = document.getElementById(`champBannedIcon${i}`)
            img.src = `img/champions/${champions['champName']}.jpeg`;
        }
    }
}

async function matchSearch(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const apiUrl = `http://localhost:8080/matchInfo?summonerName=${encodeURIComponent(name)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const aboutMatch = document.getElementById('aboutMatch');
        const matchCard = "Karta meczu - " + (data["gameMode"] === "CLASSIC" ? "Ranked" : data["gameMode"]);
        aboutMatch.textContent = matchCard;

        let playedTeam = "";

        const teamLeft = document.getElementById('teamLeft');
        const teamRight = document.getElementById('teamRight');
        const leftTeamContainer = document.querySelector('.leftMatchTeamContainer');
        const RightTeamContainer = document.querySelector('.rightMatchTeamContainer');

        //which team is currently playing the user you are looking for. 
        //100 - left container | 200 - right container
        if(data["userTeam"] === "100"){
            setPropertiesForLeftTeam(teamLeft,leftTeamContainer);
            removePropertiesForRightTeam(teamRight,RightTeamContainer);
            playedTeam = "teamLeft";

        } else {
            setPropertiesForRightTeam(teamRight,RightTeamContainer);
            removePropertiesForLeftTeam(teamLeft,leftTeamContainer);
            playedTeam = "teamRight";
        } 

        let leftArray = [];
        let rightArray = [];

        for (const summoner of data["summoners"]) {
            if (summoner["teamId"] === 100) {
                leftArray.push(summoner);
            } else {
                rightArray.push(summoner);
            }
        }

        for(let i = 1; i <=5; i++){
            if (leftArray[i-1]["teamId"] === 100) {
                setLeftTeam(leftArray[i-1], i);
            }
        }

        for(let i = 1; i <=5; i++){
            if (rightArray[i-1]["teamId"] === 200) {
                setRightTeam(rightArray[i-1], i);
            }
        }
        
        setBannedList(data["summoners"]["bannedChampions"]);

    } catch (error) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
    }
}