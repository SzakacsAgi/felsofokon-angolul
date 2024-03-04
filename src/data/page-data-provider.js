import {DUMMY_HOMEPAGE_DATA} from "./data";
import UrlProvider from "./url-provider";

export async function getPageData(page){
    let data = DUMMY_HOMEPAGE_DATA;
    const URL = new UrlProvider(page).getURL();
    return await fetch(URL)
        .then(res => {
            if(res.ok){
                return res.json();
            }
            else{
                throw new Error("Response was not 200");
            }
        })
        .then(res => data)
}