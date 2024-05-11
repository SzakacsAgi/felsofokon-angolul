import './Header.css'
import NavItem from "./NavItem";
import FlagNavItem from "./FlagNavItem";
import { HEADER_TEXT } from "../../data/static-data";
import { useHeaderContext } from "../../store/contexts-provider";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Header() {
    const { currentLanguage } = useHeaderContext();
    const currentLanguageText = HEADER_TEXT[currentLanguage];

    return <header>
        <div className='edge-container'>
            <Navbar expand='lg'>
                <Container fluid>
                    <div className='title-container flex-item'>
                        <h1 href="/home">{currentLanguageText.title}</h1>
                    </div>
                    <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
                    <Navbar.Offcanvas
                        id='offcanvasNavbar-expand-lg'
                        aria-labelledby='offcanvasNavbarLabel-expand-lg'
                        placement="end"
                        className='flex-item'
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'><FlagNavItem /></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1">
                                <NavItem pageName="home">{currentLanguageText.home}</NavItem>
                                <NavItem pageName="about">{currentLanguageText.about}</NavItem>
                                <NavItem pageName="services">{currentLanguageText.services}</NavItem>
                                <NavItem pageName="prices">{currentLanguageText.prices}</NavItem>
                                <NavItem pageName="contact">{currentLanguageText.contact}</NavItem>
                                <NavItem pageName="blog">{currentLanguageText.blog}</NavItem>
                                <FlagNavItem />
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    </header>
}
