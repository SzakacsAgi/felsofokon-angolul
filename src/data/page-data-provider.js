import {DUMMY_HOMEPAGE_DATA} from "./static-data";
import UrlProvider from "./url-provider";
const urlProvider = new UrlProvider();

export async function getPageContentData(page) {
    const data = DUMMY_HOMEPAGE_DATA;
    const url = urlProvider.getApiUrl(page);
    try{
        const response = await fetch(url);
        if (response.ok){
            return await data;
        }
        else if (!response.ok) {
            const error = new Error(`Response was not ok. Status code: ${response.status}`);
            error.cause = response.status;
            throw error;
        }
        else if(URL.includes("error")){
            const error = new Error("Page not found");
            error.cause = "404";
            throw error;
        }
    } catch (error) {
        throw error;
    }
}