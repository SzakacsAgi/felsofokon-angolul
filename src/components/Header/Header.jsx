import './Header.css'
import NavItem from "./NavItem";
import FlagNavItem from "./FlagNavItem";
export default function Header(){

    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <h1 className="navbar-brand">Felsőfokon angolul</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                        <ul className="navbar-nav">
                            <NavItem to="/home">Főoldal</NavItem>
                            <NavItem to="/about">Rólam</NavItem>
                            <NavItem to="/services" dropdown>Szolgáltatások</NavItem>
                            <NavItem to="/prices">Árak</NavItem>
                            <NavItem to="/contact">Kapcsolat</NavItem>
                            <NavItem to="/blog">Blog</NavItem>
                            <FlagNavItem/>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}