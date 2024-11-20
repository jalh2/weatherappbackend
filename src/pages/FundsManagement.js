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


function FundsManagement() {
    const [data, setData] = useState([]);
    const [expertise, setExpertise] = useState("");
    const {account} = useAccountContext();
    const [isLoading, setIsLoading] = useState(false);
    
    const [fundsdata, setFundsdata] = useState(null);
    const [currentFundsIndex, setCurrentFundsIndex] = useState(0);

   

    const { menu } = useMenuContext();
    // const [triggerUpdate2, setTriggerUpdate2] = useState(false);
    
    const navigate = useNavigate();


    const logout = (e) => {
    
        e.preventDefault();
        localStorage.removeItem('admin');
        
        navigate('/Admin', { replace: true });
           
    }

    async function fetchFunds() {
         
      setIsLoading(true);
      const response = await fetch('https://schoolhelpbackend.onrender.com/api/funds/getfunds', {
        method: 'POST',
      })

      const data = await response.json()
      if (!response.ok) {
        console.log(data.error)
      }
      if (response.ok) {
        console.log("funds response")
        console.log(data);
        setFundsdata(data);
        setIsLoading(false);
      //   dispatch({ type: 'SET_REVIEWS', payload: data }) 
      }
    
 
  }
    

    useEffect(() => {
        const it = JSON.parse(localStorage.getItem('admin'));
        setData(it);
        console.log(data);
        console.log(account)

        fetchFunds();
      }, []);


      const handleStatusUpdate = async (id, suser, amount) => {

        setIsLoading(true);
        try {
          // Initial API call to approve funds
          const response = await fetch('https://schoolhelpbackend.onrender.com/api/funds/approvefunds', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            setIsLoading(false);
            console.log(data.error);
            alert(data.error);
            return;
          }
      
          // If the initial API call is successful
          if (response.ok) {
            // Make another API call to update user balance
            const updateBalanceResponse = await fetch('https://schoolhelpbackend.onrender.com/api/student/updatebalance', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ studentnumber: suser, amount: amount })
            });
      
            const updateBalanceData = await updateBalanceResponse.json();
      
            if (!updateBalanceResponse.ok) {
              console.log(updateBalanceData.error);
              setIsLoading(false);
              alert(updateBalanceData.error);
              return;
            }

            if (updateBalanceResponse.ok) {

              console.log('run get student');
                    
              const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/student/get', {
                method: 'POST',
                body: JSON.stringify({userid: suser}),
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
                  const sendPushNotification = await fetch('https://schoolhelpbackend.onrender.com/api/admin/sendpushnotification4', {
                    method: 'POST',
                    body: JSON.stringify({ token: json2?.pushtoken, username: json2?.username, amount: amount}),
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
      
            console.log(updateBalanceData);
            fetchFunds(); 
          }
      
          console.log(data);
          
          // localStorage.setItem('student', JSON.stringify(data));
          // navigate('/Student', { replace: true });
        } catch (error) {
          console.error(error);
          alert(error);
        }
      };
      

      const handleDisapprove= async (id, suser, amount) => {
       
        setIsLoading(true);
        try {
          const response = await fetch('https://schoolhelpbackend.onrender.com/api/funds/disapprovefunds', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
          });
          const data = await response.json();
          
          if (!response.ok) {
            console.log(data.error);
            alert(data.error);
            return;
          }

          if (response.ok) {

            console.log('run get student');
                  
            const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/student/get', {
              method: 'POST',
              body: JSON.stringify({userid: suser}),
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
                const sendPushNotification = await fetch('https://schoolhelpbackend.onrender.com/api/admin/sendpushnotification45', {
                  method: 'POST',
                  body: JSON.stringify({ token: json2?.pushtoken, username: json2?.username, amount: amount}),
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
          fetchFunds();
          // localStorage.setItem('student', JSON.stringify(data));
          // navigate('/Student', { replace: true });
        } catch (error) {
          console.error(error);
          alert(error);
        }
      };

      

      const handlePrevClick = () => {
        setCurrentFundsIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      };
    
      const handleNextClick = () => {
        setCurrentFundsIndex((prevIndex) =>
          Math.min(prevIndex + 1, fundsdata.length - 1)
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
           Total Pending Funds: {fundsdata?.length}
                      
            </Col>
            </Row>
           
                {fundsdata?.length > 0 && (<>
        <Row key={fundsdata[currentFundsIndex]?._id}>
            <Col>
            Student Number: {fundsdata[currentFundsIndex].studentnumber}<br />
            Amount: {fundsdata[currentFundsIndex].amount}<br />
           
            </Col>
            </Row>
            <Row>
          <Col>
            <img style={{width: '400px', height: '400px'}}  src={`data:image/png;base64,${fundsdata[currentFundsIndex].proof}`}
              alt="funds Image"
              rounded />
          </Col>
          </Row>
          <Row>
            <Col>
            <Button
            variant="danger"
            onClick={() => handleDisapprove(fundsdata[currentFundsIndex]?._id, fundsdata[currentFundsIndex].studentnumber, fundsdata[currentFundsIndex].amount)}
            >
            Disapprove
            </Button>
            </Col>
          <Col>
            <Button
              variant="primary"
              onClick={() => handleStatusUpdate(fundsdata[currentFundsIndex]?._id, fundsdata[currentFundsIndex].studentnumber, fundsdata[currentFundsIndex].amount)}
            >
              Approve
            </Button>
          </Col>
        </Row>
        </>)}

      {/* Navigation buttons */}
      {fundsdata?.length > 1 && (
        <Row>
          <Col>
            <Button variant="secondary" onClick={handlePrevClick} disabled={currentFundsIndex === 0}>
              Prev
            </Button>
          </Col>
          <Col>
            <Button variant="secondary" onClick={handleNextClick} disabled={currentFundsIndex === fundsdata.length - 1}>
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

export default FundsManagement;