import {useRef} from "react";
import InputFactory from "./Factory/InputFactory";
export default function ContactForm({contactContent}) {
    const nameInput = useRef();
    const emailInput = useRef();
    const messageInput = useRef();
    const levelSelect = useRef();
    const causeSelect = useRef();

    const FORM_CONTENT = {
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
            <button type="submit">{contactContent.sendButtonText}</button>
        </div>
    }


    return <form noValidate className="contact-form">
        {FORM_CONTENT.formToSend}
    </form>
}