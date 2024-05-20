import './Header.css'
import NavItem from "./NavItem";
import FlagNavItem from "./FlagNavItem";
import { HEADER_TEXT } from "../../data/static-data";
import { useHeaderContext } from "../../store/contexts-provider";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';

export default function Header() {
    const { currentLanguage } = useHeaderContext();
    const currentLanguageText = HEADER_TEXT[currentLanguage];

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const closeOffcanvas = () => setShowOffcanvas(false);
    const toggleOffcanvas = () => setShowOffcanvas(prev => !prev);

    return (
        <header>
            <div className='edge-container'>
                <Navbar expand={window.outerWidth > 824}>
                    <Container fluid>
                        <div className='title-container flex-item'>
                            <h1 href="/home">{currentLanguageText.title}</h1>
                        </div>
                        <Navbar.Toggle 
                            aria-controls='offcanvasNavbar-expand-md'
                            onClick={toggleOffcanvas} 
                        />
                        <Navbar.Offcanvas
                            id='offcanvasNavbar-expand-md'
                            aria-labelledby='offcanvasNavbarLabel-expand-md'
                            placement="end"
                            className='flex-item'
                            show={showOffcanvas} 
                            onHide={closeOffcanvas} 
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>
                                    <FlagNavItem />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1">
                                    <NavItem pageName="home" onClick={closeOffcanvas}>{currentLanguageText.home}</NavItem>
                                    <NavItem pageName="about" onClick={closeOffcanvas}>{currentLanguageText.about}</NavItem>
                                    <NavItem pageName="services" onClick={closeOffcanvas}>{currentLanguageText.services}</NavItem>
                                    {currentLanguage === "HUN" ? <NavItem pageName="prices" onClick={closeOffcanvas}>{currentLanguageText.prices}</NavItem> : ""}
                                    <NavItem pageName="contact" onClick={closeOffcanvas}>{currentLanguageText.contact}</NavItem>
                                    <NavItem pageName="blog" onClick={closeOffcanvas}>{currentLanguageText.blog}</NavItem>
                                    <FlagNavItem onClick={closeOffcanvas} />
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </div>
        </header>
    );
}
