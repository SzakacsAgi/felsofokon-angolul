export function detectInitialCurrentPage(){
    const currentPage = window.location.pathname.slice(1);
    return currentPage ? currentPage : "home";
}

export function getLanguageFromStorage(storage){
    switch (storage){
        case "SESSION":
            return sessionStorage.getItem("lang");
        case "LOCAL":
            return localStorage.getItem("lang");
    }
}

export function setLanguageToStorage(storage, value){
    switch (storage){
        case "SESSION":
            sessionStorage.setItem("lang", value);
            break;
        case "LOCAL":
            localStorage.setItem("lang", value);
            break;
    }
}

export function detectInitialCurrentLanguage(){
    const defaultLanguage = "ENG";
    const currentLanguage = getLanguageFromStorage("SESSION");

    if(currentLanguage){
        return currentLanguage;
    }
    else if(getLanguageFromStorage("LOCAL")){
        setLanguageToStorage("SESSION", getLanguageFromStorage("LOCAL"))
        return getLanguageFromStorage("SESSION");

    }else{
        setLanguageToStorage("LOCAL", defaultLanguage);
        setLanguageToStorage("SESSION", defaultLanguage);
        return defaultLanguage;
    }

}