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
        rank.style.fontStyle = 500;
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
        rank.style.fontStyle = 500;
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

async function getLast10Matches(event, id) {
    event.preventDefault();
    var clickedElement = document.getElementById(id);
    var summonerName = clickedElement.innerText || clickedElement.textContent;
    const apiUrl = `http://localhost:8080/last10matches?summonerName=${encodeURIComponent(summonerName)}`;
    const response = await fetch(apiUrl)

    const data = await response.json();

    var matchList = document.getElementById("matchList");
    let hasMatches = "true";
    matchList.innerHTML = '';

    if (Array.isArray(data["matches"]) && data["matches"].length > 0) {
        for (var i = 0; i < data["matches"].length; i++) {
            addLast10MatchesToView(hasMatches,matchList,i,data);
        }
    } else {
        hasMatches = "false";
        addLast10MatchesToView(hasMatches,matchList,i,data);
    }
}

function addLast10MatchesToView(hasMatches,matchList,i,data){
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
    
    var contentDiv = document.createElement("div");
    contentDiv.classList.add("ms-2", "me-auto");

    if(hasMatches === "true") {
        contentDiv.innerHTML = 
        `<img class="last10MatchesImg" src="img/champions/${data["matches"][i]["matchChampName"]}.jpeg">
        <div class='fw-bold'>${data["matches"][i]["matchChampName"]}</div>
        ${data["matches"][i]["kills"]} | ${data["matches"][i]["deaths"]} | ${data["matches"][i]["assists"]}`;
    
    
        var badgeSpan = document.createElement("span");
        badgeSpan.classList.add("badge", "bg-primary", "rounded-pill");
        badgeSpan.textContent = "14";
        listItem.appendChild(badgeSpan);
    } else {
        contentDiv.innerHTML = "Brak rozegranych rankedów w ostatnich 50 grach";
    }  

    listItem.appendChild(contentDiv);    
    matchList.appendChild(listItem);
}