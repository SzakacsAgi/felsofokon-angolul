import classes from './Home.module.css';
import DOMPurify from 'dompurify';
import {useHeaderContext} from "../store/contexts-provider";

function isErrorOccurred(pageContent){
    return typeof pageContent === "string";
}

export default function Home({pageContent}){
    const {currentLanguage} = useHeaderContext();
    const isError = isErrorOccurred(pageContent);
    const aboutMeSectionContent = isError ? pageContent : pageContent.aboutMe[currentLanguage];

    return (
        <>
            <section className={classes.section}>
                <div className={classes.para}>
                    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutMeSectionContent)}}/>
                </div>
                <div className={classes.img}/>
            </section>
        </>
    )
}