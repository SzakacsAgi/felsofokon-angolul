import classes from './Home.module.css';
import {useHeaderContext} from "../store/contexts-provider";
import ReferencesSlider from "./ReferencesSlider";
import SectionTitle from "./SectionTitle";
import FAQ from "./FAQ";
import {isErrorOccurred, sanitizeHTMLContent} from "../store/utils/content-displayer-util";
import './ContactForm.css'
import ContactForm from "./ContactForm";
import ServiceCard from './ServiceCard';

export default function Home({pageContent}){
    const {currentLanguage} = useHeaderContext();
    const isError = isErrorOccurred(pageContent);
    const aboutMeSectionContent = isError ? pageContent : pageContent.aboutMe[currentLanguage];
    const servicesSectionContent = isError ? pageContent : pageContent.services[currentLanguage];
    const referencesSectionContent = isError ? pageContent : pageContent.references[currentLanguage];
    const faqSectionContent = isError ? pageContent : pageContent.faq[currentLanguage];
    const contactSectionContent = isError ? pageContent : pageContent.contact[currentLanguage];

    return (
        <>
            <section className={classes.section}>
                <div className={classes.para}>
                    <div dangerouslySetInnerHTML={sanitizeHTMLContent(aboutMeSectionContent)}/>
                </div>
                <div className={classes.img}/>
            </section>
            <section className={classes.section}>
                <SectionTitle title={servicesSectionContent.title}/>
                <div className={classes.servicesContainer}>
                    {isError ? <div>{pageContent}</div> : servicesSectionContent.data.map((service) => <ServiceCard cardInfo={service} buttonText={servicesSectionContent.detailsText}/>)}
                </div>
            </section>
            <section className={classes.section}>
                <div className='container'>
                    <SectionTitle title={referencesSectionContent.title}/>
                    <div className="slider">
                        {isError ? <div>{pageContent}</div> : <ReferencesSlider sliderContent={referencesSectionContent.data}></ReferencesSlider>}
                    </div>
                </div>
                
            </section>
            <section className={classes.section}>
                <SectionTitle title={faqSectionContent.title}/>
                <div className="faq">
                    {isError ? <div>{pageContent}</div> :
                        <FAQ faqContent={faqSectionContent.data}/>
                    }
                </div>
            </section>
            <section className={classes.section}>
                <SectionTitle title={contactSectionContent.title}/>
                <div className="contact">
                    {isError ? <div>{pageContent}</div> : <ContactForm contactContent={contactSectionContent}/>}
                </div>
            </section>
        </>
    )
}
