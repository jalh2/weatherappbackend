import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import usericon from '../images/user-icon2.png'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { generate } from 'random-password-generator';
import { useAccountContext } from '../hooks/useAccountContext'


function ResultsPage() {
    const navigate = useNavigate();
    const [tutors, setTutors] = useState([]);
    const [data, setData] = useState([]);
    const { expertise } = useParams();
    const { account, dispatch } = useAccountContext();
    const [currentTutor, setCurrentTutor] = useState(null);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [questionText, setQuestionText] = useState('');
  
    const [result, setResult] = useState("");
    const [result2, setResult2] = useState("");
    const [result3, setResult3] = useState("");
    const [result4, setResult4] = useState("");
    const [result5, setResult5] = useState("");
    const [result6, setResult6] = useState("");

    const [result7, setResult7] = useState("");
    const [result8, setResult8] = useState("");
    const [result9, setResult9] = useState("");
    const [result10, setResult10] = useState("");

    const [triggerUpdate2, setTriggerUpdate2] = useState(false);
  

    const handleSubmitQuestion = async () => {
      handleCloseQuestionBox();
      setShowModal3(true);

      const studentname = data.username;
      const studentnumber = data.emailornum;
      const teachername = currentTutor.username;
      const teachernumber = currentTutor.emailornum;
      const rate = currentTutor.rate;

      var transactionid = generate({
        length: 7,
        characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      });
    
      const response = await fetch('/api/collection/createUser', {
        method: 'POST',
      })
      const json = await response.json()
      
      if (!response.ok) {
       console.log(json.error)
      }
      if (response.ok) {
        setResult(json)
        console.log(json);
       const id = json.id;
       console.log(id);
      
        const response2 = await fetch('/api/collection/createKey', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json2 = await response2.json()
      
      if (!response2.ok) {
       console.log(json2.error)
      }
      if (response2.ok) {

        setResult2(json2)

        const id = json2.id;
        const apiKey = json2.apiKey;
        console.log(id);
        console.log(apiKey);
       
         const response3 = await fetch('/api/collection/getOauth2', {
         method: 'POST',
         body: JSON.stringify({ id, apiKey }),
         headers: {
           'Content-Type': 'application/json'
         }
       })
       const json3 = await response3.json()
       
       if (!response3.ok) {
        console.log(json3.error)
       }
       if (response3.ok) {
 
         setResult3(json3);
         

        const accessToken = json3.access_token;
        console.log(accessToken);

        
         const response4 = await fetch('/api/collection/requesttopay', {
         method: 'POST',
         body: JSON.stringify({ accessToken, transactionid, rate, studentnumber }),
         headers: {
           'Content-Type': 'application/json'
         }
       })
       const json4 = await response4.json()
       
       if (!response4.ok) {
        console.log(json4.error)
       }
       if (response4.ok) {
 
         setResult4(json4)

         const uuid = json4.id;
         console.group(uuid);
         const status = "pending";

        
         const insertFinancialRecord = await fetch('/api/finance/record', {
          method: 'POST',
          body: JSON.stringify({ uuid, transactionid, rate, status, studentname, studentnumber, teachername, teachernumber }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json5 = await insertFinancialRecord.json()
        
        if (!insertFinancialRecord.ok) {
         console.log(json4.error)
        }
        if (insertFinancialRecord.ok) {
  
          setResult5(json5)
         
          const insertQuestion = await fetch('/api/question/insert', {
            method: 'POST',
            body: JSON.stringify({ transactionid, studentname, teachername, studentnumber, teachernumber, questionText, status, rate }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const json6 = await insertQuestion.json()
          
          if (!insertQuestion.ok) {
           console.log(json6.error)
          }
          if (insertQuestion.ok) {
    
            setResult6(json6)

            var statusuuid = uuid;
            var statusaccessToken = accessToken;
           
            const response7 = await fetch('/api/finance/status', {
              method: 'POST',
              body: JSON.stringify({ statusuuid, statusaccessToken }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            const json7 = await response7.json()
            
            if (!response7.ok) {
             console.log(json7.error)
            }
            if (response7.ok) {
              setResult7(json7)
              console.log(json7);
             const statustransactionid = json7.externalId;
             const statusstatus = json7.status;
             console.log(statustransactionid);
             console.log(statusstatus);
            
              const response8 = await fetch('/api/question/update', {
              method: 'POST',
              body: JSON.stringify({ statustransactionid, statusstatus }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            const json8 = await response8.json()
            
            if (!response8.ok) {
             console.log(json8.error)
            }
            if (response8.ok) {
      
              setResult8(json8)

              var increment = "questionsasked";
              const response9 = await fetch('/api/student/increment', {
                method: 'POST',
                body: JSON.stringify({ studentnumber, increment }),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              const json9 = await response9.json()
              
              if (!response9.ok) {
               console.log(json9.error)
              }
              if (response9.ok) {
            
                setResult9(json9)
                setResult10("Done!!!!If live this would be where user confirms payment on phone")

                if(triggerUpdate2 === false){
                  setTriggerUpdate2(true);
                  }else if(triggerUpdate2 === true){
                    setTriggerUpdate2(false);
                  }
            
              } 
      
            } 
          }      
            
            }      
          
          }      
         
         }       
         
         }       
        
      } 
    }      
    }

    const handleClose3 = () => {
      setShowModal3(false);
      setResult("")
      setResult2("")
      setResult3("")
      setResult4("")
      setResult5("")
      setResult6("")
      setResult7("")
      setResult8("")
      setResult9("")
      setResult10("")
    };


    const openQuestionBox = () => setShowModal2(true);
    const handleCloseQuestionBox = () => {
      setShowModal2(false);
      setQuestionText('');
    };
    const handleQuestionTextChange = (event) => setQuestionText(event.target.value);
   


  const handleViewProfileClick = (index) => {
    setCurrentTutor(tutors[index]);
  };

  const handleCloseModal = () => {
    setCurrentTutor(null);
  };

    const logout = (e) => {
    
        e.preventDefault();
        localStorage.removeItem('student');
        
            navigate('/', { replace: true });
           
    }

    useEffect(() => {
        async function fetchData() {
          if (expertise) {
            try {
              const response = await fetch(`/api/tutor/search`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ expertise })
              });
    
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
    
              const data = await response.json();
              setTutors(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
        }
    
        fetchData();
      }, [expertise]);

    useEffect(() => {
        const it = JSON.parse(localStorage.getItem('student'));
        setData(it);
        console.log(data);
        console.log(data.emailornum)
      }, []);

      useEffect(() => {
        async function fetchAccount() {
          const account1 = JSON.parse(localStorage.getItem('student'));
          const account2 = JSON.parse(localStorage.getItem('tutor'));
            
          if (account1) {
            const userid = account1.emailornum;
             
            const response = await fetch('/api/student/get', {
              method: 'POST',
              body: JSON.stringify({ userid}),
              headers: {
                'Content-Type': 'application/json'
              }
            })
      
            const json = await response.json()
            if (!response.ok) {
              console.log(json.error)
            }
            if (response.ok) {
              console.log("response1")
              console.log(json);
              dispatch({ type: 'SET_ACCOUNT', payload: json }) 
            }
          } else if (account2) {
            const userid = account2.emailornum;
             
            const response = await fetch('/api/tutor/get', {
              method: 'POST',
              body: JSON.stringify({ userid }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
      
            const json = await response.json()
            if (!response.ok) {
              console.log(json.error)
            }
            if (response.ok) {
              console.log("response2")
              console.log(json);
              dispatch({ type: 'SET_ACCOUNT', payload: json }) 
            }
          }
        }
      
        fetchAccount();
      }, [triggerUpdate2])
  
    return (
        <>
        <Container fluid>
        <Row>
            {/* <Col className="d-none d-lg-block" md={2}> */}
            <Col className="d-none d-lg-block" md={3}> 
            <Dropdown.Menu className="sidebar" show >
        <span style={{border: '1px solid orange', padding: 5, borderRadius: 5, color: 'orange', position: 'relative', left: '20%'}} href="#home"><FontAwesomeIcon icon={faBookOpen} />SchoolHelp</span>
        <Dropdown.Header style={{fontSize: 20, fontWeight: 'bold', position: 'relative', left: '10%'}}> Hi {data.username}!<br/> Lonestar Number<br /> {data.emailornum}</Dropdown.Header>
        {/* <div className="col-sm-6 px-0 d-none d-sm-block"> */}
        <div >
          <img src={usericon}
            alt="user image" style={{position: 'relative','maxWidth': '100px', 'maxHeight':'100px', left: '20%'}} />
        </div>

      </Dropdown.Menu>
            </Col>
            
            <Col md={9}>
                <Row><Col md={3}><Link to="/Student" style={{marginLeft: 40}} > Back</Link></Col>
                <Col md={9} style={{fontSize: 30}}>{expertise} Tutors</Col>
                </Row>

            <Row><Col>   
      <div>
      <Row>
      {tutors.map((tutor, index) => (
    <Col key={index} md={4}>
      <table className="resultstbl" style={{borderRadius: '20%'}}>
        <tbody>
          <tr>
            <td>{tutor.username}</td>
          </tr>
          <tr>
            <td><img src={usericon} alt={tutor.username} width="75" height="75" /></td>
          </tr>
          <tr>
            <td>Has a: {tutor.education}</td>
            </tr>
            <tr>
            <td>Rate: ${tutor.rate}.00 LRD</td>
          </tr>
          <tr>
            <td colSpan="2"><button className="btn btn-primary"  onClick={() => handleViewProfileClick(index)}>View Profile</button></td>
          </tr>
        </tbody>
      </table>
    </Col>
  ))}
</Row>

      </div>
      </Col></Row> 


      </Col>
        </Row>
        </Container>

        <Modal show={!!currentTutor} onHide={handleCloseModal} style={{position: 'fixed', width: '100%', backgroundColor: '#f2f3f4'}}>
        <Modal.Header closeButton>
          <Modal.Title>{currentTutor && `${currentTutor.username}'s Profile`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTutor && (
            
            <table className="resultstbl2" style={{border: 'none'}}>
        <tbody>
          <tr>
            <td>{currentTutor.username}</td>
          </tr>
          <tr>
            <td><img src={usericon} alt={currentTutor.username} width="75" height="75" /></td>
          </tr>
          <tr>
            <td colSpan="2"><Button className="btn btn-primary"  onClick={() => openQuestionBox()}>Ask a Question</Button></td>
          </tr>
          <tr>
            <td>Has a: {currentTutor.education}</td>
            </tr>
            <tr>
            <td>Rate: ${currentTutor.rate}.00 LRD</td>
          </tr>
          
        </tbody>
      </table>
            
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2} style={{position: 'fixed', width: '100%', backgroundColor: '#f2f3f4'}} onHide={handleCloseQuestionBox}>
        <Modal.Header closeButton>
        
          <Modal.Title>Ask a question</Modal.Title>
        </Modal.Header>
        <Modal.Body>{currentTutor &&
        <p><span style={{color: 'red'}}>Warning!</span>${currentTutor.rate} LRD will be deducted from your mobile money account when question is submitted.</p>
         }
          <Form>
            <Form.Group controlId="questionTextArea">
              <Form.Label>Question:</Form.Label>
              <Form.Control as="textarea" rows={5} value={questionText} onChange={handleQuestionTextChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseQuestionBox}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitQuestion} disabled={!questionText}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal3} style={{position: 'fixed', width: '100%', backgroundColor: '#f2f3f4'}} onHide={handleClose3}>
        <Modal.Header closeButton>
        
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Loading...
        {result && <p>{JSON.stringify(result)}</p>}
        {result2 && <p>{JSON.stringify(result2)}</p>}
        {result3 && <p>{JSON.stringify(result3)}</p>}
        {result4 && <p>{JSON.stringify(result4)}</p>}
        {result5 && <p>{JSON.stringify(result5)}</p>}
        {result6 && <p>{JSON.stringify(result6)}</p>}
        {result7 && <p>{JSON.stringify(result7)}</p>}
        {result8 && <p>{JSON.stringify(result8)}</p>}
        {result9 && <p>{JSON.stringify(result9)}</p>}
        {result10 && <p>{JSON.stringify(result10)}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        
  </>
    );
  }
  
  export default ResultsPage;