import './Button.css'

export default function Button({buttonText, onClick, disabled, disabledText, title, ...props}){
    return <button {...props} onClick={onClick} disabled={disabled} title={title}>{buttonText}</button>
}












