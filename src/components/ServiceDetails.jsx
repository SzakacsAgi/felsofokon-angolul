import {useContext} from "react";
import {HeaderContext} from "../store/header-context.jsx";

export default function ServiceDetails(){
    const {currentPage} = useContext(HeaderContext);
    return(
        <h2>{`${currentPage}'s details content.`}</h2>
    )
}