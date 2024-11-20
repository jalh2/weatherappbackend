import React, { useState, createContext, useContext  } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { useMenuContext } from '../hooks/useMenuContext';


const NavbarH2 = () => {
  const { menu, dispatch } = useMenuContext()

    // const { logout } = useLogout()
    const toggleMenu = () => {
      console.log("menu1");
      console.log(menu);
      dispatch({ type: 'SET_MENU', payload: !menu })
    }
   
  return (
    <header>
       <Navbar className="d-xs-block d-lg-none" style={{background: 'white'}}>
      <Container>
        <Navbar.Brand style={{border: '1px solid orange', padding: 5, borderRadius: 5, color: 'orange'}} href="#home"> <FontAwesomeIcon icon={faLaptop} />SchoolHelp
        <FontAwesomeIcon
        icon={faBars}
        size="2x"
        color="grey"
        onClick={toggleMenu}
      />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {/* Signed in as: <a href="#login">Tutor</a> */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    <Navbar className="d-none d-lg-block" style={{background: 'white', width:'80%', left:'20%', height: '10%'}}>
      <Container>
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

export default NavbarH2