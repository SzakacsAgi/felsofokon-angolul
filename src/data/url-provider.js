export default class UrlProvider {

    constructor(page) {
        this.page = page;
    }

    getURL(){
        let URL = null;
        switch (this.page){
            case "home":
            case "/":
                URL = "https://dummyjson.com/comments";
                break;
            case "about":
                URL = "https://dummyjson.com/comments";
                break;
            case "services":
                URL = "https://dummyjson.com/comments";
                break;
            case "general-english-lesson":
            case "matura-examination":
            case "translation":
                URL = "https://dummyjson.com/comments";
                break;
            case "prices":
                URL = "https://dummyjson.com/comments";
                break;
            case "contact":
                URL = "https://dummyjson.com/comments";
                break;
            case "blog":
                URL = "https://dummyjson.com/comments";
                break;
            default:
                URL = "/error";
        }
        return URL;
    }
}