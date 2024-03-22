import {useEffect, useRef} from "react";
import InputFactory from "./Factory/InputFactory";
import {useContactFormContext, useHeaderContext} from "../store/contexts-provider";

export default function ContactForm({contactContent}) {
    const nameInput = useRef();
    const emailInput = useRef();
    const messageInput = useRef();
    const levelSelect = useRef();
    const causeSelect = useRef();
    const contactFormContext = useContactFormContext();
    const {currentLanguage, currentPage} = useHeaderContext();
    const inputFields ={
        nameInput,
        emailInput,
        messageInput,
        levelSelect,
        causeSelect,
        currentLanguage
    }

    const FORM_CONTENT = {
        formIsSending: <div className="feedback-form-content">{`${contactContent.sendButtonText}...`}</div>,
        successfulFormSending: <div className="feedback-form-content">{contactContent.successfulSendText}</div>,
        unsuccessfulFormSending: <div className="feedback-form-content">{contactContent.unsuccessfulSendText}</div>,
        formToSend: <div className="form-content">
            <div className="flex-row">
                <InputFactory required type="TEXT" labelText={contactContent.name}
                              placeHolder={contactContent.namePlaceholder} id="nameInput" ref={nameInput}
                              contactContent={contactContent}/>
                <InputFactory required type="EMAIL" labelText={contactContent.email}
                              placeHolder={contactContent.emailPlaceholder} id="emailInput" ref={emailInput}
                              contactContent={contactContent}/>
            </div>
            <div className="flex-row">
                <InputFactory required type="SELECT" labelText={contactContent.level} id="levelSelect"
                              options={contactContent.levelOptions} contactContent={contactContent}
                              ref={levelSelect}/>
                <InputFactory required type="SELECT" labelText={contactContent.contactCause} id="contactCauseSelect"
                              options={contactContent.contactCauseOptions} contactContent={contactContent}
                              ref={causeSelect}/>
            </div>
            <div className="flex-row">
                <InputFactory required type="TEXTAREA" labelText={contactContent.message}
                              placeHolder={contactContent.messagePlaceHolder} id="messageTextarea"
                              ref={messageInput} contactContent={contactContent}/>
            </div>
            <button disabled={!contactFormContext.isFormSendable(contactFormContext)}
                    title={contactFormContext.isFormSendable(contactFormContext) ? '' : contactContent.disabledButtonText}
                    type="submit">{contactContent.sendButtonText}</button>
        </div>
    }

    useEffect(() => {
        contactFormContext.onFormReload();
        // eslint-disable-next-line
    }, [currentPage]);

    function detectContactFormContent() {
        if(contactFormContext.isSending) {
            return FORM_CONTENT.formIsSending;
        } else if(contactFormContext.isFormSent) {
            return FORM_CONTENT.successfulFormSending;
        } else if(contactFormContext.isFormSent === false) {
            return FORM_CONTENT.unsuccessfulFormSending;
        }
        return FORM_CONTENT.formToSend;
    }


    return <form noValidate className="contact-form" onSubmit={(event) => {
        contactFormContext.onFormSubmit(event, inputFields)
    }}>
        {detectContactFormContent()}
    </form>
}