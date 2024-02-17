document.addEventListener('DOMContentLoaded', function() {
    var language = sessionStorage.getItem('language');
    changeMenuLanguage(language);
    if(language) {
        var spinnerToActive = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerSearch"></span>';
        var spinnerActive = '<span class="spinner-border m-2" aria-hidden="true" role="status" style="font-size: 5px; height: 15px; width: 15px;"></span>';

        beforeFillMatchCard.textContent = language === 'pl' ? 
        'Aby wyszukać grę, wprowadź nazwę gracza powyżej. Pamiętaj, mecz musi trwać' : 
        "To search for a game, enter the player's name above. The match must be ongoing.";
       
        var loadingText = language === 'pl' ? 'Pobieranie losowego meczu' : 'Fetching a random match...';
        exampleSummonerName.innerHTML = loadingText + spinnerActive;
        
        title.textContent = language === 'pl' ? 'Wyszukaj mecz' : 'Search match';
        var searchText = language === 'pl' ? 'Wyszukaj' : 'Search';
        searchButton.innerHTML = spinnerToActive + searchText;

        document.getElementById('name').placeholder = language === 'pl' ? 'Szukaj mecz po nazwie gracza' : 'Search a match by player name';

        aboutMatch.textContent = language === 'pl' ? 'Karta meczu' : 'Match card';
    }
});

function setPropertiesForLeftTeam(teamLeft,leftTeamContainer){
    teamLeft.textContent = "Twoja drużyna";

    // english version
    var language = sessionStorage.getItem('language');
    if(language && language !== 'pl') {
        teamLeft.textContent = "Your team";
    }
    
    leftTeamContainer.style.setProperty('box-shadow', '0 0px 15px rgba(102, 51, 153, 0.3)');
}

function removePropertiesForRightTeam(teamRight,rightTeamContainer){
    teamRight.textContent = "";
    rightTeamContainer.style.setProperty('box-shadow', 'none');
}

function setPropertiesForRightTeam(teamRight,rightTeamContainer){
    teamRight.textContent = "Twoja drużyna";

    // english version
    var language = sessionStorage.getItem('language');
    if(language && language !== 'pl') {
        teamRight.textContent = "Your team";
    }
    rightTeamContainer.style.setProperty('box-shadow', '0 0px 15px rgba(102, 51, 153, 0.3)');
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
    const puuId = document.getElementById(`puuId${i}`);

    img.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${summoner["championId"]}.png`;
    spellL.src = `img/spells/${summoner['spellName1']}.png`;
    spellR.src = `img/spells/${summoner['spellName2']}.png`;

    name.textContent = summoner['summonerName'];
    rank.textContent = summoner['rank'];
    rank.style.color = summoner['rankColor'];
    puuId.textContent = summoner['puuid'];

    if (summoner['rank'] !== "BRAK RANGI") {
        rank.style.fontWeight = 700;
    } else {
        // english version
        var language = sessionStorage.getItem('language');
        if(language && language !== 'pl') {
            rank.textContent = 'NONE';
        }
        rank.style.fontWeight = 500;
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
    const puuIdR = document.getElementById(`puuIdR${i}`);


    img.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${summoner["championId"]}.png`;
    spellL.src = `img/spells/${summoner['spellName1']}.png`;
    spellR.src = `img/spells/${summoner['spellName2']}.png`;

    name.textContent = summoner['summonerName'];
    rank.textContent = summoner['rank'];
    rank.style.color = summoner['rankColor'];
    puuIdR.textContent = summoner['puuid'];

    if (summoner['rank'] !== "BRAK RANGI") {
        rank.style.fontWeight = 700;
    } else {
        // english version
        var language = sessionStorage.getItem('language');
        if(language && language !== 'pl') {
            rank.textContent = 'NONE';
        }
        rank.style.fontWeight = 500;
    }
    champ.textContent = summoner['champName'];
}

function setBannedList(champions){
    if (champions && champions.length > 0) {
        var bannedText = document.getElementById("bannedText");
        var bannedList = document.getElementById("bannedList");
        bannedList.textContent = '';  
        bannedText.textContent = '';

        for (var i = 0; i < 10; i++) {
            var bannedChampDiv = document.createElement("div");
            bannedChampDiv.className = `banned${i + 1}`;
            bannedChampDiv.innerHTML = `<img class="champBannedIcon" id="champBannedIcon${i+1}" src="" alt="ChampIcon">`;
            bannedList.appendChild(bannedChampDiv);
    
            const img = document.getElementById(`champBannedIcon${i + 1}`);
            img.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champions[i]["name"]}.png`;   
            img.style.setProperty('box-shadow', '0 0 0.5rem rgba(255, 0, 0, 1)');
        }
        bannedText.textContent = "Zbanowani";

        // english version
        var language = sessionStorage.getItem('language');
        if(language && language !== 'pl') {
            bannedText.textContent = "Banned";
        }
    }
    
}

function disableButtonAndShowSpinner(searchButton,spinnerBorder){
    if(searchButton !== null){
        searchButton.disabled = true;
    }
    if(spinnerBorder !== null) {
        spinnerBorder.classList.add("d-inline-block");
    }
}

function activeSearchButtonAndHideSpinner(searchButton,spinnerBorder){
    if(searchButton !== null){
        searchButton.disabled = false;
    }
    if(spinnerBorder !== null) {
        spinnerBorder.classList.remove("d-inline-block");
    }
}

// Pobranie przykładowej nazwy gracza z losowego rozgrywanego meczu
document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = `${window.home_url}/randomMatch`;
    var exampleSummonerName = document.getElementById("exampleSummonerName");
    fetch(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }})
        .then(response => response.text())
        .then(data => {   
            var language = sessionStorage.getItem('language');
            exampleSummonerName.textContent = data === "Brak listy gier. Spróbuj ponownie za chwilę" ? "Brak listy gier. Spróbuj ponownie za chwilę" : ("Losowy gracz: " + data);
            if(language && language !== 'pl') {
                exampleSummonerName.textContent = data === "Brak listy gier. Spróbuj ponownie za chwilę" ? "No game list. Please try again later" : ("Random user: " + data) ;
            }
            exampleSummonerName.style.color = data === "Brak listy gier. Spróbuj ponownie za chwilę" ? "red" : "black";
        })
        .catch(error => {
            var spinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerPlayer"></span>`;
            exampleSummonerName.textContent = "Odśwież aby pobrać losowego gracza";
            var reason = "Przekroczono limit API. Daj chwilę :)";

            // english version
            var language = sessionStorage.getItem('language');
            if(language && language !== 'pl') {
                reason = "API limit exceeded. Please wait a moment :)";
                exampleSummonerName.textContent = "Refresh to fetch a random player";
            }

            if(response.status === 429){
                exampleSummonerName.innerHTML =  spinner + reason;
            }
            console.error("Wystąpił błąd:", error);
            
        });
});


async function matchSearch(event) {
    event.preventDefault();

    var searchButton = document.getElementById("searchButton");
    var spinnerBorder = document.getElementById("spinnerSearch");

    disableButtonAndShowSpinner(searchButton,spinnerBorder);

    const name = document.getElementById('name').value;
    const apiUrl = `${window.home_url}/matchInfo?summonerName=${encodeURIComponent(name)}`;

    try {
        //const response = await fetch(apiUrl);
        const response = await fetch(apiUrl, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });

        if (!response.ok) {
            activeSearchButtonAndHideSpinner(searchButton,spinnerBorder);
            var beforeFillMatchCard = document.getElementById("beforeFillMatchCard");
            var spinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerPlayer"></span>`;

            beforeFillMatchCard.textContent = "Wystąpił problem z pobraniem karty meczu. Upewnij się że mecz jest rozpoczęty!";
            var reason = "Przekroczono limit API. Daj chwilę :)";

            // english version
            var language = sessionStorage.getItem('language');
            if(language && language !== 'pl') {
                beforeFillMatchCard.textContent = "There was a problem retrieving the match card. Make sure the match has started!";
                reason = "API limit exceeded. Please wait a moment :)";
            }

            if(response.status === 429){
                beforeFillMatchCard.innerHTML = spinner + reason;
            }
            beforeFillMatchCard.style.color = 'red';
            throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const data = await response.json();
        activeSearchButtonAndHideSpinner(searchButton,spinnerBorder);
        displaySelectSummonerTextInRightSideBar();
        setMatchType(data);
        

        const teamLeft = document.getElementById('teamLeft');
        const teamRight = document.getElementById('teamRight');
        const leftTeamContainer = document.querySelector('.leftMatchTeamContainer');
        const RightTeamContainer = document.querySelector('.rightMatchTeamContainer');

        //which team is currently playing the user you are looking for. 
        //100 - left array | 200 - right array
        if(data["userTeam"] === "100"){
            setPropertiesForLeftTeam(teamLeft,leftTeamContainer);
            removePropertiesForRightTeam(teamRight,RightTeamContainer);

        } else {
            setPropertiesForRightTeam(teamRight,RightTeamContainer);
            removePropertiesForLeftTeam(teamLeft,leftTeamContainer);
        } 

        setBothTeamDependsOnTeamId(data);
        setBannedList(data["bannedChampions"]);
        RemoveBeforeFillMatchCardAndExampleSummonerName();

        } catch (error) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
        activeSearchButtonAndHideSpinner(searchButton,spinnerBorder)
    }
}

function setBothTeamDependsOnTeamId(data) {
    var leftArray = [];
    var rightArray = [];

        for (const summoner of data["summoners"]) {
            if (summoner["teamId"] === 100) { 
                leftArray.push(summoner);
            } else {
                rightArray.push(summoner);
            }
        }

        for(var i = 1; i <=5; i++){
            if (leftArray[i-1]["teamId"] === 100) {
                setLeftTeam(leftArray[i-1], i);
            }
        }

        for(var i = 1; i <=5; i++){
            if (rightArray[i-1]["teamId"] === 200) {
                setRightTeam(rightArray[i-1], i);
            }
        }
}

function RemoveBeforeFillMatchCardAndExampleSummonerName(){
    var beforeFillMatchCard = document.getElementById("beforeFillMatchCard");
    var exampleSummonerName = document.getElementById("exampleSummonerName");
    if(beforeFillMatchCard && exampleSummonerName) {
        beforeFillMatchCard.remove();
        exampleSummonerName.remove();
    } 
}

function displaySelectSummonerTextInRightSideBar() {
    var lastRankedGames = document.getElementById("lastRankedGames");

    if (!lastRankedGames.textContent.includes("OSTATNIE RANKEDY")) {
        var selectPlayer = document.getElementById("selectPlayer");
        var textNode = selectPlayer.textContent.includes("Wybierz gracza") ? "" : document.createTextNode("Wybierz gracza");
        if(textNode !== ""){

            // english version
        var language = sessionStorage.getItem('language');
        if(language && language !== 'pl') {
            textNode = document.createTextNode("Select player")
        }

        selectPlayer.appendChild(textNode);
        } 
    } 
}

function setMatchType(data) {
    const aboutMatch = document.getElementById("aboutMatch");
    var matchCardtext = "Karta meczu - ";
    var matchKind = "Rankedowy";
    var language = sessionStorage.getItem('language');
        if(language && language !== 'pl') {
            matchCardtext = "Match card - ";
            matchKind = 'Ranked';
        }
    const matchCard = matchCardtext + (data["gameMode"] === "CLASSIC" ? matchKind : data["gameMode"]);
    aboutMatch.textContent = matchCard;
}

async function getLast3Matches(event, id) {
    event.preventDefault();

    var spinnerPlayer = document.getElementById("spinnerPlayer");
    disableButtonAndShowSpinner(null,spinnerPlayer);

    var clickedElement = document.getElementById(id);
    var summonerPuuId = clickedElement.innerText || clickedElement.textContent;

    const apiUrl = `${window.home_url}/last3matches?puuId=${encodeURIComponent(summonerPuuId)}`;
    var selectPlayerElement = document.getElementById("selectPlayer");

    try {
        //const response = await fetch(apiUrl)
        const response = await fetch(apiUrl, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });
    var language = sessionStorage.getItem('language');
    var spinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerPlayer"></span>`;

    if(!response.ok){
        var reason = "Coś poszło nie tak! Spróbuj jeszcze raz.";
        var spinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerPlayer"></span>`;
        lastRankedGames.innerHTML = reason + spinner;

        // english version
        if(language && language !== 'pl') {
            reason = 'API limit exceeded. Please wait a moment :)';
        }

        if(response.status === 429){
            lastRankedGames.innerHTML = spinner + reason;
        }
        lastRankedGames.style.color = 'red';
        activeSearchButtonAndHideSpinner(null,spinnerPlayer)
        throw new Error(`Błąd HTTP: ${response.status}`);
    }

    selectPlayerElement.textContent = '';
    const data = await response.json();

    var matchList = document.getElementById("matchList");
    matchList.innerHTML = '';
    var reason = "Brak rankedów z ostatnich 20 gier";

    setSummonerNameLvAndRank(data);

    if (Array.isArray(data["matches"]) && data["matches"].length > 0) {
        for (var i = 0; i < data["matches"].length; i++) {
            addLast3MatchesToView(matchList,i,data);
            activeSearchButtonAndHideSpinner(null,spinnerPlayer);
        }
        setWinLosses(data,lastRankedGames);
    } else {
        activeSearchButtonAndHideSpinner(null,spinnerPlayer);
        clearLastWinsAndLosses();
        
        if(language && language !== 'pl') {
            reason = 'No ranked games from the last 20 matches';
        }
        lastRankedGames.innerHTML = reason + spinner;
        lastRankedGames.style.color = 'red';
    }
    } catch(error) {
        var err = 'Błąd poczas pobierania';
        if(language && language !== 'pl') {
            reason = 'API limit exceeded. Please wait a moment :)';
            err = 'Error during featching player';
        }
        lastRankedGames.innerHTML = spinner + err;

        if(error.message.includes("429")){
            lastRankedGames.innerHTML = spinner + reason;
        }
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
        lastRankedGames.style.color = 'red';
        activeSearchButtonAndHideSpinner(null,spinnerPlayer)
    } 
}

function clearLastWinsAndLosses(){
    var winLosses = document.getElementById("winLosses");
    var leagueInfoWins = document.getElementById("leagueInfoWins");
    var leagueInfoLosses = document.getElementById("leagueInfoLosses");
    if (winLosses && leagueInfoWins && leagueInfoLosses) {
        winLosses.textContent = '';
        leagueInfoWins.textContent = '';
        leagueInfoLosses.textContent = '';
    }
}

function setSummonerNameLvAndRank(data) {
    const matchesSummonerName = document.getElementById("matchesSummonerName");
    matchesSummonerName.textContent = data["name"];

    const matchesSummonerLv = document.getElementById("matchesSummonerLv");
    matchesSummonerLv.textContent = "Lv " + data["summonerLevel"] + " - "; 

    const matchesSummonerRank = document.getElementById("matchesSummonerRank");
    matchesSummonerRank.textContent = data["rank"];
    matchesSummonerRank.style.color = data["rankColor"];
}

function addLast3MatchesToView(matchList,i,data){
    var listItem = document.createElement("li");
    var contentDiv = document.createElement("div");

    var win = "";
        
    if(data["matches"][i]["win"] === true) {
        win = `<span class="badge bg-success rounded-pill">Wygrana</span>`;
    } else {
        win = `<span class="badge bg-danger rounded-pill">Przegrana</span>`;
    }
        
    contentDiv.innerHTML = 
         `<div class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="item" onclick="openPopup(event,'${data["matches"][i]["matchId"]}','${data.puuid}')" style="cursor: pointer;">
                    <img class="last10MatchesImg" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${data["matches"][i]["championId"]}.png">
                    <div class="nameAndKda">
                        <div class="fw-bold">${data["matches"][i]["matchChampName"]}</div>
                        <div>${data["matches"][i]["kills"]} | ${data["matches"][i]["deaths"]} | ${data["matches"][i]["assists"]}</div>   
                    </div> 
                    <div class="damage">
                        <div class="fw-bold">DMG</div>
                        <div>${data["matches"][i]["dealtDamage"]}</div>   
                    </div> 
                </div>
            </div>
            <div class="last10MatchesWinAndLane">
                ${win}
                <div class="lane">${data["matches"][i]["lane"]}</div>
            </div>
        </div>`;

    listItem.appendChild(contentDiv);
    matchList.appendChild(listItem);
}

function setWinLosses(data,lastRankedGames) {
    var winLosses = document.getElementById("winLosses");
    const wins = data["wins"];
    const losses = data["losses"];
    const sumMatch = data["wins"]+data["losses"];
    var lastRankedText = " OSTATNIE RANKEDY - ";
    var winAndLossesText = "Wygrane - Przegrane";
    
    var language = sessionStorage.getItem('language');
    if(language && language !== 'pl') {
        lastRankedText = " LAST RANKED MATCHES - ";
        winAndLossesText = "Wins - Losses";
    }
    winLosses.textContent =   winAndLossesText;
    lastRankedGames.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerPlayer"></span>`+ lastRankedText + sumMatch;
    lastRankedGames.style.color = "#363949";

    const leagueInfoWins = document.getElementById("leagueInfoWins");
    leagueInfoWins.textContent = wins;
    leagueInfoWins.style.color = "green";

    const leagueInfoLosses = document.getElementById("leagueInfoLosses");
    leagueInfoLosses.textContent = losses;
    leagueInfoLosses.style.color = "red";
}