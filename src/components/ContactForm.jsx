import {useRef} from "react";
import InputFactory from "./Factory/InputFactory";
import {useHeaderContext} from "../store/contexts-provider";
import FormFactory from "./Factory/FormFactory";
import Button from "./Button";
import {sendContactForm} from "../rest-api-caller/form-calls";

export default function ContactForm({contactContent}) {
    const nameInput = useRef();
    const emailInput = useRef();
    const messageInput = useRef();
    const levelSelect = useRef();
    const causeSelect = useRef();
    const {currentLanguage} = useHeaderContext();
    const inputFields = {
        nameInput,
        emailInput,
        messageInput,
        levelSelect,
        causeSelect,
        currentLanguage
    }
    const inputs = {
        name:<InputFactory required type="TEXT" labelText={contactContent.name}
        placeHolder={contactContent.namePlaceholder} id="nameInput" ref={nameInput}
        errorMessage={contactContent.nameInputError}/>,
        email:<InputFactory required type="EMAIL" labelText={contactContent.email}
        placeHolder={contactContent.emailPlaceholder} id="emailInput" ref={emailInput}
        errorMessage={contactContent.emailInputError}/>,
        levelSelect:<InputFactory required type="SELECT" labelText={contactContent.level} id="levelSelect"
        options={contactContent.levelOptions} contactContent={contactContent}
        ref={levelSelect}/>,
        causeSelect:<InputFactory required type="SELECT" labelText={contactContent.contactCause} id="contactCauseSelect"
        options={contactContent.contactCauseOptions} contactContent={contactContent}
        ref={causeSelect}/>,
        message: <InputFactory required type="TEXTAREA" labelText={contactContent.message}
        placeHolder={contactContent.messagePlaceHolder} id="messageTextarea"
        ref={messageInput} errorMessage={contactContent.messageTextareaError}/>
    }
    const submitButton = <Button className="button" buttonText={contactContent.sendButtonText} disabledText={contactContent.disabledButtonText} />;
    const FORM_CONTENT = (inputs, submitButton)=> {
        return {
            formIsSending: <div className="feedback-form-content">{`${contactContent.sendButtonText}...`}</div>,
            successfulFormSending: <div className="feedback-form-content">{contactContent.successfulSendText}</div>,
            unsuccessfulFormSending: <div className="feedback-form-content">{contactContent.unsuccessfulSendText}</div>,
            formToFill: <div className="form-content">
                <div className="flex-row">
                   {inputs.name}
                    {inputs.email}
                </div>
                <div className="flex-row">
                    {inputs.levelSelect}
                    {inputs.causeSelect}
                </div>
                <div className="flex-row">
                    {inputs.message}
                </div>
                {submitButton}
            </div>
            }
    }

    function onSubmit(event, state){
        sendContactForm(inputFields, state);
    };

    return <FormFactory className="contact-form" inputs={inputs} submitButton={submitButton} onSubmit={onSubmit} FORM_CONTENT={FORM_CONTENT}/>
}