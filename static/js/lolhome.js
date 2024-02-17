document.addEventListener('DOMContentLoaded', function() {
    var language = sessionStorage.getItem('language');
    switchLanguage(language);
});

function redirectToSummoner(){
    window.location.href="/summoner.html";
}
function redirectToMatches(){
    window.location.href="/matchinfo.html"
}

document.addEventListener('DOMContentLoaded', async function() {
    fetch(`${window.home_url}/warmup`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        }})
});

function switchLanguage(event,language) {
    event.preventDefault();
    var langButton = document.getElementById('languageButton');

    if(language) {
        language = language;
    } else {
        language = langButton.textContent.toLowerCase() === 'switch' ? 'eng' : 'pl';
    }

    var desc = document.getElementById('desc');
    var buttonText = language === 'eng' ? 'Zmień' : 'Switch';
    var descriptionText = language === 'eng' ? 'na język polski' : 'to english language';

    langButton.textContent = buttonText;
    desc.textContent = descriptionText;

    if(language === 'eng') {
        sessionStorage.setItem('language', 'eng');
        englishVersion();
        
    } else {
        sessionStorage.setItem('language', 'pl');
        polishVersion();
    } 
    changeMenuLanguage(language);
}

function polishVersion() {
    firstDesc.innerHTML = `
        <p style="font-size: 16px; color: #fff;">
            To jest aplikacja, która umożliwia śledzenie graczy aktualnie uczestniczących w rozgrywce.
            Dzięki niej możemy szybko znaleźć swoich znajomych, zobaczyć z kim obecnie grają, 
            sprawdzić ich poziom doświadczenia, oraz uzyskać 
            ogólne statystyki dotyczące liczby zwycięstw i porażek, jeśli posiadają rangę. 
            Ponadto, aplikacja umożliwia przeglądanie profili i statystyk 
            dowolnego gracza w League of Legends.
        </p>
    `;

    secondDesc.innerHTML = `
        <p style="font-size: 16px; color: #fff;">
            Na podstronie <a href="summoner.html" style="color: white"><b>"Szukaj gracza"</b></a>, po wprowadzeniu dowolnej nazwy gracza uzyskamy dostęp do jego profilu, 
            z informacjami o poziomie, rangach w grach rankingowych solo/duo oraz flex, jeżeli są dostępne. Na ekranie pojawi się ikona profilu gracza wraz z 
            grafiką zależną od jego rangi (solo/duo). Tło karty profilu zostanie ustawione zgodnie z głównym championem gracza.
            Na panelu bocznym pojawią się informacje dotyczące ostatnich 20 gier rankingowych gracza, w tym nazwa wybranego championa, obrażenia jakie zadał, wynik starcia oraz wskaźnik KDA.
        </p>
    `;

    thirdDesc.innerHTML = `
        <p style="font-size: 16px; color: #fff;">
            Na podstronie <a href="matchinfo.html" style="color: white;"><b>"Wyszukaj mecz"</b></a>, po wprowadzeniu nazwy użytkownika obecnie uczestniczącego w rozgrywce, 
            otrzymamy statystyki dotyczące tego konkretnego meczu. Znajdziemy informacje dotyczące wybranych championów, używanych masterków oraz wszystkich zbanowanych 
            bohaterów(obecni w meczach rankingowych, a nie w trybie ARAM).
            W ramach testów Riot udostępnia informacje dotyczące losowego, aktualnie trwającego meczu, co pozwala sprawdzić dowolne przypadkowe starcie.
            Ponadto, po kliknięciu na nazwę gracza, po prawej stronie panelu pojawią się informacje dotyczące jego ostatnich wyników w meczach rankingowych. 
            Z uwagi na ograniczenia API, udostępniane są dane z ostatnich trzech starć, obejmujące nazwę gracza, poziom, rangę oraz ogólne statystyki zwycięstw i porażek, 
            o ile profil League jest dostępny. Dodatkowo, dla każdego z tych trzech ostatnich meczów widoczna będzie postać, którą dany gracz grał, jego KDA, obrażenia oraz wynik starcia.
        </p>
    `;

    inviteText.innerHTML = `
        <p style="color: wheat; font-weight: 600; text-align: center;">Zapraszam do przetestowania mojej aplikacji. Wszystko, czego potrzebujesz, znajdziesz na podstronach 'Szukaj gracza' i 'Wyszukaj mecz'.
        </p>
    `;

    infoText.innerHTML = `
            Ze względu na korzystanie z bezpłatnego hostingu dla backendu, możliwe jest, że aplikacja będzie działać wolniej i wymagać dłuższego czasu przetwarzania.
    `;
}

function englishVersion() {
    firstDesc.innerHTML = `
        <p style="font-size: 16px; color: #fff;">
            This is an application that allows tracking of players currently participating in the game.
            With it, we can quickly find our friends, see who they are currently playing with, 
            check their level of experience, and obtain general statistics regarding the number of wins and losses, 
            if they have a rank. Additionally, the application allows browsing profiles and statistics 
            of any player in League of Legends.
        </p>
    `;
    secondDesc.innerHTML = `
        <p style="font-size: 16px; color: #fff;">
            On the <a href="summoner.html" style="color: white"><b>"Search Player"</b></a> subpage, after entering any player name, we will gain access to their profile,
            with information about their level, ranks in solo/duo and flex ranked games, if available. On the screen, the player's profile icon will appear along with
            graphics dependent on their rank (solo/duo). The background of the profile card will be set according to the player's main champion.
            On the sidebar, there will be information about the player's last 20 ranked games, including the name of the selected champion, the damage dealt, the match result, and the KDA.
            </p>
    `;

    thirdDesc.innerHTML = `
        <p style="font-size: 16px; color: #fff;">
            On the <a href="matchinfo.html" style="color: white;"><b>"Search Match"</b></a> subpage, after entering the username of the player currently participating in the game,
            we will receive statistics regarding that specific match. We will find information about the selected champions, used masteries, and all banned
            heroes (present in ranked matches, not in ARAM mode).
            As part of the tests, Riot provides information about a random, currently ongoing match, allowing to check any random match.
            Furthermore, clicking on the player's name will display information about their recent results in ranked matches on the right side of the panel.
            Due to API limitations, data from the last three matches are provided, including the player's name, level, rank, and overall win and loss statistics,
            provided that the League profile is accessible. Additionally, for each of these three recent matches, the champion the player played, their KDA, damage dealt, and match result will be visible.
        </p> 
    `

    inviteText.innerHTML = `
        <p style="color: wheat; font-weight: 600; text-align: center;">Feel free to test my application. Everything you need can be found on the 'Search Player' and 'Search Match' subpages.
        </p>
    `;

    infoText.innerHTML = `
            Due to using free hosting for the backend, it is possible that the application will operate slower and require longer processing times.
    `;
}

