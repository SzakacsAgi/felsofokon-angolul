import './Header.css'
import NavItem from "./NavItem";
import FlagNavItem from "./FlagNavItem";
import {HEADER_TEXT} from "../../data/data";
import {useHeaderContext} from "../../store/contexts-provider.jsx";

export default function Header(){

    const {currentLanguage} = useHeaderContext();
    const currentLanguageText = HEADER_TEXT[currentLanguage];

    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <h1 className="navbar-brand">{currentLanguageText.title}</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                        <ul className="navbar-nav">
                            <NavItem pageName="home">{currentLanguageText.home}</NavItem>
                            <NavItem pageName="about">{currentLanguageText.about}</NavItem>
                            <NavItem pageName="services" menuPoints={currentLanguageText.menuPoints}>{currentLanguageText.services}</NavItem>
                            <NavItem pageName="prices">{currentLanguageText.prices}</NavItem>
                            <NavItem pageName="contact">{currentLanguageText.contact}</NavItem>
                            <NavItem pageName="blog">{currentLanguageText.blog}</NavItem>
                            <FlagNavItem/>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}