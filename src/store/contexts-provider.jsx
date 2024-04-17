import {useContext} from "react";
import {HeaderContext} from "./header-context";

export const useHeaderContext = () => {
    return useContext(HeaderContext);
};