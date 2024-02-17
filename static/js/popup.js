async function openPopup(event,matchId,puuId) {
    event.preventDefault();
    const apiUrl = `${window.home_url}/previous-match?matchId=${encodeURIComponent(matchId)}`;

    fetch('popup.html') 
    .then(response => response.text()) 
    .then(html => {
        document.getElementById('popupContainer').innerHTML = html; 
        document.getElementById('myPopup').style.display = 'block'; 
    })
    .catch(error => console.error('Wystąpił błąd podczas pobierania popupa:', error));

    try {
        const response = await fetch(apiUrl, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });

        if (!response.ok) {            
            if(response.status === 429){
            }
            throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const data = await response.json();

        fillUpSummonerList(data,puuId);
        setTime(data);
        fillUpBannedList(data);
        setObjectives(data);

    } catch (error) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
    }
}

function setObjectives(data) {
    for(var obj of data['teamObjective']) {
        if(obj.teamId === 100) {
            createObjective(obj);
        } else {
            createObjective(obj);
        }
    }
}

function createObjective(obj) {
    var baronDiv = document.createElement('div');
    baronDiv.classList.add('baron');

    var dragonDiv = document.createElement('div');
    dragonDiv.classList.add('dragon');

    var championDiv = document.createElement('div');
    championDiv.classList.add('champion');

    var winDiv = document.createElement('div');
    winDiv.classList.add('win');

    var whichTeam = obj.teamId === 100 ? 'containerRightTop' : 'containerRightBot';
    var list = document.getElementById(whichTeam);

    var baronText = 'Baronów: ';
    var dragonText = 'Smoków: ';
    var enemiesText = 'Przeciwników: ';

    winDiv.innerHTML = `
        <div id="win">${obj.teamId === 100 ? "Wygrana" : "Przegrana"}</div>
    
    `;

    // english version
    var language = sessionStorage.getItem('language');
    if(language && language !== 'pl') {
        winDiv.innerHTML = `
        <div id="win">${obj.teamId === 100 ? "Win" : "Lose"}</div>
    
        `;

        baronText = 'Barons: ';
        dragonText = 'Dragons: ';
        enemiesText = 'Enemies: ';
    }

    baronDiv.innerHTML = `
        <div class="baronText">${baronText}</div>
        <div class="baronKills">${obj.baronKills}</div>
    `;
    dragonDiv.innerHTML = `
        <div class="dragonText">${dragonText}</div>
        <div class="dragonKills">${obj.dragonKills}</div>
    `;
    championDiv.innerHTML = `
        <div class="championText">${enemiesText}</div>
        <div class="championKills">${obj.championKills}</div>
    `;

    list.appendChild(baronDiv);
    list.appendChild(dragonDiv);
    list.appendChild(championDiv);
    list.appendChild(winDiv);
}

function fillUpBannedList(data) {
    var champIconUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons';
    var list = document.getElementById('bannedChampions');
    
    for(var bannedChamp of data['bannedChampions']) {
        var bannedDiv = document.createElement('div');
        bannedDiv.classList.add('champBannedIcon');
        bannedDiv.innerHTML = `
            <img src="${champIconUrl}/${bannedChamp.championId}.png">
        `;
        list.appendChild(bannedDiv);
    }
}

function setTime(data) {
    text.textContent = 'Czas:';
    // english version
    var language = sessionStorage.getItem('language');
    if(language && language !== 'pl') {
        text.textContent = 'Time:';
    }

    var minutes = Math.floor(data.timeInSeconds / 60);
    var remainingSeconds = data.timeInSeconds % 60;
    var formattedMinutes = String(minutes).padStart(2, '0');
    var formattedSeconds = String(remainingSeconds).padStart(2, '0');
    var formattedTime = `${formattedMinutes}:${formattedSeconds}`;
    document.getElementById('time').innerHTML = formattedTime;
}

function fillUpSummonerList(data,puuId) {
    for(var summoner of data["summoners"]) {
        if(summoner.win === true) {
            makeDivForSummoner(summoner,'100',puuId);
        } else {
            makeDivForSummoner(summoner,'200',puuId);
        }
    }
}

function makeDivForSummoner(summoner,teamId,puuId) {
    var whichList = teamId === '100' ? 'topSummonerList' : 'bottomSummonerList';
    var list = document.getElementById(whichList);

    var summonerDiv = document.createElement('div');
    summonerDiv.classList.add('summoner');
    summonerDiv.innerHTML = `
        <div class="lane">${summoner.lane.charAt(0)}</div>
        <div class="champion">${summoner.matchChampName}</div>
        <div class="championIcon"><img class="champ" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${summoner.championId}.png"></div>
        <div class="summonerName">${summoner.summonerName}</div>
        <div class="kda">${summoner.kills} / ${summoner.deaths} / ${summoner.assists}</div>
        <div class="dmg"><img src="img/fighticon.png" style="max-height: 30px; max-width: 30px;">${summoner.dealtDamage}</div>
        <div class="rank">${summoner.rank}</div>
    `;
    summonerDiv.querySelector('.rank').style.color = summoner.rankColor;

    if(summoner.rank === 'BRAK RANGI') {
        summonerDiv.querySelector('.rank').textContent = '';
    }
    if(puuId === summoner.puuId) {
        summonerDiv.querySelector('.lane').style.color = 'rgb(161, 86, 236)';
        summonerDiv.querySelector('.lane').style.fontWeight = '700';

        summonerDiv.querySelector('.champion').style.color = 'rgb(161, 86, 236)';
        summonerDiv.querySelector('.champion').style.fontWeight = '700';

        summonerDiv.querySelector('.summonerName').style.color = 'rgb(161, 86, 236)';
        summonerDiv.querySelector('.summonerName').style.fontWeight = '700';

        summonerDiv.querySelector('.kda').style.color = 'rgb(161, 86, 236)';
        summonerDiv.querySelector('.kda').style.fontWeight = '700';

        summonerDiv.querySelector('.dmg').style.color = 'rgb(161, 86, 236)';
        summonerDiv.querySelector('.dmg').style.fontWeight = '700';
    }
    list.appendChild(summonerDiv);
}

function closePopup() {
    var popup = document.getElementById('myPopup');
    var content = document.getElementById('content');
    var blur = document.getElementById('backgroundColor');

    content.style.animation = 'none';
    content.style.animation = 'fadeOutPopup 0.3s ease forwards';
    blur.style.animation = 'blurOut 0.3s ease forwards';

    setTimeout(function() {
        popup.style.display = 'none';
    }, 300);
}