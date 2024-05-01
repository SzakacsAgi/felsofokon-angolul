import classes from './AboutMe.module.css'
import { useHeaderContext } from '../store/contexts-provider'
import { isErrorOccurred, sanitizeHTMLContent } from '../store/utils/content-displayer-util'
import SectionTitle from './SectionTitle'
import ReferencesSlider from './ReferencesSlider'

export default function AboutMe ({ pageContent }) {
  const { currentLanguage } = useHeaderContext();
  const isError = isErrorOccurred(pageContent);
  const aboutMeSectionContent = isError ? pageContent : pageContent[currentLanguage];

  return (
    <div className='container'>
        <section className={classes.aboutMeContainer}>
            <div className={classes.introductionPart}>
                <h1 className={classes.name}>{aboutMeSectionContent.name}</h1>
                <div className={classes.text} dangerouslySetInnerHTML={sanitizeHTMLContent(aboutMeSectionContent.text)}></div>
            </div>
            <div className={classes.biggerImage}>
                <div className={classes.smallerImage}></div>
            </div>
            
        </section>
        <section className={classes.references}>
            <SectionTitle title={aboutMeSectionContent.title}/>
            <div className="slider">
                {isError ? <div>{pageContent}</div> : <ReferencesSlider sliderContent={aboutMeSectionContent.referencesData}></ReferencesSlider>}
            </div>
        </section>
    </div>
  )
}