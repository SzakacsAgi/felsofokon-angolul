import {DUMMY_HOMEPAGE_DATA} from "./static-data";
import UrlProvider from "./url-provider";

export async function getPageData(page) {
    const data = DUMMY_HOMEPAGE_DATA;
    const URL = new UrlProvider(page).getURL();
    try{
        const response = await fetch(URL);
        if (response.ok){
            return await data;
        }
        else if (!response.ok) {
            const error = new Error("Response was not 200");
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