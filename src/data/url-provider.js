export default class UrlProvider {

    getApiUrl(page){
        let url = null;
        switch (page){
            case "home":
            case "/":
                url = "https://dummyjson.com/comments";
                break;
            case "about":
                url = "https://dummyjson.com/comments";
                break;
            case "services":
                url = "https://dummyjson.com/comments";
                break;
            case "general-english-lesson":
            case "matura-examination":
            case "translation":
                url = "https://dummyjson.com/comments";
                break;
            case "prices":
                url = "https://dummyjson.com/comments";
                break;
            case "contact":
                url = "https://dummyjson.com/comments";
                break;
            case "blog":
                url = "https://dummyjson.com/comments";
                break;
            default:
                url = "/error";
        }
        return url;
    }
}