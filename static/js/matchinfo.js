function setPropertiesForLeftTeam(teamLeft,leftTeamContainer){
    teamLeft.textContent = "Twoja drużyna";
    leftTeamContainer.style.setProperty('box-shadow', '0 0px 15px rgba(102, 51, 153, 0.3)');
}

function removePropertiesForRightTeam(teamRight,rightTeamContainer){
    teamRight.textContent = "";
    rightTeamContainer.style.setProperty('box-shadow', 'none');
}

function setPropertiesForRightTeam(teamRight,rightTeamContainer){
    teamRight.textContent = "Twoja drużyna";
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

    img.src = `img/champions/${summoner['champName']}.jpeg`;
    spellL.src = `img/spells/${summoner['1spellName']}.png`;
    spellR.src = `img/spells/${summoner['2spellName']}.png`;

    name.textContent = summoner['summonerName'];
    rank.textContent = summoner['rank'];
    rank.style.color = summoner['rankColor'];

    if (summoner['rank'] !== "BRAK RANGI") {
        rank.style.fontWeight = 700;
    }  else {
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


    img.src = `img/champions/${summoner['champName']}.jpeg`;
    spellL.src = `img/spells/${summoner['1spellName']}.png`;
    spellR.src = `img/spells/${summoner['2spellName']}.png`;

    name.textContent = summoner['summonerName'];
    rank.textContent = summoner['rank'];
    rank.style.color = summoner['rankColor'];
    if (summoner['rank'] !== "BRAK RANGI") {
        rank.style.fontWeight = 700;
    } else {
        rank.style.fontWeight = 500;
    }
    champ.textContent = summoner['champName'];
}

function setBannedList(champions){
    if(champions && champions.length > 0){
        var bannedText = document.getElementById("bannedText");
        bannedText.textContent = "";
        for (let i = 1; i <= 10; i++) {
            const img = document.getElementById(`champBannedIcon${i}`)
            img.src = `img/champions/${champions[i-1]}.jpeg`;
            img.style.setProperty('box-shadow', '0 0 0.5rem rgba(255, 0, 0, 1)');
        }
        bannedText.textContent = "Zbanowane";
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
    const apiUrl = `http://localhost:8080/randomMatch`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var exampleSummonerName = document.getElementById("exampleSummonerName");
            exampleSummonerName.textContent = "Losowy gracz: " + data;
        })
        .catch(error => {
            console.error("Wystąpił błąd:", error);
        });
});

async function matchSearch(event) {
    event.preventDefault();

    var searchButton = document.getElementById("searchButton");
    var spinnerBorder = document.getElementById("spinnerSearch");

    disableButtonAndShowSpinner(searchButton,spinnerBorder);

    const name = document.getElementById('name').value;
    const apiUrl = `http://localhost:8080/matchInfo?summonerName=${encodeURIComponent(name)}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            activeSearchButtonAndHideSpinner(searchButton,spinnerBorder);
            var beforeFillMatchCard = document.getElementById("beforeFillMatchCard");
            beforeFillMatchCard.textContent = "Wystąpił problem z pobraniem karty meczu. Upewnij się że mecz jest rozpoczęty!";
            beforeFillMatchCard.style.color = 'red';
            throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const data = await response.json();
        activeSearchButtonAndHideSpinner(searchButton,spinnerBorder);
        displaySelectSummonerTextInRightSideBar();
        setMatchType(data);
        
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

        setBannedList(data["bannedChampions"]);
        RemoveBeforeFillMatchCardAndExampleSummonerName();

        } catch (error) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
        activeSearchButtonAndHideSpinner(searchButton,spinnerBorder)
    }
}

function RemoveBeforeFillMatchCardAndExampleSummonerName(){
    var beforeFillMatchCard = document.getElementById("beforeFillMatchCard");
    var exampleSummonerName = document.getElementById("exampleSummonerName");
    beforeFillMatchCard.remove();
    exampleSummonerName.remove();
}

function displaySelectSummonerTextInRightSideBar() {
    var selectPlayer = document.getElementById("selectPlayer");
    var textNode = document.createTextNode(" Wybierz gracza");
    selectPlayer.appendChild(textNode);
}

function setMatchType(data) {
    const aboutMatch = document.getElementById("aboutMatch");
    const matchCard = "Karta meczu - " + (data["gameMode"] === "CLASSIC" ? "Rankedowy" : data["gameMode"]);
    aboutMatch.textContent = matchCard;
}

async function getLast10Matches(event, id) {
    event.preventDefault();

    var spinnerPlayer = document.getElementById("spinnerPlayer");
    disableButtonAndShowSpinner(null,spinnerPlayer);

    var clickedElement = document.getElementById(id);
    var summonerName = clickedElement.innerText || clickedElement.textContent;
    const apiUrl = `http://localhost:8080/last10matches?summonerName=${encodeURIComponent(summonerName)}`;

    try {
        const response = await fetch(apiUrl)

    if(!response.ok){
        clickedElement.textContent = "Coś poszło nie tak! Spróbuj jeszcze raz.";
        clickedElement.style.color = 'red';
        activeSearchButtonAndHideSpinner(null,spinnerPlayer)
        throw new Error(`Błąd HTTP: ${response.status}`);
    }

    const data = await response.json();

    var matchList = document.getElementById("matchList");
    let hasMatches = true;
    matchList.innerHTML = '';

    const matchesSummonerName = document.getElementById("matchesSummonerName");
    matchesSummonerName.textContent = data["name"];

    const matchesSummonerLv = document.getElementById("matchesSummonerLv");
    matchesSummonerLv.textContent = "Lv " + data["summonerLevel"] + " - "; 

    const matchesSummonerRank = document.getElementById("matchesSummonerRank");
    matchesSummonerRank.textContent = data["rank"];
    matchesSummonerRank.style.color = data["rankColor"];


    if (Array.isArray(data["matches"]) && data["matches"].length > 0) {
        for (var i = 0; i < data["matches"].length; i++) {
            addLast10MatchesToView(hasMatches,matchList,i,data);
        }
    } else {
        hasMatches = false;
        addLast10MatchesToView(hasMatches,matchList,i,data);
    }
    } catch(error) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
        activeSearchButtonAndHideSpinner(null,spinnerPlayer)
    }
}

function addLast10MatchesToView(hasMatches,matchList,i,data){
    var matchList = document.getElementById("matchList");

    var listItem = document.createElement("li");
    var contentDiv = document.createElement("div");

    let wins = 0;
    let losses = 0;

    if(data["leagueInfo"] !== null) {
        wins = data["leagueInfo"]["wins"];
        losses = data["leagueInfo"]["losses"];
    } 

    if (hasMatches) {
        var selectPlayer = document.getElementById("selectPlayer");
        var lastRankedGames = document.getElementById("lastRankedGames");
        var winLosses = document.getElementById("winLosses");
       

        lastRankedGames.textContent = "OSTATNIE RANKEDY";
        winLosses.textContent = "WYGRANE - PRZEGRANE";
        

        selectPlayer.innerHTML = '';
        selectPlayer.style.margin = 0;

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
                        <img class="last10MatchesImg" src="img/champions/${data["matches"][i]["matchChampName"]}.jpeg">
                        <div class="nameAndKda">
                            <div class="fw-bold" id="last10MatchesName">${data["matches"][i]["matchChampName"]}</div>
                            <div id="last10MachesKda">${data["matches"][i]["kills"]} | ${data["matches"][i]["deaths"]} | ${data["matches"][i]["assists"]}</div>   
                        </div> 
                    </div>
                </div>
                <div class="last10MatchesWinAndLane">
                    ${win}
                    <div class="lane">${data["matches"][i]["lane"]}</div>
                </div>
            </div>`;

    } else {
        contentDiv.innerHTML = "Brak rozegranych rankedów w ostatnich 20 grach";
    }

    setWinLosses(wins,losses);

    listItem.appendChild(contentDiv);
    matchList.appendChild(listItem);   
}

function setWinLosses(wins,losses) {
    const leagueInfoWins = document.getElementById("leagueInfoWins");
    leagueInfoWins.textContent = wins;
    leagueInfoWins.style.color = "green";

    const leagueInfoLosses = document.getElementById("leagueInfoLosses");
    leagueInfoLosses.textContent = losses;
    leagueInfoLosses.style.color = "red";
}