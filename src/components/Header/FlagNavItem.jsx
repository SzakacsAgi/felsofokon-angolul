import {useHeaderContext} from "../../store/contexts-provider";


import hungaryFlag from "../../assets/flags/hungary.png";
// eslint-disable-next-line
import franceFlag from "../../assets/flags/france.jpg"; 
import englishFlag from "../../assets/flags/english.png";
import NavItem from "./NavItem";

const mapLanguageToFlag = [{language: "HUN", flag:hungaryFlag}, /*{language: "FR", flag:franceFlag},*/ {language: "ENG", flag:englishFlag}];
function detectNotChosenLanguages(currentLanguage){
    return mapLanguageToFlag.filter(language => {return language.language !== currentLanguage});
}

function detectChosenLanguage(currentLanguage){
    return mapLanguageToFlag.filter(language => {return language.language === currentLanguage});
}

export default function FlagNavItem(){
    const {currentLanguage, handleFlagClick, currentPage} = useHeaderContext();

    const notChosenLanguages = detectNotChosenLanguages(currentLanguage);
    const chosenLanguage = detectChosenLanguage(currentLanguage);

    return (
        <div className="flags">
            <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => handleFlagClick(chosenLanguage[0].language)}>
                    <img src={chosenLanguage[0].flag} alt={`${currentLanguage} flag`}/>
                </button>
                <ul className="dropdown-menu">
                    {notChosenLanguages.map(language => {
                        if( currentLanguage === "HUN" && currentPage === "prices"){
                            return <NavItem key={language.language} pageName="home" onClick={() => handleFlagClick(language.language)}><img src={language.flag} alt={`${language} flag`}/></NavItem>
                        } else{
                            return <li key={language.language}
                                onClick={() => handleFlagClick(language.language)}><img src={language.flag} alt={`${language} flag`}/>
                            </li>
                        }
                    })}
                </ul>
            </div>
        </div>
    )
}