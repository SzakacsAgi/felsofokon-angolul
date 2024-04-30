import { isErrorOccurred } from "../store/utils/content-displayer-util";
import './ContactForm.css'
import ContactForm from "./ContactForm";
import { useHeaderContext } from "../store/contexts-provider";
import classes from "./Contact.module.css"

export default function Contact({pageContent}){
    const {currentLanguage} = useHeaderContext();
    const isError = isErrorOccurred(pageContent);
    const contactSectionContent = isError ? pageContent : pageContent[currentLanguage];

    return(
        <section className={classes.contactContainer}>
            <div className={classes.contactText}>
                <h1>{contactSectionContent.title}</h1>
                <p>{contactSectionContent.subTitle}</p>
            </div>
        <div className="contact">
            {isError ? <div>{pageContent}</div> : <ContactForm contactContent={contactSectionContent}/>}
        </div>
    </section>
    )
}