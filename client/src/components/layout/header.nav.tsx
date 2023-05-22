import { NavLink } from "react-router-dom";
import Logo from "./images/Logo.png"

// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
import './style.scss';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NavigationBar = () => {
    return (
        <div className="nav-style">
            <Navbar className="nav-style-bar" variant="dark"> {/* //bg="dark"  */}
                <Container className='content-width-bar'>


                    <NavLink className='navbar-brand' to='/'>
                        <img src={Logo} className='logo-image'></img>
                        MakeATime</NavLink>

                    <Nav className="me-auto">
                        <NavLink to="/create" className='nav-link'> Create Event</NavLink>
                        <NavLink to="/event" className='nav-link'> View Event</NavLink>
                    </Nav>
                </Container>
            </Navbar>
            <Container className='nav-sub'>

            </Container>
        </div>


        // <div className="nav-style">
        //     <Navbar >


        //         <header className='nav-bar'>
        //             <Navbar.Brand className='nav-logo' href="\">
        //                 <img alt="logo" className="logo-image"/>
        //                     MakeATime
        //             </Navbar.Brand>

        //             <nav className="nav-links">
        //                 <NavLink to="/create">Create Events</NavLink>
        //                 <NavLink to="/event">View Event</NavLink>
        //             </nav>
        //         </header>
        //     </Navbar>

        //     <Container className='nav-sub'>
        //         MakeATime sub 
        //     </Container>

        // </div>
    )
}