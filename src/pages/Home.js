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
   



function Home() {

    const navigate = useNavigate();
    const [isHidden, setIsHidden] = useState(false);
    const [hideStudent, setHideStudent] = useState(false);
    const [hideTutor, setHideTutor] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [emailornum, setEmailornum] = useState("");
    const [username, setUsername] = useState("");
    const [education, setEducation] = useState("");
    const [expertise, setExpertise] = useState("");
    const [rate, setRate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [studentemailornum, setStudentEmailornum] = useState("");
    const [studentusername, setStudentUsername] = useState("");
    const [studenteducation, setStudentEducation] = useState("");
    const [studentpassword, setStudentPassword] = useState("");
    const [confirmstudentPassword, setStudentConfirmPassword] = useState("");

    const [tutorloginemailornum, setTutorloginemailornum] = useState("")
    const [tutorloginpassword, setTutorloginpassword] = useState("")
   
    const [studentloginemailornum, setStudentloginemailornum] = useState("")
    const [studentloginpassword, setStudentloginpassword] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  function validatePhoneNumber(phoneNumber) {
    let sanitizedPhoneNumber = phoneNumber.replace(/^0+/, ''); // Remove leading 0s
    sanitizedPhoneNumber = sanitizedPhoneNumber.replace(/^2310?/, ''); // Remove 231 or 2310 from beginning
    const firstTwoDigits = sanitizedPhoneNumber.substring(0, 2);
    const firstThreeDigits = sanitizedPhoneNumber.substring(0, 3);
    if (
      (firstThreeDigits === '555' || firstTwoDigits === '88') &&
      sanitizedPhoneNumber.length === 9 // assuming a 10-digit phone number
    ) {
      return true;
    }
    return false;
  }
  

  const studentLogin = async (event) => {
    event.preventDefault();
    
    const loginData = {
    emailornum: studentloginemailornum,
    password: studentloginpassword
    };
    

    if(studentloginemailornum !== "" && studentloginpassword !== ""){
      try {
        const response = await fetch('/api/student/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
        const data = await response.json();
        
        if (!response.ok) {
          console.log(data.error);
          alert(data.error);
          return;
        }
      
        console.log(data);
        localStorage.setItem('student', JSON.stringify(data));
        navigate('/Student', { replace: true });
      } catch (error) {
        console.error(error);
        alert(error);
      }
    } else{
        alert("enter value for each field!");
    }


    };

    const tutorLogin = async (event) => {
      event.preventDefault();
    
      const loginData = {
        emailornum: tutorloginemailornum,
        password: tutorloginpassword
      };
    
      if (tutorloginemailornum !== "" && tutorloginpassword !== "") {
        try {
          const response = await fetch("/api/tutor/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
          });
          const data = await response.json();
          console.log(data);
          
          if (!response.ok) {
            console.log(data.error);
            alert(data.error);
            return;
          }
    
          localStorage.setItem("tutor", JSON.stringify(data));
          navigate("/Tutor", { replace: true });
        } catch (error) {
          console.error(error);
          alert(error);
        }
      } else {
        alert("Enter value for each field!");
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const signupData = {
        emailornum: emailornum,
        username: username,
        education: education,
        expertise: expertise,
        rate: rate,
        password: password,
        userType: "tutor",
        accountstatus: "1",
        balance: 0
      };
    
      if (validatePhoneNumber(emailornum)) {
        if (password === confirmPassword) {
          try {
            const response = await fetch("/api/tutor/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(signupData)
            });
            const data = await response.json();
            console.log(data);
    
            if (!response.ok) {
              console.log(data.error);
              alert(data.error);
              return;
            }


            localStorage.setItem("tutor", JSON.stringify(data));
            navigate("/Tutor", { replace: true });
          } catch (error) {
            console.error(error);
          }
        } else {
          alert("Passwords must match!");
        }
      } else {
        alert("You must enter a Lonestar number.");
      }
    };
    

    const signupStudent = async (event) => {
      event.preventDefault();
    
      const signupData = {
        emailornum: studentemailornum,
        username: studentusername,
        userType: "student",
        education: studenteducation,
        password: studentpassword,
        balance: 0
      };
    
      if (validatePhoneNumber(studentemailornum)) {
        if (studentpassword === confirmstudentPassword) {
          try {
            const response = await fetch("/api/student/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(signupData)
            });
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
              console.log(data.error);
              alert(data.error);
              return;
            }
    
            localStorage.setItem("student", JSON.stringify(data));
            navigate("/Student", { replace: true });
          } catch (error) {
            console.error(error);
            alert(error)
          }
        } else {
          alert("Passwords must match!");
        }
      } else {
        alert("You must enter a Lonestar number.");
      }
    };
    

    const handleTutorClick = () => {
      setIsHidden(true);
      setHideStudent(true);
      setHideTutor(false);
    };

    const handleStudentClick = () => {
      setIsHidden(true);
      setHideTutor(true);
      setHideStudent(false);
    };
  
    const handleButtonClick = (e) => {
      e.preventDefault();
      setIsHidden(false);
    };

    return (
        <>
    <Container className="container0">
      <Row><Col className="d-none d-lg-block" ></Col><Col style={{fontSize: 30, padding: 5, margin: '0 auto', textAlign: 'center', backgroundColor: '#fff', borderRadius: '10px', marginTop: '10px', marginBottom: '10px'}}>Which one are you?</Col><Col className="d-none d-lg-block" ></Col></Row>

      <Row className="container1"><Col className="d-none d-lg-block" lg={3}></Col><Col style={{margin: '0 auto'}}>
    {!isHidden && (
        <Row><Col>
          <div className="student" style={{margin: '0 auto'}} onClick={handleStudentClick}>
            <h1 style={{ color: 'grey' }}>Student</h1>
            <FontAwesomeIcon icon={faUserGraduate} color="#0F52BA" size="3x" />
          </div>
          </Col><Col>
          <div className="tutor"  style={{margin: '0 auto'}} onClick={handleTutorClick}>
            <h1 style={{ color: 'grey' }}>Tutor</h1>
            <FontAwesomeIcon icon={faChalkboardTeacher} color="#0F52BA" size="3x" />
          </div>
          </Col></Row>
        
      )}
      {isHidden && hideStudent && (
        <div className="new-div">
          <a href="#" className="hide-button" onClick={handleButtonClick}>
            Back
          </a>
          <h3>Tutor Login</h3>
    <Form onSubmit={tutorLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>phone number</Form.Label>
        <Form.Control type="text" 
         value={tutorloginemailornum}
         onChange={(e) => setTutorloginemailornum(e.target.value)}
        placeholder="Enter Lonestar Number" required />
        
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
        value={tutorloginpassword}
        onChange={(e) => setTutorloginpassword(e.target.value)}
        placeholder="Password" required />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <p>Or</p>
    <Button id="signupbtn" variant="secondary" onClick={handleShow}>Sign Up</Button>
        </div>
      )}

{isHidden && hideTutor && (
        <div className="new-div">
           <a href="#" className="hide-button" onClick={handleButtonClick}>
            Back
          </a>
          <h3>Student Login</h3>
    <Form onSubmit={studentLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="text" 
         value={studentloginemailornum}
         onChange={(e) => setStudentloginemailornum(e.target.value)}
        placeholder="Enter Lonestar number" required />
        
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
        value={studentloginpassword}
        onChange={(e) => setStudentloginpassword(e.target.value)}
        placeholder="Password" required />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <p>Or</p>
    <Button id="signupbtn" variant="secondary" onClick={handleShow2}>Sign Up</Button>
        </div>
      )}

</Col><Col className="d-none d-lg-block" lg={3}></Col></Row>

{/* <Row style={{width: '100%', height: '10px', backGround: 'lightgrey', position: 'absolute', bottom: '-10px', float: 'right'}}>
  <Col><Link to="/Admin">admin</Link></Col></Row> */}
  
  </Container>

  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmailPhone">
              <Form.Label>Lonestar Number Only</Form.Label>
              <Form.Control type="text" placeholder="Lonestar number"
              value={emailornum}
              onChange={(e) => setEmailornum(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
                required />
            </Form.Group>
            <Form.Group controlId="formLevelOfEducation">
              <Form.Label>Highest Level of Education</Form.Label>
              <Form.Control as="select"
               value={education}
               onChange={(e) => setEducation(e.target.value)}
              required >
                <option>Select an option</option>
                <option>High School Diploma</option>
                <option>Associate's Degree</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>Doctorate Degree</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAreasOfExpertise">
              <Form.Label>Areas of Expertise</Form.Label>
              <Form.Control as="select"
               value={expertise}
               onChange={(e) => setExpertise(e.target.value)}
              required>
                <option>Select an option</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>History</option>
                <option>English</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formRatePerQuestion">
              <Form.Label>Rate Per Question</Form.Label>
              <DropdownButton id="dropdown-basic-button" title="Select Currency">
                <Dropdown.Item>LRD</Dropdown.Item>
              </DropdownButton>
              <Form.Control as="select"
               value={rate}
               onChange={(e) => setRate(e.target.value)}
              required >
               <option>Select an option</option>
                <option value={25} >25 LRD</option>
                <option value={50} >50 LRD</option>
                <option value={75} >75 LRD</option>
                <option value={100}>100 LRD</option>
                <option value={125}>125 LRD</option>
                <option value={150}>150 LRD</option>
                <option value={175}>175 LRD</option>
                <option value={200}>200 LRD</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
              required />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
            required />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            </Form>
            </Modal.Body>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={signupStudent}>
            <Form.Group controlId="formEmailPhone">
              <Form.Label>Lonestar Number Only</Form.Label>
              <Form.Control type="text" placeholder="Enter lonestar number"
              value={studentemailornum}
              onChange={(e) => setStudentEmailornum(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username"
               value={studentusername}
               onChange={(e) => setStudentUsername(e.target.value)}
                required />
            </Form.Group>
            <Form.Group controlId="formLevelOfEducation">
              <Form.Label>Level of Education</Form.Label>
              <Form.Control as="select"
               value={studenteducation}
               onChange={(e) => setStudentEducation(e.target.value)}
              required >
                <option>Select an option</option>
                <option>High School Freshman</option>
                <option>High School Sophmore</option>
                <option>High School Junior</option>
                <option>High School Senior</option>
                <option>College Freshman</option>
                <option>College Sophmore</option>
                <option>College Junior</option>
                <option>College Senior</option>

              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"
               value={studentpassword}
               onChange={(e) => setStudentPassword(e.target.value)}
              required />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
             value={confirmstudentPassword}
             onChange={(e) => setStudentConfirmPassword(e.target.value)}
            required />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            </Form>
            </Modal.Body>
            </Modal>


  </>
  );
}

export default Home;