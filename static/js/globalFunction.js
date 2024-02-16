function changeMenuLanguage(language) {
    if(language){
        homeBtn.textContent = language === 'pl' ? 'Strona główna' : 'Home page';
        searchMatchBtn.textContent = language === 'pl' ? 'Wyszukaj mecz' : 'Search match';
        searchSumonnerBtn.textContent = language === 'pl' ? 'Szukaj gracza' : 'Search player';
        logoutText.textContent = language === 'pl' ? 'Wyjdź z aplikacji' : 'Exit application';
        sourceCode.textContent = language === 'pl' ? 'Kod źródłowy' : 'Source code';
    }
}