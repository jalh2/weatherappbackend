import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import usericon from '../images/adminIcon.png'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import { useAccountContext } from '../hooks/useAccountContext'
import { useReviewContext } from '../hooks/useReviewContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useStatisticsContext } from '../hooks/useStatisticsContext'
import { useReportedContext } from '../hooks/useReportedContext'
import { useMenuContext } from '../hooks/useMenuContext';
import PopupLoading from '../components/Popuploading';


function ControlPanel() {
    const [data, setData] = useState([]);
    const [expertise, setExpertise] = useState("");
    const {account} = useAccountContext();
    const [isLoading, setIsLoading] = useState(false);
    
    const [tutordata, setTutordata] = useState(null);
    const [currentTutorIndex, setCurrentTutorIndex] = useState(0);

    const [newrate, setNewrate] = useState("");

   
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    const { menu } = useMenuContext();
    // const [triggerUpdate2, setTriggerUpdate2] = useState(false);
    
    const navigate = useNavigate();


    const logout = (e) => {
    
        e.preventDefault();
        localStorage.removeItem('admin');
        
        navigate('/Admin', { replace: true });
           
    }

    async function fetchTutorApplicants() {
         
      
      const response = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/fetchapplicants', {
        method: 'POST',
      })

      const data = await response.json()
      if (!response.ok) {
        console.log(data.error)
      }
      if (response.ok) {
        console.log("tutor applicants response")
        console.log(data);
        setTutordata(data);
      //   dispatch({ type: 'SET_REVIEWS', payload: data }) 
      }
    
 
  }
    

    useEffect(() => {
        const it = JSON.parse(localStorage.getItem('admin'));
        setData(it);
        console.log(data);
        console.log(account)

        fetchTutorApplicants();
      }, []);


      const handleStatusUpdate = async (tutorId, index) => {
        setIsLoading(true);
        try {
          const response = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/approveapplicant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailornum: tutorId, rate: tutordata[index].rate})
          });
          const data = await response.json();
          
          if (!response.ok) {
            console.log(data.error);
            setIsLoading(false);
            alert(data.error);
            return;
          }
          if (response.ok) {
            console.log('run get tutor');
            const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/get', {
              method: 'POST',
              body: JSON.stringify({userid: tutorId}),
              headers: {
                'Content-Type': 'application/json',
              }
            })
            const json2 = await response2.json()
  
            if (!response2.ok) {
             console.log(json2.error);
             setIsLoading(false);
            }
            if (response2.ok) {
        
              if(json2?.pushtoken){
                const sendPushNotification = await fetch('https://schoolhelpbackend.onrender.com/api/admin/sendpushnotification3', {
                  method: 'POST',
                  body: JSON.stringify({ token: json2?.pushtoken, username: json2?.username}),
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
                //const json0 = await sendPushNotification.json();
          
                if (!sendPushNotification.ok) {
                  console.log(sendPushNotification.error);
                  return;
                }
          
                if (sendPushNotification.ok) {
                  console.log("push token sent");
                }
              } else {
                console.log("no push token");
              }
           
            setIsLoading(false);
            console.log("success2");
            console.log(json2)
             
            }
          }
        
          console.log(data);
          fetchTutorApplicants();
          // localStorage.setItem('student', JSON.stringify(data));
          // navigate('/Student', { replace: true });
        } catch (error) {
          console.error(error);
          alert(error);
        }
      };

      
      const handleDisapprove= async (tutorId) => { 
        setIsLoading(true);
        try {
          const response = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/disapproveapplicant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({emailornum: tutorId})
          });
          const data = await response.json();
          
          if (!response.ok) {
            console.log(data.error);
            setIsLoading(false);
            alert(data.error);
            return;
          }

          if (response.ok) {

            console.log('run get tutor');
                  
            const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/get', {
              method: 'POST',
              body: JSON.stringify({userid: tutorId}),
              headers: {
                'Content-Type': 'application/json',
              }
            })
            const json2 = await response2.json()
            
        
            if (!response2.ok) {
             console.log(json2.error);
             setIsLoading(false);
            }
            if (response2.ok) {
        
              if(json2?.pushtoken){
                const sendPushNotification = await fetch('https://schoolhelpbackend.onrender.com/api/admin/sendpushnotification35', {
                  method: 'POST',
                  body: JSON.stringify({ token: json2?.pushtoken, username: json2?.username}),
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });
                //const json0 = await sendPushNotification.json();
          
                if (!sendPushNotification.ok) {
                  console.log(sendPushNotification.error);
                  return;
                }
          
                if (sendPushNotification.ok) {
                  console.log("push token sent");
                }
              } else {
                console.log("no push token");
              }
           
            setIsLoading(false);
            console.log("success2");
            console.log(json2)
             
            }
          }
        
          console.log(data);
          fetchTutorApplicants();
          // localStorage.setItem('student', JSON.stringify(data));
          // navigate('/Student', { replace: true });
        } catch (error) {
          console.error(error);
          alert(error);
        }
      };

      const handleRateChange = (tutorId, newRate) => {

        // Example of updating tutordata locally
        setTutordata((prevTutordata) =>
          prevTutordata.map((tutor) =>
            tutor._id === tutorId ? { ...tutor, rate: newRate } : tutor
          )
        );

        setNewrate(newRate);
        console.log(newrate);
      };

      const handlePrevClick = () => {
        setCurrentTutorIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      };
    
      const handleNextClick = () => {
        setCurrentTutorIndex((prevIndex) =>
          Math.min(prevIndex + 1, tutordata.length - 1)
        );
      };
    

    return (
        <>
  <Container fluid>
    <Row>
        {/* <Col className="d-none d-lg-block" md={2}> */}
        <Col className="d-none d-lg-block" md={3}>
        <Dropdown.Menu className="sidebar" show >
        <Navbar.Brand href="#home"><Link style={{color: 'gold', border: '1px solid orange', padding: 5, borderRadius: 5}} to="/"><FontAwesomeIcon icon={faBookOpen} />SchoolHelp</Link></Navbar.Brand>
        <Dropdown.Header style={{fontSize: 20, fontWeight: 'bold', position: 'relative', left: '20%'}}> Hi {data.emailornum}</Dropdown.Header>
        {/* <div className="col-sm-6 px-0 d-none d-sm-block"> */}
        <div >
          <img src={usericon}
            alt="user image" style={{position: 'relative','maxWidth': '100px', 'maxHeight':'100px', left: '20%'}} />
        </div>
        <Dropdown.Item onClick={() =>   navigate('/ControlPanel', { replace: true })}  > Back</Dropdown.Item> 
       

        <a href="" onClick={(e) => logout(e)}> <FontAwesomeIcon icon={faSignOutAlt} />logout</a>
    </Dropdown.Menu>
        </Col>
        
        <Col md={9}>

        {menu && 
        <Row className="stuRows d-md-block d-lg-none">
        <Col >
        <div id="menuDiv" style={{position: 'relative',width: '100%', background: 'white'}} >
        <Dropdown.Header style={{fontSize: 20, fontWeight: 'bold', position: 'relative'}}> Hi {data.emailornum}</Dropdown.Header>

        <button className="menuItem2" onClick={() => {navigate('/ControlPanel', { replace: true })}} > Main</button> 

        <a href="" onClick={(e) => logout(e)}> <FontAwesomeIcon icon={faSignOutAlt} />logout</a>
    </div>
        </Col>
        </Row>}

        <Row>
            <Col>
           Total Pending Tutors: {tutordata?.length}
                      
            </Col>
            </Row>
        
           
                {tutordata?.length > 0 && (<>
        <Row key={tutordata[currentTutorIndex]._id}>
            <Col>
            Phone Number: {tutordata[currentTutorIndex].emailornum}<br />
            Bio: {tutordata[currentTutorIndex].bio}<br />
            education: {tutordata[currentTutorIndex].education}<br />
            Expertise: {tutordata[currentTutorIndex].expertise}<br />
            GPA: {tutordata[currentTutorIndex].gpa}<br />

            </Col>
            </Row>
            <Row>
          <Col>
            <img style={{width: '400px', height: '400px'}}  src={`data:image/png;base64,${tutordata[currentTutorIndex].image1}`}
              alt="Tutor Image"
              rounded />
          </Col>
          </Row>
          <Row>
          <Col>
            <Dropdown onSelect={(newRate) => handleRateChange(tutordata[currentTutorIndex]._id, newRate)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Rate: {tutordata[currentTutorIndex].rate}
              </Dropdown.Toggle>

            
              <Dropdown.Menu>
                {/* Add your rate options here */}
                <Dropdown.Item eventKey="25">25</Dropdown.Item>
                <Dropdown.Item eventKey="50">50</Dropdown.Item>
                <Dropdown.Item eventKey="75">75</Dropdown.Item>
                <Dropdown.Item eventKey="100">100</Dropdown.Item>
                <Dropdown.Item eventKey="125">125</Dropdown.Item>
                <Dropdown.Item eventKey="150">150</Dropdown.Item>
                <Dropdown.Item eventKey="175">175</Dropdown.Item>
                <Dropdown.Item eventKey="200">200</Dropdown.Item>
                {/* <Dropdown.Item eventKey="100">100</Dropdown.Item> */}
                {/* ... other rate options */}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          </Row>
          <Row>
            <Col>
            <Button
            variant="danger"
            onClick={() => handleDisapprove(tutordata[currentTutorIndex].emailornum)}
            >
            Disapprove
            </Button>
            </Col>
          <Col>
            <Button
              variant="primary"
              onClick={() => handleStatusUpdate(tutordata[currentTutorIndex].emailornum, currentTutorIndex)}
            >
              Approve
            </Button>
          </Col>
        </Row>
        </>)}

      {/* Navigation buttons */}
      {tutordata?.length > 1 && (
        <Row>
          <Col>
            <Button variant="secondary" onClick={handlePrevClick} disabled={currentTutorIndex === 0}>
              Prev
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" onClick={handleNextClick} disabled={currentTutorIndex === tutordata.length - 1}>
              Next
            </Button>
          </Col>
        </Row>
      )}
         

        </Col>
        </Row>
        </Container>

        {isLoading && <PopupLoading style={{zIndex: '9999'}} />}   
        
  </>
  );
}

export default ControlPanel;