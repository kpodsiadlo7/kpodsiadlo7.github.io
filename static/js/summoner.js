async function searchSummoner(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    
    var spinnerSearch = document.getElementById("spinnerSearch");
    var searchButton = document.getElementById("searchButton");

    disableButtonAndShowSpinner(searchButton,spinnerSearch);


    //const apiUrl = `http://localhost:8080/?summonerName=${encodeURIComponent(name)}`;



    const apiUrl = `${window.home_url}/?summonerName=${encodeURIComponent(name)}`;
    try {
        
        const response = await fetch(apiUrl, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });
          
        var beforeFillSummonerCard = document.getElementById("beforeFillSummonerCard");
        var exampleNames = document.getElementById("exampleNames");
        
        //const response = await fetch(apiUrl);

        if(!response.ok){
            beforeFillSummonerCard.textContent = "Wystąpił problem z pobraniem profilu użytkownika!";
            if(response.status === 429){
                beforeFillSummonerCard.innerHTML = "Przekroczono limit API. Daj chwilę :)"
            }
            activeSearchButtonAndHideSpinner(searchButton,spinnerSearch);
            beforeFillSummonerCard.style.color = "red";

            throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = await response.json();
        var matchList = document.getElementById("matchList");
        var lastRankedGames = document.getElementById("lastRankedGames");

        activeSearchButtonAndHideSpinner(searchButton,spinnerSearch);
        removeBeforeFillSummonerCard(beforeFillSummonerCard,exampleNames);
        setRanks(data);
        setBackgroundAndSideImage(data);
        displayBlurOnBackgroundImage();
        displayInfoAboutLoading20LatMatches(lastRankedGames,matchList);
        getLast20Matches(name,matchList,lastRankedGames);
        
    } catch (error) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
    }
}

function displayInfoAboutLoading20LatMatches(lastRankedGames,matchList) {
    var winLosses = document.getElementById("winLosses");
    var leagueInfoWins = document.getElementById("leagueInfoWins");
    var leagueInfoLosses = document.getElementById("leagueInfoLosses");
    if (winLosses && leagueInfoWins && leagueInfoLosses) {
        winLosses.textContent = '';
        leagueInfoWins.textContent = '';
        leagueInfoLosses.textContent = '';
    }
    matchList.textContent = '';
    lastRankedGames.innerHTML = `
                            Pobieranie 20 rankedów z ostatnich 50 gier
                            <span class="spinner-border m-2" aria-hidden="true" role="status" style="font-size: 5px; height: 15px; width: 15px;"></span>
                            `; 
    lastRankedGames.style.color = "#363949";
}

function displayBlurOnBackgroundImage(){
    var boxBlurShadow = document.getElementById("boxBlurShadow");
    boxBlurShadow.style.display = "block";
}

function setBackgroundAndSideImage(data) {
    const backgroundImage = document.getElementById("matchBackground");
    const mainChampName = data["mainChamp"] === undefined ? "Darius" : data["mainChamp"];
    backgroundImage.style = 
        `background-image: url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${mainChampName}_0.jpg); 
        background-size: cover; --box-shadow: 0 0 0.7rem 3px;`

    const sideBarImage = document.getElementById("sideBar");
    sideBarImage.style = `background-image: url(https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${mainChampName}_1.jpg);`;
        
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

function removeBeforeFillSummonerCard(beforeFillSummonerCard,exampleNames) {
    if(beforeFillSummonerCard && exampleNames){
        beforeFillSummonerCard.remove();
        exampleNames.remove();
    }
}


/* Zmienne globalne 
// -Flagi do kasowania informacji o randze jeżeli nie występuje */ 
let userHasRankSolo = false;
let userHasRankFlex = false;

// -Tier
let summonerTier = null;
/* ----------------------------------------------------------- */


function setRanks(data){

    const summonerName = document.getElementById("nameSummoner");
    summonerName.textContent = data["name"];

    const sumonnerLv = document.getElementById("summonerLevel");
    sumonnerLv.textContent = "Level " + data["summonerLevel"];

    userHasRankSolo = false;
    userHasRankFlex = false;
    removeRankSolo();
    removeRankFlex();

    if( data !== null && Array.isArray(data["ranks"]) && data["ranks"] !== null) {
            let ranksArray = data.ranks;
            ranksArray.forEach(rank => {
                if(rank["queueType"] === "RANKED_FLEX_SR") {
                    setRankFlex(rank,data);
                    if(!userHasRankSolo){
                        removeRankSolo();
                    }
                } else if (rank["queueType"] === "RANKED_SOLO_5x5") {
                    setRankSolo(rank,data);
                    if(!userHasRankFlex){
                        removeRankFlex();
                    }
                }
            });
            setProfileIconWithRank(data);
        } else {
            
        }
}

function setRankFlex(rank,data) {
    userHasRankFlex = true;

    const rankedFlex = document.getElementById("rankedFlex");
    const leaguePointsFlex = document.getElementById("leaguePointsFlex");
    const winLossesFlex = document.getElementById("winLossesFlex");

    rankedFlex.textContent = "Ranga Flex: " + rank["tier"] + "-" + rank["rank"];
    rankedFlex.style.color = data["rankFlexColor"];

    leaguePointsFlex.textContent = "Punkty league: " + rank["leaguePoints"];
    winLossesFlex.textContent = "Wygrane-Przegrane: " + rank["wins"] + " / " + rank["losses"];

    if(rank["tier"] === "EMERALD"){
        summonerTier = "MASTER";
    }
}

function setRankSolo(rank,data) {
    userHasRankSolo = true;

    const rankedSolo = document.getElementById("rankedSolo");
    const leaugePointsSolo = document.getElementById("leaugePointsSolo");
    const winLossesSolo = document.getElementById("winLossesSolo");

    rankedSolo.textContent = "Ranga Solo/Duo: " + rank["tier"] + "-" + rank["rank"];
    rankedSolo.style.color = data["rankSoloColor"];

    leaugePointsSolo.textContent = "Punkty league: " + rank["leaguePoints"];
    winLossesSolo.textContent = "Wygrane-Przegrane: " + rank["wins"] + " / " + rank["losses"];

    summonerTier = rank["tier"];
    if(rank["tier"] === "EMERALD"){
        summonerTier = "MASTER";
    }
}

function removeRankSolo() {
    rankedSolo.textContent = "Ranga Solo/Duo: BRAK RANGI";
    rankedSolo.style.color = "white";
    leaugePointsSolo.textContent = "";
    winLossesSolo.textContent = "";
}

function removeRankFlex() {
    rankedFlex.textContent = "Ranga Flex: BRAK RANGI";
    rankedFlex.style.color = "white";
    leaguePointsFlex.textContent = "";
    winLossesFlex.textContent = "";
}

function setProfileIconWithRank(data){

    var profileIcon = document.getElementById("profileIcon");
    var contentDiv = document.createElement("div");
    var tierName = summonerTier === null ? "IRON" : summonerTier; 
    profileIcon.innerHTML = '';
    contentDiv.innerHTML = `
                                <div class="centeredContainer">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/14.2.1/img/profileicon/${data["profileIconId"]}.png" 
                                    style="max-width: 140px; max-height: 140px; border-radius: 50%; position: relative; z-index: 1; margin-bottom: 20px">
                                </div>
                                <img src="img/tiers/${tierName}.png" 
                                style="max-width: 350px; max-height: 350px; position: absolute; top: 50%; left: 50%; transform: translate(-181.5%, -52%); border-radius: 50%; z-index: 2;">
                            `;

    profileIcon.appendChild(contentDiv);  
}

async function getLast20Matches(summonerName,matchList,lastRankedGames) {
    
    const apiUrl = `${window.home_url}/last20matches?summonerName=${encodeURIComponent(summonerName)}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });

    //const apiUrl = `http://localhost:8080/last20matches?summonerName=${encodeURIComponent(summonerName)}`;

    //try {
        //const response = await fetch(apiUrl)

    if(!response.ok){
        lastRankedGames.innerHTML = "Coś poszło nie tak! Spróbuj jeszcze raz.";
        if(response.status === 429){
            lastRankedGames.innerHTML = "Przekroczono limit API. Daj chwilę :)"
        }
        lastRankedGames.style.color = 'red';
        throw new Error(`Błąd HTTP: ${response.status}`);
    }

    const data = await response.json();

    matchList.innerHTML = '';

    if (Array.isArray(data["matches"]) && data["matches"].length > 0) {
        for (var i = 0; i < data["matches"].length; i++) {
            addLast20MatchesToView(matchList,i,data);
        }
        setWinLosses(data);
    } else {
        lastRankedGames.innerHTML = "Brak rankedów z ostatnich 50 gier";
        lastRankedGames.style.color = 'red';
    }
    } catch(error) {
        lastRankedGames.innerHTML = "Błąd poczas pobierania";
        if(error.message.includes("429")){
            lastRankedGames.innerHTML = "Przekroczono limit API. Daj chwilę :)"
        }
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
        lastRankedGames.style.color = 'red';
    }
}

function addLast20MatchesToView(matchList,i,data){
    var listItem = document.createElement("li");
    var contentDiv = document.createElement("div");

    let win = "";
        
    if(data["matches"][i]["win"] === "WYGRANA") {
        win = `<span class="badge bg-success rounded-pill">${data["matches"][i]["win"]}</span>`;
    } else {
        win = `<span class="badge bg-danger rounded-pill">${data["matches"][i]["win"]}</span>`;
    }
        
    contentDiv.innerHTML = 
         `<div class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="item">
                <img class="last10MatchesImg" src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${data["matches"][i]["championId"]}.png">
                    <div class="nameAndKda">
                        <div class="fw-bold" id="last10MatchesImg">${data["matches"][i]["matchChampName"]}</div>
                        <div id="last10MatchesImg">${data["matches"][i]["kills"]} | ${data["matches"][i]["deaths"]} | ${data["matches"][i]["assists"]}</div>   
                    </div> 
                    <div class="damage">
                        <div class="fw-bold" id="last10MatchesImg">DMG</div>
                        <div id="last10MatchesImg">${data["matches"][i]["dealtDamage"]}</div>   
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

function setWinLosses(data,winLosses) {
    var winLosses = document.getElementById("winLosses");
    const wins = data["wins"];
    const losses = data["losses"];
    const matchQty = data["wins"] + data["losses"];
    winLosses.textContent = "Wygrane - Przegrane";  

    lastRankedGames.innerHTML = "OSTATNIE RANKEDY - " + matchQty;

    const leagueInfoWins = document.getElementById("leagueInfoWins");
    leagueInfoWins.textContent = wins;
    leagueInfoWins.style.color = "green";

    const leagueInfoLosses = document.getElementById("leagueInfoLosses");
    leagueInfoLosses.textContent = losses;
    leagueInfoLosses.style.color = "red";
}