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
        name:<InputFactory required type="TEXT" labelText={contactContent.formData.name}
        placeHolder={contactContent.formData.namePlaceholder} id="nameInput" ref={nameInput}
        errorMessage={contactContent.nameInputError}/>,
        email:<InputFactory required type="EMAIL" labelText={contactContent.formData.email}
        placeHolder={contactContent.formData.emailPlaceholder} id="emailInput" ref={emailInput}
        errorMessage={contactContent.formData.emailInputError}/>,
        levelSelect:<InputFactory required type="SELECT" labelText={contactContent.formData.level} id="levelSelect"
        options={contactContent.formData.levelOptions} contactContent={contactContent}
        ref={levelSelect}/>,
        causeSelect:<InputFactory required type="SELECT" labelText={contactContent.formData.contactCause} id="contactCauseSelect"
        options={contactContent.formData.contactCauseOptions} contactContent={contactContent}
        ref={causeSelect}/>,
        message: <InputFactory required type="TEXTAREA" labelText={contactContent.formData.message}
        placeHolder={contactContent.formData.messagePlaceHolder} id="messageTextarea"
        ref={messageInput} errorMessage={contactContent.formData.messageTextareaError}/>
    }
    const submitButton = <Button className="button" buttonText={contactContent.formData.sendButtonText} disabledText={contactContent.formData.disabledButtonText} />;
    const FORM_CONTENT = (inputs, submitButton)=> {
        return {
            formIsSending: <div className="feedback-form-content">{`${contactContent.formData.sendButtonText}...`}</div>,
            successfulFormSending: <div className="feedback-form-content">{contactContent.formData.successfulSendText}</div>,
            unsuccessfulFormSending: <div className="feedback-form-content">{contactContent.formData.unsuccessfulSendText}</div>,
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