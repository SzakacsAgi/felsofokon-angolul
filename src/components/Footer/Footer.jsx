import {FOOTER_TEXT, CONTACT_INFORMATION} from "../../data/static-data";
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
                <form noValidate>
                    <InputFactory labelText={footerText.newsLetterText} placeHolder={footerText.newsLetterPlaceHolder} type="EMAIL"/>
                    <button className={classes.newsLetterButton} type="submit">Feliratkozás</button>
                </form>
            </div> : ""}
        </div>
    </footer>
}