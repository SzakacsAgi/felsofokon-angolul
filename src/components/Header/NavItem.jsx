import {Link} from "react-router-dom";
import {useContext} from "react";
import {HeaderContext} from "../../store/header-context.jsx";
export default function NavItem({children, to, dropdown}){
    const {currentPage, onMenuPointClick} = useContext(HeaderContext);
    const page = to.slice(1);

    return (
        <li className={`${dropdown ? "nav-item dropdown" : "nav-item"}`}>
            <Link to={to}
                  className={`nav-link ${currentPage === page ? 'active' : ''}`}
                  aria-current="page" onClick={() => onMenuPointClick(page) } >
                {children}
            </Link>
            {dropdown &&
                <ul className="dropdown-menu">
                    <NavItem to="/general-english-lesson">Általnos angol óra</NavItem>
                    <NavItem to="/matura-examination">Érettségi felkészítés</NavItem>
                    <NavItem to="/translation">Fordítás</NavItem>
                </ul>
            }
        </li>
    )

}