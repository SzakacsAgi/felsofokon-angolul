import {FOOTER_TEXT} from "../../data/static-data";
import { FaFacebook, FaLinkedin, FaCopyright } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

import classes from './Footer.module.css';
import {useHeaderContext} from "../../store/contexts-provider";
import InputFactory from "../Factory/InputFactory";

export default function Footer(){
    const {currentLanguage} = useHeaderContext();
    const footerText = FOOTER_TEXT[currentLanguage];

    return <footer>
        <div className={`${classes.footerContent} container`}>
            <div className={classes.mainContent}>
                <div className={classes.socialMediaIcons}>
                    <a href="https://www.facebook.com/anna.szakacs13" rel="noreferrer" target="_blank"><FaFacebook size={50}/></a>
                    <a href="https://www.linkedin.com/in/anna-szak%C3%A1cs/" rel="noreferrer" target="_blank"><FaLinkedin size={50}/></a>
                </div>
                <div className={classes.info}>
                    <div>
                        <FaCopyright/>
                        {footerText.copyrightText}
                    </div>
                    <div>
                        <MdAlternateEmail/>
                        <a href={`mailto:${footerText.emailAddress}`}>{footerText.emailAddress}</a>
                    </div>
                </div>
            </div>
            {currentLanguage === "HUN" ? <div className={classes.newsLetter}>
                <form noValidate>
                    <InputFactory labelText="hírlevél" placeHolder="Email-cím" type="EMAIL"/>
                    <button className={classes.newsLetterButton} type="submit">Feliratkozás</button>
                </form>
            </div> : ""}
        </div>
    </footer>
}