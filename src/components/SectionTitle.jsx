import classes from "./SectionTitle.module.css"

export default function SectionTitle({title, ...props}){
    return <h2 className={classes.sectionTitle} {...props}>{title}</h2>
}