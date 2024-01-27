async function searchSummoner(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const apiUrl = `http://localhost:8080/?summonerName=${encodeURIComponent(name)}`;

    var spinnerSearch = document.getElementById("spinnerSearch");
    var searchButton = document.getElementById("searchButton");

    disableButtonAndShowSpinner(searchButton,spinnerSearch);

    try {
        /*
        const response = await fetch(apiUrl, {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          });
          */
        var beforeFillSummonerCard = document.getElementById("beforeFillSummonerCard");
        
        const response = await fetch(apiUrl);

        if(!response.ok){
            activeSearchButtonAndHideSpinner(searchButton,spinnerSearch);
            beforeFillSummonerCard.textContent = "Wystąpił problem z pobraniem profilu użytkownika!";
            beforeFillSummonerCard.style.color = 'red';

            throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = await response.json();

        activeSearchButtonAndHideSpinner(searchButton,spinnerSearch);
        removeBeforeFillSummonerCard(beforeFillSummonerCard);
        setRanks(data);
        setBackgroundImage(data);
        displayBlurOnBackgroundImage();
        
    } catch (error) {
        console.error('Błąd podczas przetwarzania odpowiedzi JSON:', error);
    }
}

function displayBlurOnBackgroundImage(){
    var boxBlurShadow = document.getElementById("boxBlurShadow");
    boxBlurShadow.style.display = "block";
}

function setBackgroundImage(data) {
    const backgroundImage = document.getElementById("matchBackground");
        backgroundImage.style = 
        `background-image: url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data["mainChamp"]}_0.jpg); 
        background-size: cover; --box-shadow: 0 0 0.7rem 3px;`
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

function removeBeforeFillSummonerCard(beforeFillSummonerCard) {
    if(beforeFillSummonerCard){
        beforeFillSummonerCard.remove();
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

    if( data !== null && Array.isArray(data["ranks"]) && data["ranks"] !== null) {
            let ranksArray = data.ranks;
            ranksArray.forEach(rank => {
                if(rank["rankFlex"]) {
                    setRankFlex(rank,data);
                    if(!userHasRankSolo){
                        removeRankSolo();
                    }
                } else if (rank["rankSolo"]) {
                    setRankSolo(rank,data);
                    if(!userHasRankFlex){
                        removeRankFlex();
                    }
                }
            });
            setProfileIconWithRank(data);
        }
}

function setRankFlex(rank,data) {
    userHasRankFlex = true;

    const rankedFlex = document.getElementById("rankedFlex");
    const leaguePointsFlex = document.getElementById("leaguePointsFlex");
    const winLossesFlex = document.getElementById("winLossesFlex");

    rankedFlex.textContent = "Ranga Flex: " + rank["rankFlex"]["tier"] + "-" + rank["rankFlex"]["rank"];
    rankedFlex.style.color = data["rankFlexColor"];

    leaguePointsFlex.textContent = "Punkty league: " + rank["rankFlex"]["leaguePoints"];
    winLossesFlex.textContent = "Wygrane-Przegrane: " + rank["rankFlex"]["wins"] + " / " + rank["rankFlex"]["losses"];
}

function setRankSolo(rank,data) {
    userHasRankSolo = true;

    const rankedSolo = document.getElementById("rankedSolo");
    const leaugePointsSolo = document.getElementById("leaugePointsSolo");
    const winLossesSolo = document.getElementById("winLossesSolo");

    rankedSolo.textContent = "Ranga Solo/Duo: " + rank["rankSolo"]["tier"] + "-" + rank["rankSolo"]["rank"];
    rankedSolo.style.color = data["rankSoloColor"];

    leaugePointsSolo.textContent = "Punkty league: " + rank["rankSolo"]["leaguePoints"];
    winLossesSolo.textContent = "Wygrane-Przegrane: " + rank["rankSolo"]["wins"] + " / " + rank["rankSolo"]["losses"];

    summonerTier = rank["rankSolo"]["tier"];
    if(rank["rankSolo"]["tier"] === "EMERALD"){
        summonerTier = "";
    }
}

function removeRankSolo() {
    rankedSolo.textContent = "";
    leaugePointsSolo.textContent = "";
    winLossesSolo.textContent = "";
}

function removeRankFlex() {
    rankedFlex.textContent = "";
    leaguePointsFlex.textContent = "";
    winLossesFlex.textContent = "";
}

function setProfileIconWithRank(data){

    var profileIcon = document.getElementById("profileIcon");
    var contentDiv = document.createElement("div");
    profileIcon.innerHTML = '';
    contentDiv.innerHTML = `
                                <div class="centeredContainer">
                                    <img src="https://ddragon.leagueoflegends.com/cdn/14.2.1/img/profileicon/${data["profileIconId"]}.png" 
                                    style="max-width: 150px; max-height: 150px; border-radius: 50%; position: relative; z-index: 1; margin-bottom: 10px">
                                </div>
                                <img src="img/tiers/${summonerTier}.png" 
                                style="max-width: 350px; max-height: 350px; position: absolute; top: 50%; left: 50%; transform: translate(-181.5%, -52%); border-radius: 50%; z-index: 2;">
                            `;

    profileIcon.appendChild(contentDiv);  
}