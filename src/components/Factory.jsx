import createFactory from "../data/createFactory";
import Home from "./Home";
import AboutMe from "./AboutMe";
import Services from "./Services";
import OfferedLessonDetails from "./OfferedLessonDetails";
import Prices from "./Prices";
import Contact from "./Contact";
import Blog from "./Blog";

function Factory({page, error, errorText, data}){
    function detectMainContent(page, error, errorText, data){
        let mainContent = null;
        switch (page){
            case "home":
            case "/":
                mainContent =  <Home data={error ? errorText : data}/>;
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
                mainContent = <h1>Page was not defined</h1>;
        }
        return mainContent;
    }

    return detectMainContent(page, error, errorText, data)
}

const MainContentFactory = createFactory(Factory);
export default MainContentFactory;