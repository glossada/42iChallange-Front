import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import style from './NavBar.module.css'

function NavBar() {
  return (
    <Navbar expand="lg" data-bs-theme="dark" className={style.container}>
      <Container >
        <h1 className={style.customBrand}>42i Challenge</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className={style.links} to='https://portfolio-chi-eosin-34.vercel.app/'>¿Who am i?</Link>
            <Link className={style.links} to='https://www.linkedin.com/in/glossada/'>Linkedin</Link>
            <Link className={style.links} to='https://github.com/glossada'>GitHub</Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;