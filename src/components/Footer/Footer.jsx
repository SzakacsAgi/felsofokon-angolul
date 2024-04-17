import {FOOTER_TEXT, CONTACT_INFORMATION} from "../../data/static-data";
import { FaFacebook, FaLinkedin, FaCopyright } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

import classes from './Footer.module.css';
import {useHeaderContext} from "../../store/contexts-provider";
import InputFactory from "../Factory/InputFactory";
import {useRef} from "react";
import FormFactory from "../Factory/FormFactory";
import Button from "../Button";

export default function Footer(){
    const {currentLanguage} = useHeaderContext();
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
            formIsSending: <div className="feedback-form-content">Subscribe...</div>,
            successfulFormSending: <div className="feedback-form-content">Success</div>,
            unsuccessfulFormSending: <div className="feedback-form-content">Not success</div>,
            formToFill: <>
                            {inputs.email}
                            {submitButton}
                        </>
            }
    }

    function onSubmit(event, state){
        console.log("SENDING");
    };

    return <footer>
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