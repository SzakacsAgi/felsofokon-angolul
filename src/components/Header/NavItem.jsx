import {Link} from "react-router-dom";
import {useContext} from "react";
import {HeaderContext} from "../../store/header-context.jsx";

function getPathName(object){
    return Object.keys(object)[0];
}

export default function NavItem({children, pageName, menuPoints}){
    const {currentPage, onMenuPointClick} = useContext(HeaderContext);

    return (
        <li className={`${menuPoints ? "nav-item dropdown" : "nav-item"}`}>
            <Link to={`/${pageName}`}
                  className={`nav-link ${currentPage === pageName ? 'active' : ''}`}
                  aria-current="page" onClick={() => onMenuPointClick(pageName) } >
                {children}
            </Link>
            {menuPoints &&
                <ul className="dropdown-menu">
                    {menuPoints.map((menuPoint, index)=>{
                        const path = getPathName(menuPoint)
                        return <NavItem key={index} pageName={path}>{menuPoint[path]}</NavItem>})}
                </ul>
            }
        </li>
    )

}