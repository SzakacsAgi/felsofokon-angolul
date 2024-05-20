import {Link} from "react-router-dom";
import {useHeaderContext} from "../../store/contexts-provider";

function getPathName(object){
    return Object.keys(object)[0];
}

export default function NavItem({children, pageName, menuPoints, onClick}){
    const {currentPage, onMenuPointClick} = useHeaderContext();

    return (
        <li className={`${menuPoints ? "nav-item dropdown" : "nav-item"}`} onClick={onClick}>
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