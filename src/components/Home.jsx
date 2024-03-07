import classes from './Home.module.css';
import DOMPurify from 'dompurify';
import {useHeaderContext} from "../store/contexts-provider";
import SectionTitle from "./SectionTitle";

function isErrorOccurred(pageContent){
    return typeof pageContent === "string";
}

function sanitizeHTMLContent(content){
    return {__html: DOMPurify.sanitize(content)}
}

export default function Home({pageContent}){
    const {currentLanguage} = useHeaderContext();
    const isError = isErrorOccurred(pageContent);
    const aboutMeSectionContent = isError ? pageContent : pageContent.aboutMe[currentLanguage];
    const servicesSectionContent = isError ? pageContent : pageContent.services[currentLanguage];

    return (
        <>
            <section className={classes.section}>
                <div className={classes.para}>
                    <div dangerouslySetInnerHTML={sanitizeHTMLContent(aboutMeSectionContent)}/>
                </div>
                <div className={classes.img}/>
            </section>
            <section className={classes.section}>
                <SectionTitle className={classes.sectionTitle} title={servicesSectionContent.title}/>
                <div className={classes.servicesContainer}>
                    {servicesSectionContent.data.map(service =>{
                        return <div className={classes.serviceCard}>
                            <div dangerouslySetInnerHTML={sanitizeHTMLContent(service.serviceTitle)}></div>
                            <div dangerouslySetInnerHTML={sanitizeHTMLContent(service.description)}></div>
                            <a href={service.navigation}>{servicesSectionContent.detailsText}</a>
                        </div>
                    })}
                </div>
            </section>
        </>
    )
}