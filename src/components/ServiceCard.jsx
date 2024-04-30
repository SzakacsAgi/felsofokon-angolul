import { sanitizeHTMLContent } from "../store/utils/content-displayer-util"
import classes from "./ServiceCard.module.css";

export default function ServiceCard({cardInfo, buttonText}){
    return <div key={`${cardInfo.title}`} className={classes.serviceCard}>
    <div dangerouslySetInnerHTML={sanitizeHTMLContent(cardInfo.serviceTitle)}></div>
    <div dangerouslySetInnerHTML={sanitizeHTMLContent(cardInfo.description)}></div>
    <a href={cardInfo.navigation}>{buttonText}</a>
</div>
}