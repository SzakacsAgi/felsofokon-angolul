import {createContext, useReducer} from "react";
const initialLanguage = "HUN";
const initialPage = detectInitialCurrentPage();

function detectInitialCurrentPage(){
    const currentPage = window.location.pathname.slice(1);
    return currentPage ? currentPage : "home";
}

export const HeaderContext = createContext({
    currentPage: "",
    currentLanguage: "",
    onMenuPointClick: () => {},
    handleFlagClick: () => {},
});

function headerReducer(state, action){
    if (action.type === 'MENU_POINT_CLICK') {
        return {
           ...state,
            currentPage: action.payload
        };
    }

    if (action.type === 'FLAG_CLICK') {
        return {
            ...state,
            currentLanguage: action.payload
        };
    }
}

export default function HeaderContextProvider({children}){
    const [headerState, headerStateDispatcher] = useReducer(headerReducer, {currentPage: initialPage, currentLanguage: initialLanguage});
    const contextValue = {
        currentPage: headerState.currentPage,
        currentLanguage: headerState.currentLanguage,
        onMenuPointClick: onMenuPointClick,
        handleFlagClick: handleFlagClick
    }

    function onMenuPointClick(clickedMenuPoint) {
        headerStateDispatcher({
            type: 'MENU_POINT_CLICK',
            payload: clickedMenuPoint
        })
    }

    function handleFlagClick(clickedFlag) {
        headerStateDispatcher({
            type:'FLAG_CLICK',
            payload:clickedFlag
        })
    }

    return <HeaderContext.Provider value={contextValue}>
        {children}
    </HeaderContext.Provider>
}