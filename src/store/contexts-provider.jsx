import {useContext} from "react";
import {HeaderContext} from "./header-context.jsx";

export const useHeaderContext = () => {
    return useContext(HeaderContext);
};