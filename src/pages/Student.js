import React, { useEffect, useState, useContext  } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import usericon from '../images/user-icon2.png'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import { useAccountContext } from '../hooks/useAccountContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useQuestionContext } from '../hooks/useQuestionContext'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useMenuContext } from '../hooks/useMenuContext';

function Student() {
    const [data, setData] = useState([]);
    const [expertise, setExpertise] = useState("");
    const { account } = useAccountContext();
    const [answer, setAnswer] = useState([]);
    const [answer2, setAnswer2] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showAnswer2, setShowAnswer2] = useState(false);
    const [showprompt, setShowPrompt] = useState(true);
    const { questions, dispatch } = useQuestionContext();
    const [div1Visible, setDiv1Visible] = useState(true);
    const [div2Visible, setDiv2Visible] = useState(false);
    const navigate = useNavigate();

    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [triggerUpdate2, setTriggerUpdate2] = useState(false);

    const { menu } = useMenuContext();

    const submittedQuestions = questions ? questions.filter(q => q.status === 'submitted') : [];
    // const pendingQuestions = questions ? questions.filter(q => q.status === 'pending') : [];
    const answeredQuestions = questions ? questions.filter(q => q.status === 'answered') : [];
    const confirmedQuestions = questions ? questions.filter(q => q.status === 'confirmed') : [];
    


    const fileComplaint = async () => {
      console.log(answer);
    
      const response = await fetch('/api/question/complain', {
        method: 'POST',
        body: JSON.stringify(answer),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();
    
      if (!response.ok) {
        console.log(json.error);
        return;
      }
    
      console.log('success');
      console.log(json);
      if(triggerUpdate === false){
        setTriggerUpdate(true);
        }else if(triggerUpdate === true){
          setTriggerUpdate(false);
        }

      setShowPrompt(false);
      alert("Complaint Submitted - We'll get back to you in 24 hours")
    }





    const confirmAnswer = async () => {
      console.log(answer);
      var transactionid = answer.transactionid;
    
      const response = await fetch('/api/question/confirm', {
        method: 'POST',
        body: JSON.stringify({ transactionid }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();
    
      if (!response.ok) {
        console.log(json.error);
        return;
      }
    
      console.log('success');
      console.log(json);
    
      var getrate = answer.rate;
      const rate = Number(getrate);
      const disbursementAmount = rate * 0.8;
    
      const response2 = await fetch('/api/finance/disbursement', {
        method: 'POST',
        body: JSON.stringify({ disbursementAmount }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json2 = await response2.json();
    
      if (!response2.ok) {
        console.log(json2.error);
        return;
      }
      console.log("json2");
      console.log(json2)
      var studentnumber = answer.studentnumber;
      var increment = "answersreceived";
    
      const response3 = await fetch('/api/student/increment', {
        method: 'POST',
        body: JSON.stringify({ studentnumber, increment }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json3 = await response3.json();
    
      if (!response3.ok) {
        console.log(json3.error);
        return;
      }
    
      console.log('success');
      console.log(json3);

      var tutornumber = answer.teachernumber;
      var earnings = disbursementAmount;

      const response4 = await fetch('/api/tutor/increment', {
        method: 'POST',
        body: JSON.stringify({ tutornumber, earnings }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json4 = await response4.json();
    
      if (!response4.ok) {
        console.log(json4.error);
        return;
      }
    
      console.log('success');
      console.log(json4);

      if(triggerUpdate2 === false){
        setTriggerUpdate2(true);
        }else if(triggerUpdate2 === true){
          setTriggerUpdate2(false);
        }
    
      setShowPrompt(false);
    };



    

    const closeAnswer = () => {
      setShowAnswer(false);
    }

    const closeAnswer2 = () => {
      setShowAnswer2(false);
    }

    const viewAnswer = (index) => {
      console.log(index)
      setAnswer(answeredQuestions[index]);
      console.log(answer);
      setShowAnswer(true);
  
    }

    const viewAnswer2 = (index) => {
      console.log(index);
      console.log(confirmedQuestions[index]);
      setAnswer2(confirmedQuestions[index]);
      console.log(answer2);
      setShowAnswer2(true);
  
    }

    const logout = (e) => {
    
        e.preventDefault();
        localStorage.removeItem('student');
        
            navigate('/', { replace: true });
           
    }

    const search = (e) => {
    
        e.preventDefault();
        navigate(`/ResultsPage/${expertise}`);
           
    }

    useEffect(() => {
        const it = JSON.parse(localStorage.getItem('student'));
        setData(it);
        console.log(data);
        console.log(account)
        console.log("menu");
        console.log(menu);
      }, []);

      useEffect(() => {
        async function fetchQuestions() {
          const account1 = JSON.parse(localStorage.getItem('student'));
          const account2 = JSON.parse(localStorage.getItem('tutor'));
         
      
          if (account1) {
            const userid = account1.emailornum;
            const type = "studentnumber";
      
            const response = await fetch('/api/question/get', {
              method: 'POST',
              body: JSON.stringify({ userid, type }),
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
              dispatch({ type: 'SET_QUESTIONS', payload: json }) 
            }
          } else if (account2) {
            const userid = account2.emailornum;
            const type = "teachernumber";
      
            const response = await fetch('/api/question/get', {
              method: 'POST',
              body: JSON.stringify({ userid, type }),
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
              dispatch({ type: 'SET_QUESTIONS', payload: json }) 
            }
          }
        }
      
        fetchQuestions();
      }, [triggerUpdate])


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
        <Dropdown.Item  onClick={() => {setDiv1Visible(true); setDiv2Visible(false);}}  > Questions</Dropdown.Item> 
      
      <Dropdown.Item onClick={() => {setDiv2Visible(true); setDiv1Visible(false); }} > Profile</Dropdown.Item> 

        <a href="" onClick={(e) => logout(e)}> <FontAwesomeIcon icon={faSignOutAlt} />logout</a>
    </Dropdown.Menu>
        </Col>
        
        <Col md={9}>

       {menu && 
        <Row className="stuRows d-md-block d-lg-none">
        <Col >
        <div id="menuDiv" style={{position: 'relative',width: '100%', background: 'white'}} >
        <Dropdown.Header style={{fontSize: 20, fontWeight: 'bold', position: 'relative'}}> Hi {data.username}!<br/> Lonestar Number {data.emailornum}</Dropdown.Header>

        <button className="menuItem" onClick={() => {setDiv1Visible(true); setDiv2Visible(false);}}  > Questions</button> 
      
      <button className="menuItem" onClick={() => {setDiv2Visible(true); setDiv1Visible(false); }} > Profile</button> 

        <a href="" onClick={(e) => logout(e)}> <FontAwesomeIcon icon={faSignOutAlt} />logout</a>
    </div>
        </Col>
        </Row>}


        <Row className="stuRows">
        <Col>
        <div className="paddedDiv2" style={{marginTop: '5px'}}>
         <Form onSubmit={search}>
        <table><tbody><tr><td>
            <Form.Group controlId="formAreasOfExpertise">
             
              <Form.Control as="select"
               value={expertise}
               onChange={(e) => setExpertise(e.target.value)}
              required>
                <option> Choose area of expertise </option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>History</option>
                <option>English</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            </td><td>
            <Button variant="primary" type="submit">
            Find Tutor
            </Button>
            </td></tr></tbody></table>
            </Form>
            </div>
            </Col>
        </Row>


        {div1Visible &&     
        <Row className="stuRows">
          <Col>
          <table><tbody><tr>
            <td> <div className="paddedDiv">
            <table className="accbaltbl">
              <thead>
                <tr>
                  <td>Questions Asked</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                {account && <td>{account.questionsasked}</td>}
                </tr>
              </tbody>
            </table>
            </div></td>
          
          
          <td>
          <div className="paddedDiv">
            <table className="accbaltbl">
              <thead>
                <tr>
                  <td>Confirmed Answers</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                {account &&  <td>{account.answersreceived}</td>}
                </tr>
              </tbody>
            </table>
            </div>  
          </td></tr></tbody></table>
         
          </Col>
        </Row>}

        {div1Visible &&
         <div className="paddedDiv2">
        <Row className="stuRows" style={{backgroundColor: '#fff'}}>
            <Col>
      <Tabs defaultActiveKey="submitted-questions">
      <Tab eventKey="submitted-questions" title="Submitted Questions">
        {submittedQuestions.map((q, index) => (
          <div key={index}>
            <p>{index + 1}.</p>
            {/* Assuming q.questionText is base64-encoded image data */}
            <img src={`data:image/jpeg;base64,${q.questionText}`} alt={`Question ${index + 1}`} fluid />
          </div>
        ))}
      </Tab>
      {/* <Tab eventKey="pending-questions" title="Pending Questions">
        {pendingQuestions.map(q => (
          <p key={q._id}>{q.questionText}</p>
        ))}
      </Tab> */}
          <Tab eventKey="answered-questions" title="Answered Questions">
        {answeredQuestions.map((q, index) => (
          <div key={index}>
            <p>{index + 1}.</p>
            {/* Assuming q.questionText is base64-encoded image data */}
            <img src={`data:image/jpeg;base64,${q.questionText}`} alt={`Question ${index + 1}`} fluid />
            <Button onClick={() => viewAnswer(index)}>View Answer</Button>
          </div>
        ))}
      </Tab>
      <Tab eventKey="confirmed-questions" title="Confirmed Answers">
        {confirmedQuestions.map((q, index) => (
          <div key={index}>
          <p>{index + 1}.</p>
          {/* Assuming q.questionText is base64-encoded image data */}
          <img src={`data:image/jpeg;base64,${q.questionText}`} alt={`Question ${index + 1}`} fluid />
        <Button onClick={() => viewAnswer2(index)}>view answer</Button>
        </div>
        ))}
      </Tab>
    </Tabs>
          </Col>
      </Row>
      </div>
      }

      {div2Visible &&
        <Row className="stuRows" >
            <Col>
            {data && (
            <div className="paddedDiv2">
            <table className="resultstbl2" style={{border: 'none'}}>
        <tbody>
          <tr>
            <td>{data.username}</td>
          </tr>
          <tr>
            <td><img src={usericon} alt={data.username} width="75" height="75" /></td>
          </tr>
          <tr>
            <td>Level Of Education: {data.education}</td>
            </tr>
         
        </tbody>
      </table>
              </div>
          )}
        
              <br/>
              
           
          </Col>
      </Row>}

        
        </Col>
        </Row>
        </Container>

        <Modal show={showAnswer}>
      <Modal.Header>
        {answer && 
        <Modal.Title> <img src={`data:image/jpeg;base64,${answer.questionText}`} alt="question" fluid /></Modal.Title>
        }
      </Modal.Header>
      {answer && 
      <Modal.Body>
       <table><tbody><tr><td>{ showprompt && <table style={{border: '1px solid red'}}><tbody>
       <tr><td colSpan="3"><p style={{color: 'red'}}>You must respond within 24 hours.</p></td></tr>
       <tr><td>Did the tutor answer your question?</td><td> <Button variant="success" onClick={confirmAnswer}>Yes</Button> </td>
       <td> <Button variant="outline-danger"  onClick={fileComplaint}>No - Request Refund</Button></td></tr>
       </tbody></table> }</td></tr>
        <tr><td>Answer</td></tr>
       <tr><td>{answer.answer}</td></tr>
       <tr><td>Explanation</td></tr>
       <tr><td>{answer.explanation}</td></tr>
       </tbody></table>
       </Modal.Body>}
      <Modal.Footer>
          <Button variant="secondary" onClick={closeAnswer}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>

        <Modal show={showAnswer2}>
      <Modal.Header>
        {answer2 && 
        <Modal.Title><img src={`data:image/jpeg;base64,${answer2.questionText}`} alt="question" fluid /></Modal.Title>
        }
      </Modal.Header>
      {answer2 && 
      <Modal.Body>
       <table><tbody><tr><td>Answer</td></tr>
       <tr><td>{answer2.answer}</td></tr>
       <tr><td>Explanation</td></tr>
       <tr><td>{answer2.explanation}</td></tr>
       </tbody></table>
       </Modal.Body>}
      <Modal.Footer>
          <Button variant="secondary" onClick={closeAnswer2}>
            Cancel
          </Button>
        </Modal.Footer>
    </Modal>
        
  </>
  );
}

export default Student;