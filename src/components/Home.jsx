import classes from './Home.module.css';
import DOMPurify from 'dompurify';
import {useHeaderContext} from "../store/contexts-provider";

function isErrorOccurred(data){
    return typeof data === "string";
}

export default function Home({data}){
    const {currentLanguage} = useHeaderContext();
    const isError = isErrorOccurred(data);
    const aboutMeSectionData = isError ? data : data.aboutMe[currentLanguage];

    return (
        <>
            <section className={classes.section}>
                <div className={classes.para}>
                    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutMeSectionData)}}/>
                </div>
                <div className={classes.img}/>
            </section>
        </>
    )
}