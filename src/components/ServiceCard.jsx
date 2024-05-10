import { sanitizeHTMLContent, extractInnerText, convertTitleToLink } from "../store/utils/content-displayer-util"
import classes from "./ServiceCard.module.css";

export default function ServiceCard({cardInfo, buttonText}){
    return <div key={`${cardInfo.title}`} className={classes.serviceCard}>
    <div dangerouslySetInnerHTML={sanitizeHTMLContent(cardInfo.serviceTitle)}></div>
    <div dangerouslySetInnerHTML={sanitizeHTMLContent(cardInfo.description)}></div>
    <a href={`/services#${convertTitleToLink(extractInnerText(cardInfo.serviceTitle))}`}>{buttonText}</a>
</div>
}