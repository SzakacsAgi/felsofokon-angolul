import {createContext, useReducer} from "react";
const initialLanguage = "HUN";
const initialPage = "home";
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

    const contextValue = {
        currentPage: headerState.currentPage,
        currentLanguage: headerState.currentLanguage,
        onMenuPointClick: onMenuPointClick,
        handleFlagClick: handleFlagClick
    }


    return <HeaderContext.Provider value={contextValue}>
        {children}
    </HeaderContext.Provider>
}