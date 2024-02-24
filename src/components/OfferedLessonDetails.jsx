import {useHeaderContext} from "../store/contexts-provider.jsx";

export default function OfferedLessonDetails(){
    const {currentPage} = useHeaderContext()

    return(
        <h2>{`${currentPage}'s details content.`}</h2>
    )
}