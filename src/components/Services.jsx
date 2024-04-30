import {useHeaderContext} from "../store/contexts-provider";
import {isErrorOccurred} from "../store/utils/content-displayer-util";
import classes from './Services.module.css';
import ServiceCard from './ServiceCard';
import SectionTitle from "./SectionTitle";

export default function Services({pageContent}){
    const {currentLanguage} = useHeaderContext();
    const isError = isErrorOccurred(pageContent);
    const servicesSectionContent = isError ? pageContent : pageContent[currentLanguage];

    return <section className={classes.servicesContainer}>
                <SectionTitle title={servicesSectionContent.title} key={servicesSectionContent.title}/>
                <div className={classes.servicesCards}>
                    {isError ? <div>{pageContent}</div> : servicesSectionContent.data.map((service) => <ServiceCard cardInfo={service} buttonText={servicesSectionContent.detailsText}/>)}
                </div>
            </section>
}