import createFactory from "../data/createFactory";
import Home from "./Home";
import AboutMe from "./AboutMe";
import Services from "./Services";
import OfferedLessonDetails from "./OfferedLessonDetails";
import Prices from "./Prices";
import Contact from "./Contact";
import Blog from "./Blog";
import NotFound from "./Header/NotFound";

function Factory({page, errorText, data}){
    function detectMainContent(page, errorText, data){
        let mainContent = null;
        switch (page){
            case "home":
            case "/":
                mainContent = <Home data={ errorText ? errorText : data}/>;
                break;
            case "about":
                mainContent = <AboutMe/>;
                break;
            case "services":
                mainContent = <Services/>;
                break;
            case "general-english-lesson":
            case "matura-examination":
            case "translation":
                mainContent = <OfferedLessonDetails/>;
                break;
            case "prices":
                mainContent = <Prices/>;
                break;
            case "contact":
                mainContent = <Contact/>;
                break;
            case "blog":
                mainContent = <Blog/>;
                break;
            default:
                mainContent = <NotFound/>;
        }
        return mainContent;
    }

    return detectMainContent(page, errorText, data)
}

const MainContentFactory = createFactory(Factory);
export default MainContentFactory;