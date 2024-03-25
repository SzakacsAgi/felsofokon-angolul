import FormSelectInput from "../FormSelectInput";
import '../Input.css';
import {forwardRef} from "react";
import {useContactFormContext} from "../../store/contexts-provider";

const InputFactory = forwardRef(function Input({ required, type, labelText, options, placeHolder, id, contactContent}, ref) {
    let input = null;
    let objectName = `${id}Error`;
    const {invalidFields, onFormValidation} = useContactFormContext();

    switch (type) {
        case "EMAIL":
            input = <input onBlur={() => onFormValidation(invalidFields, {validationType:"email", inputField:ref})} onChange={() => onFormValidation(invalidFields, {validationType:"email", inputField:ref})} type="email" placeholder={placeHolder} id={id} ref={ref} />;
            break;
        case "TEXT":
            input = <input onBlur={() => onFormValidation(invalidFields, {validationType:"name", inputField:ref})} onChange={() => onFormValidation(invalidFields, {validationType:"name", inputField:ref})} type="text" placeholder={placeHolder} id={id} ref={ref} />;
            break;
        case "TEXTAREA":
            input = <textarea onBlur={() => onFormValidation(invalidFields, {validationType:"message", inputField:ref})} onChange={() => onFormValidation(invalidFields, {validationType:"message", inputField:ref})} placeholder={placeHolder} id={id} ref={ref} />;
            break;
        case "SELECT":
            input = <FormSelectInput options={options} id={id} ref={ref} />;
            break;
        default:
            input = <input value="Input type was not defined" />;
    }

    return (
        <div className="form-input">
            <label htmlFor={id} required={!!required}>
                {labelText}
            </label>
            {input}
            {invalidFields[objectName] ? <p className="error-message">{contactContent[objectName]}</p> : ""}
        </div>
    );
});

export default InputFactory;