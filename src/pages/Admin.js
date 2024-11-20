import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
   



function Admin() {

    const navigate = useNavigate();
   
    const [adminloginemailornum, setadminloginemailornum] = useState("")
    const [adminloginpassword, setadminloginpassword] = useState("")



  const adminLogin = event => {
    event.preventDefault();
    
    const loginData = {
    emailornum: adminloginemailornum,
    password: adminloginpassword
    };
    

    if(adminloginemailornum !== "" && adminloginpassword !== ""){
    fetch("https://schoolhelpbackend.onrender.com/api/admin/login", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(data => {
    console.log(data);
  
    localStorage.setItem('admin', JSON.stringify(data));
    return(
        navigate('/ControlPanel', { replace: true })
        )
    })
    .catch(error => {
    console.error(error);
    });
    } else{
        alert("enter value for each field!");
    }


    };

 
 
    return (
        <>
    <Container className="container0">
    
      <Row className="container1"><Col md={3}></Col><Col>
   
        <div className="new-div">

          <h3>Admin Login</h3>
    <Form onSubmit={adminLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="text" 
         value={adminloginemailornum}
         onChange={(e) => setadminloginemailornum(e.target.value)}
        placeholder="Admin" required />
        
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
        value={adminloginpassword}
        onChange={(e) => setadminloginpassword(e.target.value)}
        placeholder="Password" required />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
        </div>
   

</Col><Col md={3}></Col></Row>
  </Container>




  </>
  );
}

export default Admin;