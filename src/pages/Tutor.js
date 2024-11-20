import React, { useEffect, useState } from 'react';
import { useNavigate, Link, UNSAFE_DataRouterContext } from "react-router-dom";
import { useAccountContext } from '../hooks/useAccountContext'
import { useQuestionContext } from '../hooks/useQuestionContext'
import { useMenuContext } from '../hooks/useMenuContext';
import usericon from '../images/user-icon2.png'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function Tutor() {
    const [data, setData] = useState([]);
    const {account} = useAccountContext();
    const { questions, dispatch } = useQuestionContext();
    const [div1Visible, setDiv1Visible] = useState(true);
    const [div2Visible, setDiv2Visible] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [answering, setAnswering] = useState([]);
    const [showAnswering, setShowAnswering] = useState(false);
    const [answerValue, setAnswerValue] = useState("");
    const [explanationValue, setExplanationValue] = useState("");
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    const [answer2, setAnswer2] = useState(false);
    const [showAnswer2, setShowAnswer2] = useState(false);

    const [triggerUpdate, setTriggerUpdate] = useState(false);

    const { menu } = useMenuContext();

    const submittedQuestions = questions ? questions.filter(q => q.status === 'submitted') : [];
    const answeredQuestions = questions ? questions.filter(q => q.status === 'answered') : [];
    const confirmedQuestions = questions ? questions.filter(q => q.status === 'confirmed') : [];

    const handleEdit = () => {
      setEdit(true);
    }

    const handleClose = () => {
      setEdit(false);
    }

    const viewAnswer2 = (index) => {
      setAnswer2(confirmedQuestions[index]);
      console.log(answer2);
      setShowAnswer2(true);
  
    }

    const updateBio = async () => {
      var newrate = document.getElementById("newrate").value;
      var emailornum = data.emailornum;
      console.log(newrate);

      if(newrate !== "Select an option"){

        const response = await fetch('/api/tutor/update', {
          method: 'POST',
          body: JSON.stringify({ newrate, emailornum }),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const json = await response.json()
        
    
        if (!response.ok) {
         console.log(json.error)
        }
        if (response.ok) {
    
          setShowAnswering(false);
          console.log("success");
          console.log(json)
    
          setData({ ...data, rate: newrate });
          setEdit(false);
          }
        
      }else{
        alert("you must choose a rate");
      }
    }

    const closeAnswering = () => {
      setShowAnswering(false);
      setAnswerValue("");
      setExplanationValue("");
    }

    const closeAnswer = () => {
      setShowAnswer(false);
    }

    const closeAnswer2 = () => {
      setShowAnswer2(false);
    }


    const viewAnswer = (index) => {
      setAnswer(answeredQuestions[index]);
      console.log(answer);
      setShowAnswer(true);
  
    }

  const handleAnswerChange = (event) => {
    setAnswerValue(event.target.value);
    setAnswering({ ...answering, answer: event.target.value });
  };

  const handleExplanationChange = (event) => {
    setExplanationValue(event.target.value);
    setAnswering({ ...answering, explanation: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(answering);

    const response = await fetch('/api/question/answer', {
      method: 'POST',
      body: JSON.stringify(answering),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json()
    

    if (!response.ok) {
     console.log(json.error)
    }
    if (response.ok) {

      setShowAnswering(false);
      console.log("success");
      console.log(json)

      if(triggerUpdate === false){
        setTriggerUpdate(true);
        }else if(triggerUpdate === true){
          setTriggerUpdate(false);
        }
     
      }
  };

    const refuseQuestion = async (index) => {

      var answer = submittedQuestions[index];
      console.log(answer);
    
      const response = await fetch('/api/question/refund', {
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
    
      const rate = Number(json.rate);
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
    
      console.log('success');
      console.log(json2);
      if(triggerUpdate === false){
      setTriggerUpdate(true);
      }else if(triggerUpdate === true){
        setTriggerUpdate(false);
      }
      
    }
    
    const reportQuestion = async (index) => {
      var answer = submittedQuestions[index];
      console.log(answer);
      var answer = submittedQuestions[index];
      console.log(answer);
      var transactionid = answer.transactionid;
      var status = "report";
    
      const response = await fetch('/api/question/status', {
        method: 'POST',
        body: JSON.stringify({ transactionid, status }),
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
    
      const rate = Number(json.rate);
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
    
      console.log('success');
      console.log(json2);
      if(triggerUpdate === false){
      setTriggerUpdate(true);
      }else if(triggerUpdate === true){
        setTriggerUpdate(false);
      }
    }

    const answerQuestion = (index) => {
      setAnswering(submittedQuestions[index]);
      console.log(answering);
      setShowAnswering(true);
  
    }

    const logout = (e) => {
    
        e.preventDefault();
        localStorage.removeItem('tutor');
        navigate('/', { replace: true });
           
    }

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
        const it = JSON.parse(localStorage.getItem('tutor'));
        setData(it);
        console.log(data);
        console.log(data.emailornum)
      }, []);

    return (
        <>
            <Container fluid>
    <Row>
        {/* <Col className="d-none d-lg-block" md={2}> */}
        <Col className="d-none d-lg-block" md={3}>
        <Dropdown.Menu className="sidebar" show >
        <span style={{border: '1px solid orange', padding: 5, borderRadius: 5, color: 'orange'}} href="#home"><FontAwesomeIcon icon={faLaptop} />SchoolHelp</span>
        <Dropdown.Header style={{fontSize: 20, fontWeight: 'bold'}}> Hi {data.username}<br/> Lonestar Number<br /> {data.emailornum}</Dropdown.Header>
        {/* <div className="col-sm-6 px-0 d-none d-sm-block"> */}
        <div >
          <img src={usericon}
            alt="user image" style={{position: 'relative','maxWidth': '100px', 'maxHeight':'100px', left: '20%'}} />
        </div>
        <Dropdown.Item  onClick={() => {setDiv1Visible(true); setDiv2Visible(false);}}  > Questions</Dropdown.Item> 
      
      <Dropdown.Item  onClick={() => {setDiv2Visible(true); setDiv1Visible(false); }} > Profile</Dropdown.Item> 

        <a href="" onClick={(e) => logout(e)}><FontAwesomeIcon icon={faSignOutAlt} />logout</a>
      </Dropdown.Menu>
        </Col>
        
        <Col md={9}>

        {menu && 
        <Row className="stuRows d-md-block d-lg-none">
        <Col >
               <div id="menuDiv" style={{position: 'relative',width: '100%', background: 'white'}} >
        <Dropdown.Header style={{fontSize: 20, fontWeight: 'bold', position: 'relative'}}> Hi {data.username}!<br/> Lonestar Number {data.emailornum}</Dropdown.Header>

        <button eventKey="1" className="menuItem" onClick={() => {setDiv1Visible(true); setDiv2Visible(false);}}  > Questions</button> 
      
      <button eventKey="2" className="menuItem" onClick={() => {setDiv2Visible(true); setDiv1Visible(false); }} > Profile</button> 

        <a href="" onClick={(e) => logout(e)}> <FontAwesomeIcon icon={faSignOutAlt} />logout</a>
    </div>
        </Col>
        </Row>}

        {div1Visible && 
        <Row className="stuRows" style={{marginTop: '5px'}}>
         <Col>
          
          <table><tbody><tr>
            <td> <div className="paddedDiv">
            {data && <table className="accbaltbl">
              <thead>
                <tr>
                  <td>Confirmed Answers</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.questionsanswered}</td>
                </tr>
              </tbody>
            </table>}
            </div></td>
          
          
          <td>
          <div className="paddedDiv">
          {data && <table className="accbaltbl">
              <thead>
                <tr>
                  <td>Earnings</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.earnings} LRD</td>
                </tr>
              </tbody>
            </table>}
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
          <span key={index}>
                     <div key={index}>
            <p>{index + 1}.</p>
            {/* Assuming q.questionText is base64-encoded image data */}
            <img src={`data:image/jpeg;base64,${q.questionText}`} alt={`Question ${index + 1}`} fluid />
          </div>
          <table><tbody><tr><td><Button onClick={() => answerQuestion(index)}>Answer</Button></td>
          <td><Button variant="danger" onClick={() => refuseQuestion(index)}>Refuse Question</Button></td>
          <td><Button variant="outline-danger" onClick={() => reportQuestion(index)}>Report Question</Button></td>
          </tr>
          </tbody></table>
          </span>
        ))}
      </Tab>
      <Tab eventKey="answered-questions" title="Answered Questions">
        {answeredQuestions.map((q, index) => (
         <div key={index}>
         <p>{index + 1}.</p>
         <img src={`data:image/jpeg;base64,${q.questionText}`} alt={`Question ${index + 1}`} fluid />
          <Button onClick={() => viewAnswer(index)}>view answer</Button>
          </div>
        ))}
      </Tab>
      <Tab eventKey="confirmed-questions" title="Confirmed Answers">
        {confirmedQuestions.map((q, index) => (
           <div key={index}>
           <p>{index + 1}.</p>
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
        <Row className="stuRows" style={{marginTop: '5px'}}>
         <Col>
       
        {data && 
         <div className="paddedDiv2">
        <table className="resultstbl2" style={{border: 'none'}}>
          <thead><tr>
            <td>{!edit && <a href="#" onClick={handleEdit}>edit</a>}</td>
            <td>{edit &&<table><tbody><tr><td> <a href="#" onClick={handleClose}>close</a></td><td> <Button onClick={updateBio}>Submit</Button></td></tr></tbody></table>}</td>
          
          </tr></thead>
        {!edit && <tbody>
          <tr>
            <td colSpan={2}>{data.username}</td>
          </tr>
          <tr>
            <td colSpan={2}><img src={usericon} alt={data.username} width="75" height="75" /></td>
          </tr>
          <tr>
            <td colSpan={2}>Has a: {data.education}</td>
          </tr>
          <tr>
            <td colSpan={2}>Rate: ${data.rate}.00 LRD</td>
          </tr>
          
        </tbody>}

        {edit && 
        <tbody>
          <tr>
            <td colSpan={2}>{data.username}</td>
          </tr>
          <tr>
            <td colSpan={2}><img src={usericon} alt={data.username} width="75" height="75" /></td>
          </tr>
          <tr>
            <td colSpan={2}>education {data.education}</td>
          </tr>
          <tr>
            <td colSpan={2}>
            <Form.Label>Select New Rate</Form.Label>
            <Form.Control id="newrate" as="select"
              defaultValue={data.rate}
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
            </td></tr>
        </tbody>}
      </table>
      </div>
      }<br/>

      </Col>
        </Row>}

        </Col>
        </Row>
        </Container>

        <Modal show={showAnswering}>
      <Modal.Header>
        {answering && 
        <Modal.Title><img src={`data:image/jpeg;base64,${answering.questionText}`} alt="question" fluid /></Modal.Title>
        }
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Answer:</Form.Label>
            <Form.Control as="textarea" rows={3} value={answerValue} onChange={handleAnswerChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Explanation:</Form.Label>
            <Form.Control as="textarea" rows={5} value={explanationValue} onChange={handleExplanationChange} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={closeAnswering}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showAnswer}>
      <Modal.Header>
        {answer && 
        <Modal.Title><img src={`data:image/jpeg;base64,${answer.questionText}`} alt="question" fluid /></Modal.Title>
        }
      </Modal.Header>
      {answer && 
      <Modal.Body>
       <table><tbody><tr><td>Answer</td></tr>
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
            Close
          </Button>
        </Modal.Footer>
    </Modal>
  </>
  );
}

export default Tutor;