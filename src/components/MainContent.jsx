import {useHeaderContext} from "../store/contexts-provider";
import {useEffect, useState} from "react";
import {ERROR_TEXT} from "../data/data";
import MainContentFactory from "./Factory";
import {getPageData} from "../data/page-data-provider";

function isDataRequestHappened(data, error){
    return data || error;
}

export default function MainContent() {
    const {currentLanguage, currentPage} = useHeaderContext();
    const errorText = ERROR_TEXT[currentLanguage];
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect( () => {
        const fetchData = async () => {
            try{
                const result = await getPageData(currentPage);
                setData(result);
            }catch (error) {
                setError(error);
            }
        };

        if(!data && !error){
            fetchData();
        }
    }, [data, error, currentLanguage, currentPage]);

    if(isDataRequestHappened(data, error)){
        return <MainContentFactory page={currentPage} error={error} errorText={errorText} data={data}/>
    }
}