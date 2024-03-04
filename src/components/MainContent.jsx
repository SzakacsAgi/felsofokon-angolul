import {useHeaderContext} from "../store/contexts-provider";
import {useEffect, useState} from "react";
import {ERROR_TEXT} from "../data/static-data";
import MainContentFactory from "./Factory";
import {getPageData} from "../data/page-data-provider";

function isFetchFinished(data, error){
    return data || Object.values(error).length > 0;
}

function isErrorOccurred(error){
    return Object.values(error).length !== 0;
}

export default function MainContent() {
    const {currentLanguage, currentPage} = useHeaderContext();
    let errorText = ERROR_TEXT[currentLanguage];
    const [data, setData] = useState(null);
    const [error, setError] = useState({});

    useEffect( ()  => {
        async function fetchData(){
            try {
                setData(null);
                setError({});
                const data = await getPageData(currentPage);
                if (data) {
                    setData(data);
                }
            } catch (error) {
                setError({ message: error.message, statusCode: error.cause });
            }
        }
        fetchData();
    }, [currentPage, setError]);

    return <>
        { isFetchFinished(data, error)
            ? <MainContentFactory page={currentPage} errorText={isErrorOccurred(error) && (errorText+=error.statusCode)} data={data}/>
            :  <p>Loading...</p> }
    </>
}