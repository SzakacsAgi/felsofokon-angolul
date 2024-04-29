import {FOOTER_TEXT, CONTACT_INFORMATION} from "../../data/static-data";
import { FaFacebook, FaLinkedin, FaCopyright } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

import classes from './Footer.module.css';
import {useHeaderContext} from "../../store/contexts-provider";
import InputFactory from "../Factory/InputFactory";
import {useEffect, useRef, useState} from "react";
import FormFactory from "../Factory/FormFactory";
import Button from "../Button";
import { subscribeOnNewsletter } from "../../rest-api-caller/form-calls";

export default function Footer(){
    const {currentLanguage, currentPage} = useHeaderContext();
    const [rerender, setRerender] = useState(false);

    const footerText = FOOTER_TEXT[currentLanguage];
    const emailInput = useRef();
    const inputs = {
        email:<InputFactory required type="EMAIL" labelText={footerText.newsLetterLabelText}
        placeHolder={footerText.newsLetterPlaceHolder} id="newsLetterEmailInput" ref={emailInput}
        errorMessage={footerText.newsLetterInputError}/>
    }
    const submitButton = <Button className="button" buttonText={footerText.newsLetterButtonText} disabledText={footerText.disableButtonText}/>;
    const FORM_CONTENT = (inputs, submitButton)=> {
        return {
            formIsSending: <div className={classes.newsLetterFeedback}>{footerText.sendingText}</div>,
            successfulFormSending: <div className={classes.newsLetterFeedback}>{footerText.successfulFeedback}</div>,
            unsuccessfulFormSending: <div className={classes.newsLetterFeedback}>{footerText.unsuccessfulFeedback}</div>,
            formToFill: <>
                            {inputs.email}
                            {submitButton}
                        </>
            }
    }

    function onSubmit(event, state){
        subscribeOnNewsletter({email:emailInput.current.value, list:currentLanguage}, state)
    };

    useEffect(() => {
        setRerender(prevState => !prevState);
    }, [currentPage]);
    
    return <footer key={rerender}>
        <div className={`${classes.footerContent} container`}>
            <div className={classes.mainContent}>
                <div className={classes.socialMediaIcons}>
                    <a href={CONTACT_INFORMATION.facebookUrl} rel="noreferrer" target="_blank"><FaFacebook size={50}/></a>
                    <a href={CONTACT_INFORMATION.linkedinUrl} rel="noreferrer" target="_blank"><FaLinkedin size={50}/></a>
                </div>
                <div className={classes.info}>
                    <div>
                        <FaCopyright/>
                        {footerText.copyrightText}
                    </div>
                    <div>
                        <MdAlternateEmail/>
                        <a href={`mailto:${CONTACT_INFORMATION.emailAddress}`}>{CONTACT_INFORMATION.emailAddress}</a>
                    </div>
                </div>
            </div>
            {currentLanguage === "HUN" ? <div className={classes.newsLetter}>
            <FormFactory inputs={inputs} submitButton={submitButton} onSubmit={onSubmit} FORM_CONTENT={FORM_CONTENT}/>
            </div> : ""}
        </div>
    </footer>
}