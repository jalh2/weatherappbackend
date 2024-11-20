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


function ManualDisbursement() {
    const [data, setData] = useState([]);
    const [expertise, setExpertise] = useState("");
    const {account} = useAccountContext();
    
    const [confirmeddata, setConfirmeddata] = useState(null);
    const [currentConfirmedIndex, setCurrentConfirmedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
   

    const { menu } = useMenuContext();
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    
    const navigate = useNavigate();


    const logout = (e) => {
    
        e.preventDefault();
        localStorage.removeItem('admin');
        
        navigate('/Admin', { replace: true });
           
    }

    async function fetchConfirmedQuestions() {
      setIsLoading(true);
              
      const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/getAllPayReady', {
         method: 'POST',
         })
         const json = await response.json()
            
         if (!response.ok) {
           console.log(json.error);
           setIsLoading(false);
           return;
         }

      if (response.ok) {
        console.log("confirmed response")
        console.log(json);
        setConfirmeddata(json);
        setIsLoading(false);
      //   dispatch({ type: 'SET_REVIEWS', payload: data }) 
      }
    
 
  }
    

    useEffect(() => {
        const it = JSON.parse(localStorage.getItem('admin'));
        setData(it);
        console.log(data);
        console.log(account)

        fetchConfirmedQuestions();
      }, []);

      useEffect(() => {
        
        fetchConfirmedQuestions();
        setTriggerUpdate(false);
      }, [triggerUpdate]);


      const updatePayment = async (transactionid, amount, status, studentnumber, tutornumber) => {

       setIsLoading(true);
           
        try {
          let response7; // Declare response7 outside the conditional block
          let passnumber;
      
          const response5 = await fetch('https://schoolhelpbackend.onrender.com/api/question/payed', {
            method: 'POST',
            body: JSON.stringify({ transactionid }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const json5 = await response5.json();
      
          if (!response5.ok) {
            console.log(json5.error);
            setIsLoading(false);
            return;
          }
      
          if (response5.ok) {
            var disbursementAmount = amount * 0.8;
            var disbursementAmount = -disbursementAmount;
      
            const response6 = await fetch('https://schoolhelpbackend.onrender.com/api/finance/disbursement', {
              method: 'POST',
              body: JSON.stringify({ disbursementAmount }),
              headers: {
                'Content-Type': 'application/json',
              }
            });
            const json6 = await response6.json();
      
            if (!response6.ok) {
              console.log(json6.error);
              setIsLoading(false);
              return;
            }
      
            if (response6.ok) {
              console.log('disbursement balance decremented');
              console.log(json6);
      
              // Conditionally fetch based on status
              if (status === "refund") {
                response7 = await fetch('https://schoolhelpbackend.onrender.com/api/student/get', {
                  method: 'POST',
                  body: JSON.stringify({ userid: studentnumber }),
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });

                passnumber = studentnumber;
                console.log("refund response");

              } else {
                response7 = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/get', {
                  method: 'POST',
                  body: JSON.stringify({ userid: tutornumber }),
                  headers: {
                    'Content-Type': 'application/json',
                  }
                });

                passnumber = tutornumber;
                console.log("confirmed response");
              }
      
              const json7 = await response7.json();
      
              if (!response7.ok) {
                console.log(json7.error);
                setIsLoading(false);
                return;
              }
      
              if (response7.ok) {
                if (json7?.pushtoken) {
                  
            
                  const sendPushNotification = await fetch('https://schoolhelpbackend.onrender.com/api/admin/sendpushnotification2', {
                    method: 'POST',
                    body: JSON.stringify({ token: json7?.pushtoken, username: json7?.username, amount: disbursementAmount, number:passnumber }),
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  });
                  //const json0 = await sendPushNotification.json();
            
                  if (!sendPushNotification.ok) {
                    console.log(sendPushNotification.error);
                    setIsLoading(false);
                    return;
                  }
            
                  if (sendPushNotification .ok) {
                    console.log("push notification sent");
                  }
                } else {
                  console.log("no push token");
                }
                console.log("success7");
                console.log(json7);
                setTriggerUpdate(true);
                // setIsLoading(false);
          
              }
            }
          }
        } catch (error) {
          console.error(error);
          alert(error);
        }
      };
      

      

      // const handleDisapprove= async (id) => {
       
      //   try {
      //     const response = await fetch('https://schoolhelpbackend.onrender.com/api/funds/disapprovefunds', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({id: id})
      //     });
      //     const data = await response.json();
          
      //     if (!response.ok) {
      //       console.log(data.error);
      //       alert(data.error);
      //       return;
      //     }
        
      //     console.log(data);
      //     fetchConfirmedQuestions();
      //     // localStorage.setItem('student', JSON.stringify(data));
      //     // navigate('/Student', { replace: true });
      //   } catch (error) {
      //     console.error(error);
      //     alert(error);
      //   }
      // };

      

      const handlePrevClick = () => {
        setCurrentConfirmedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      };
    
      const handleNextClick = () => {
        setCurrentConfirmedIndex((prevIndex) =>
          Math.min(prevIndex + 1, confirmeddata.length - 1)
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
           Total Waiting Payments: {confirmeddata?.length}
                      
            </Col>
            </Row>
           
            {confirmeddata?.length > 0 && (
              <>
            {confirmeddata?.slice(currentConfirmedIndex, currentConfirmedIndex + 10).map((record, index) => (
              <Row key={record._id} className="record-row">
                <Col md={4} className="record-col">
                  {record.status === "confirmed" ? (
                    <>Tutor Number: {record.teachernumber}</>
                  ) : (
                    <>Student Number: {record.studentnumber}</>
                  )}
                </Col>
                <Col md={4} className="record-col">
                  Question Status: {record.status}
                </Col>
                <Col md={4} className="record-col">
                  <Button
                    variant="success"
                    onClick={() => updatePayment(record?.transactionid, record?.rate, record?.status, record?.studentnumber, record?.teachernumber)}
                  >
                        Confirm Payment
                    </Button>
                    </Col>
                </Row>
                ))}

                </>
                )}

        {/* Navigation buttons */}
        {confirmeddata?.length > 10 && (
        <Row>
            <Col>
            <Button variant="secondary" onClick={handlePrevClick} disabled={currentConfirmedIndex === 0}>
                Prev
            </Button>
            </Col>
            <Col>
            <Button variant="secondary" onClick={handleNextClick} disabled={currentConfirmedIndex >= confirmeddata.length - 10}>
                Next
            </Button>
            </Col>
        </Row>
        )}

         
        </Col>
        </Row>
        </Container>

      
        {isLoading && <PopupLoading />}
  </>
  );
}

export default ManualDisbursement;