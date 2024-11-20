import { useNavigate, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';


const NavbarH = () => {

    // const { logout } = useLogout()
   
  return (
    <header>
    <Navbar style={{background: 'white'}}>
      <Container>
        <Navbar.Brand style={{border: '1px solid orange', padding: 5, borderRadius: 5, color: 'orange'}} href="#home"> <Link style={{color: 'gold'}} to="/"><FontAwesomeIcon icon={faLaptop} />SchoolHelp</Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {/* Signed in as: <a href="#login">Tutor</a> */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default NavbarH