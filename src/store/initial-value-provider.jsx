const languages = {
    ENGLISH : "ENG",
    HUNGARIAN: "HUN",
    FRENCH: "FR"
}
const defaultLanguage = languages.ENGLISH;
const defaultPage = "home";
const languageKey = "lang";
const localKey = "LOCAL";
const sessionKey = "SESSION";

export function getLanguageFromStorage(storage){
    switch (storage){
        case sessionKey:
            return sessionStorage.getItem(languageKey);
        case localKey:
            return localStorage.getItem(languageKey);
        default:
            console.log("Storage is not provided!");
    }
}

export function setLanguageToStorage(storage, value){
    switch (storage){
        case sessionKey:
            sessionStorage.setItem(languageKey, value);
            break;
        case localKey:
            localStorage.setItem(languageKey, value);
            break;
        default:
            console.log("Storage is not provided!");
    }
}

export function detectInitialLanguage(){
    const currentLanguage = getLanguageFromStorage(sessionKey);

    if(currentLanguage){
        return currentLanguage;
    }
    else if(getLanguageFromStorage(localKey)){
        setLanguageToStorage(sessionKey, getLanguageFromStorage(localKey));
        return getLanguageFromStorage(sessionKey);
    }
    else{
        setLanguageToStorage(localKey, defaultLanguage);
        setLanguageToStorage(sessionKey, defaultLanguage);
        return defaultLanguage;
    }
}

export function detectInitialPage(){
    const currentPage = window.location.pathname.slice(1);
    return currentPage ? currentPage : defaultPage;
}