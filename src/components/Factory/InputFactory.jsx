import FormSelectInput from "../FormSelectInput";
import {forwardRef} from "react";

const InputFactory = forwardRef(function Input({ required, type, labelText, options, placeHolder, id, contactContent}, ref) {
    let input = null;

    switch (type) {
        case "EMAIL":
            input = <input type="email" placeholder={placeHolder} id={id} ref={ref} />;
            break;
        case "TEXT":
            input = <input type="text" placeholder={placeHolder} id={id} ref={ref} />;
            break;
        case "TEXTAREA":
            input = <textarea placeholder={placeHolder} id={id} ref={ref} />;
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
        </div>
    );
});

export default InputFactory;