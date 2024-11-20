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
   



function DeleteAccount() {

    return (
        <>
    <Container className="container0">
    
      <Row className="container1"><Col>
   
        <div className="new-div">

        <h1>Request Account Deletion</h1>
<p>Send us a email at <b>hallahatjallah@gmail.com</b> with subject "Delete Account" to request 
perminant deletion of account.</p>

    
        </div>
   

</Col></Row>
  </Container>




  </>
  );
}

export default DeleteAccount;