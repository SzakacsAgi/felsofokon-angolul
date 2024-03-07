import classes from './Home.module.css';
import DOMPurify from 'dompurify';
import {useHeaderContext} from "../store/contexts-provider";
import ReferencesSlider from "./ReferencesSlider";
import SectionTitle from "./SectionTitle";
import FAQ from "./FAQ";

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
    const referencesSectionContent = isError ? pageContent : pageContent.references[currentLanguage];
    const faqSectionContent = isError ? pageContent : pageContent.faq[currentLanguage];

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
                    {isError ? <div>{pageContent}</div> : servicesSectionContent.data.map(service => {
                        return <div className={classes.serviceCard}>
                            <div dangerouslySetInnerHTML={sanitizeHTMLContent(service.serviceTitle)}></div>
                            <div dangerouslySetInnerHTML={sanitizeHTMLContent(service.description)}></div>
                            <a href={service.navigation}>{servicesSectionContent.detailsText}</a>
                        </div>
                    })}
                </div>
            </section>
            <section className={classes.section}>
                <SectionTitle className={classes.sectionTitle} title={referencesSectionContent.title}/>
                <div className="slider">
                    {isError ? <div>{pageContent}</div> :
                        <ReferencesSlider sliderContent={referencesSectionContent.data}></ReferencesSlider>
                    }
                </div>
            </section>
            <section className={classes.section}>
                <SectionTitle className={classes.sectionTitle} title={faqSectionContent.title}/>
                <div className="faq">
                    {isError ? <div>{pageContent}</div> :
                        <FAQ faqContent={faqSectionContent.data}/>
                    }
                </div>
            </section>
        </>
    )
}
