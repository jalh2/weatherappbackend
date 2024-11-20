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
import { ScaleLoader } from 'react-spinners';
import { css } from '@emotion/react';


function ControlPanel() {
    const [data, setData] = useState([]);
    const [expertise, setExpertise] = useState("");
    const {account} = useAccountContext();
    const { reviews, dispatch } = useReviewContext();
    const [isLoading, setIsLoading] = useState(false);

    const [answer, setAnswer] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const [reportee, setReportee] = useState(false);
    const [showReported, setShowReported] = useState(false);

    const [statusuuid, setStatusUuid] = useState("");
    const [statusaccessToken, setStatusAccessToken] = useState("");

    const [div1Visible, setDiv1Visible] = useState(true);
    const [div2Visible, setDiv2Visible] = useState(false);
    const [div3Visible, setDiv3Visible] = useState(false);
    
    const {statistics} = useStatisticsContext();
    const { reported } = useReportedContext();

    const [result, setResult] = useState("");
    const [resultX, setResultX] = useState("");
    const [result2, setResult2] = useState("");
    const [result3, setResult3] = useState("");
    const [result4, setResult4] = useState("");
    const [result5, setResult5] = useState("");
    const [result6, setResult6] = useState("");

    const [triggerUpdate, setTriggerUpdate] = useState(false);

    const { menu } = useMenuContext();
    // const [triggerUpdate2, setTriggerUpdate2] = useState(false);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
    
    const navigate = useNavigate();

    const calculateDisbursements = async () => {
      setIsLoading(true);
      setResult("")
      setResultX("")
      const responseX = await fetch('https://schoolhelpbackend.onrender.com/api/question/getanswered', {
        method: 'POST',
      })
      const jsonX = await responseX.json()
      
      if (!responseX.ok) {
       console.log(jsonX.error);
       return;
      }
      
        setResult(jsonX)
        console.log(jsonX);
        const data = jsonX;
        var pushvar = [];
      data?.map( async (result) => {
          var transactionid = result.transactionid;
          var studentnumber = result.studentnumber;
          var tutornumber = result.teachernumber;
        if(result.timeanswered !== undefined){
         var timeanswered = new Date(result.timeanswered);
         const currentDate = new Date();
         const timeDifference = Math.abs(currentDate - timeanswered);
         const hoursDifference = timeDifference / (1000 * 60 * 60);
         const isMoreThan24Hours = hoursDifference >= 24;

          if(isMoreThan24Hours === true){
              
      const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/confirm', {
        method: 'POST',
        body: JSON.stringify({ transactionid }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();
    
      if (!response.ok) {
        console.log(json.error);
        setIsLoading(false);
        return;
      }
    
      console.log('success');
      console.log(json);
    
      const rate = Number(json.rate);
      const disbursementAmount = rate * 0.8;
    
      const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/finance/disbursement', {
        method: 'POST',
        body: JSON.stringify({ disbursementAmount }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json2 = await response2.json();
    
      if (!response2.ok) {
        console.log(json2.error);
        setIsLoading(false);
        return;
      }
    
      pushvar.push(json2);

      var increment = "answersreceived";
    
      const response3 = await fetch('https://schoolhelpbackend.onrender.com/api/student/increment', {
        method: 'POST',
        body: JSON.stringify({ studentnumber, increment }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json3 = await response3.json();
    
      if (!response3.ok) {
        console.log(json3.error);
        setIsLoading(false);
        return;
      }
    
      console.log('success');
      console.log(json3);

      var earnings = disbursementAmount;

      const response4 = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/increment', {
        method: 'POST',
        body: JSON.stringify({ tutornumber, earnings }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json4 = await response4.json();
    
      if (!response4.ok) {
        console.log(json4.error);
        setIsLoading(false);
        return;
      }
    
      console.log('success');
      console.log(json4);
      setIsLoading(false);
     
          }
        }


      });
      setResultX(pushvar);
    
    }

    const calculateRefunds = async () => {
      setResult("");
      setResultX("");
      setIsLoading(true);
      const responseX = await fetch('https://schoolhelpbackend.onrender.com/api/question/submitted', {
        method: 'POST',
      })
      const jsonX = await responseX.json()
      
      if (!responseX.ok) {
       console.log(jsonX.error);
       setIsLoading(false);
       return;
      }
      
        setResult(jsonX)
        console.log(jsonX);
        const data = jsonX;
        var pushvar = [];

      data?.map( async (result) => {
        
        var transactionid = result.transactionid;
        
     
         if(result.timeasked !== undefined){
          var timeasked = new Date(result.timeasked);
         const currentDate = new Date();
         const timeDifference = Math.abs(currentDate - timeasked);
         const hoursDifference = timeDifference / (1000 * 60 * 60);
         const isMoreThan24Hours = hoursDifference >= 24;

            if(isMoreThan24Hours === true){
            
              const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/refund', {
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
            
              const rate = Number(json.rate);
              const disbursementAmount = rate * 0.8;
            
              const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/finance/disbursement', {
                method: 'POST',
                body: JSON.stringify({ disbursementAmount }),
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              const json2 = await response2.json();
            
              if (!response2.ok) {
                console.log(json2.error);
                setIsLoading(false);
                return;
              }
            
              setIsLoading(false);
              console.log('success');
              console.log(json2);

              
              pushvar.push(json2);

              
            }
         }


      });
      setResultX(pushvar);
    }

    const awardStudent = async () => {
      console.log(answer);
      setIsLoading(true);
    
      const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/refund', {
        method: 'POST',
        body: JSON.stringify({transactionid: answer.transactionid}),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();
    
      if (!response.ok) {
        console.log(json.error);
        setIsLoading(false);
        return;
      }
    
      console.log('success');
      console.log(json);
    
      const rate = Number(json.rate);
      const disbursementAmount = rate * 0.8;
    
      const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/finance/disbursement', {
        method: 'POST',
        body: JSON.stringify({ disbursementAmount }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json2 = await response2.json();
    
      if (!response2.ok) {
        console.log(json2.error);
        setIsLoading(false);
        return;
      }

      if (response2.ok) {

        console.log('success');
      console.log(json2);

        // setIsLoading(false);
  
        const response3 = await fetch('https://schoolhelpbackend.onrender.com/api/student/get', {
          method: 'POST',
          body: JSON.stringify({userid:answer?.studentnumber}),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const json3 = await response3.json()
        
    
        if (!response3.ok) {
         console.log(json2.error)
         setIsLoading(false);
        }
        if (response3.ok) {
    
          if(json3?.pushtoken){
            const sendPushNotification = await fetch('https://schoolhelpbackend.onrender.com/api/admin/sendpushnotification1', {
              method: 'POST',
              body: JSON.stringify({ token: json3?.pushtoken, username: json3?.username}),
              headers: {
                'Content-Type': 'application/json',
              }
            });
            const json0 = await sendPushNotification.json();
      
            if (!sendPushNotification.ok) {
              console.log(sendPushNotification.error);
              return;
            }
      
            if (sendPushNotification.ok) {
              console.log("notification success");
            }
          } else {
            console.log("no push token");
          }
         
          setIsLoading(false);
        console.log("success3");
        console.log(json3)
      
        }
      }
    
      
      setTriggerUpdate(true);
      setShowAnswer(false);
    }

  //   const sendPushNotification = async (token, username) => {
  //     console.log("push notification function ran...");
  //   const message = {
  //     to: token,
  //     sound: "default",
  //     title: "schoolhelpliberia",
  //     body: `${username} Your question was reviewed and you won. Your money will be refudeded shortly`,
  //   };
  
  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       host: "exp.host",
  //       accept: "application/json",
  //       "accept-encoding":"gzip, deflate",
  //       "content-type":"application/json",
  //     },
  //     body: JSON.stringify(message),
  //   })
  // }


    const awardTutor = async () => {
      console.log(answer);
      setIsLoading(true);
      const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/confirm', {
        method: 'POST',
        body: JSON.stringify({transactionid: answer.transactionid}),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await response.json();
    
      if (!response.ok) {
        console.log(json.error);
        setIsLoading(false);
        return;
      }
    
      console.log('success');
      console.log(json);
      var studentnumber = json.studentnumber;
      var tutornumber = json.teachernumber;
      
      const rate = Number(json.rate);
      const disbursementAmount = rate * 0.8;
    
      const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/finance/disbursement', {
        method: 'POST',
        body: JSON.stringify({ disbursementAmount }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json2 = await response2.json();
    
      if (!response2.ok) {
        console.log(json2.error);
        setIsLoading(false);
        return;
      }
    
      console.log('success');
      console.log(json2);

      var increment = "answersreceived";
    
      const response3 = await fetch('https://schoolhelpbackend.onrender.com/api/student/increment', {
        method: 'POST',
        body: JSON.stringify({ studentnumber, increment }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json3 = await response3.json();
    
      if (!response3.ok) {
        console.log(json3.error);
        setIsLoading(false);
        return;
      }
    
      console.log('success');
      console.log(json3);

      var earnings = disbursementAmount;

      const response4 = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/increment', {
        method: 'POST',
        body: JSON.stringify({ tutornumber, earnings }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json4 = await response4.json();
    
      if (!response4.ok) {
        console.log(json4.error);
        setIsLoading(false);
        return;
      }
    

      if (response4.ok) {

        console.log('success');
        console.log(json4);
  
        const response5 = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/get', {
          method: 'POST',
          body: JSON.stringify({userid:answer?.teachernumber}),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const json5 = await response5.json()
        
    
        if (!response5.ok) {
         console.log(json5.error);
         setIsLoading(false);
        }
        if (response5.ok) {
    
          if(json5?.pushtoken){
            const sendPushNotification = await fetch('https://schoolhelpbackend.onrender.com/api/admin/sendpushnotification1', {
              method: 'POST',
              body: JSON.stringify({ token: json5?.pushtoken, username: json5?.username}),
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
        console.log("success5");
        console.log(json5)
         
        }
      }

      setTriggerUpdate(true);
      setShowAnswer(false);
    
    }

    const logout = (e) => {
    
        e.preventDefault();
        localStorage.removeItem('admin');
        
        navigate('/Admin', { replace: true });
           
    }

    const closeAnswer = () => {
      setShowAnswer(false);
    }
    
    const closeReportee = () => {
      setShowReported(false);
    }

    const viewAnswer = (index) => {
      setAnswer(reviews[index]);
      console.log(answer);
      setShowAnswer(true);
  
    }
    
    const viewQuestion = (index) => {
      setReportee(reported[index]);
      console.log(answer);
      setShowReported(true);
  
    }

    const search = (e) => {
    
        e.preventDefault();
        navigate(`/ResultsPage/${expertise}`);
           
    }

    useEffect(() => {
        const it = JSON.parse(localStorage.getItem('admin'));
        setData(it);
        console.log(data);
        console.log(account)
      }, []);

      useEffect(() => {
        async function fetchReviews() {
         
          
            const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/review', {
              method: 'POST',
            })
      
            const json = await response.json()
            if (!response.ok) {
              console.log(json.error)
            }
            if (response.ok) {
              console.log("response1")
              console.log(json);
              dispatch({ type: 'SET_REVIEWS', payload: json }) 
              setTriggerUpdate(false);
             
            }
          
       
        }
      
        fetchReviews();
      }, [triggerUpdate])

      // useEffect(() => {
      //   async function fetchReported() {
         
      
      //       const response = await fetch('/api/question/reported', {
      //         method: 'POST',
      //       })
      
      //       const json = await response.json()
      //       if (!response.ok) {
      //         console.log(json.error)
      //       }
      //       if (response.ok) {
      //         console.log("reported")
      //         console.log(json);
      //         dispatch({ type: 'SET_REPORTED', payload: json }) 
      //       }
          
       
      //   }
      
      //   fetchReported();
      // }, [triggerUpdate2])


      const dispurseMoney = async () => {

        setResultX("");
        setResult("");
        setResult2("");
        setResult3("");
        setResult4("");
        setResult5("");
        setResult6("");
        setIsLoading(true);

        const responseX = await fetch('https://schoolhelpbackend.onrender.com/api/question/getAllConfirmed', {
          method: 'POST',
        })
        const jsonX = await responseX.json()
        
        if (!responseX.ok) {
         console.log(jsonX.error)
         setIsLoading(false);
         return;
        }
        if (responseX.ok) {
          setResult(jsonX)
          console.log(jsonX);
          const data = jsonX;
  
        data?.map( async (result) => {
           var transactionid = result.transactionid;
           var externalId = result.transactionid;
           var partyId = result.teachernumber;
           var amount = result.rate;
            console.log(result);
          
        
        const response = await fetch('https://schoolhelpbackend.onrender.com/api/disbursement/createUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
        
        if (!response.ok) {
         console.log(json.error)
         setIsLoading(false);
         return;
        }
        if (response.ok) {
          setResult(json)
          console.log(json);
         const id = json.id;
         console.log(id);
        
          const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/disbursement/createKey', {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json2 = await response2.json()
        
        if (!response2.ok) {
         console.log(json2.error);
         setIsLoading(false);
         return;
        }
        if (response2.ok) {
  
          setResult2(json2)
  
          const id = json2.id;
          const apiKey = json2.apiKey;
          console.log(id);
          console.log(apiKey);
         
           const response3 = await fetch('https://schoolhelpbackend.onrender.com/api/disbursement/getOauth', {
           method: 'POST',
           body: JSON.stringify({ id, apiKey }),
           headers: {
             'Content-Type': 'application/json'
           }
         })
         const json3 = await response3.json()
         
         if (!response3.ok) {
          console.log(json3.error);
          setIsLoading(false);
          return;
         }
         if (response3.ok) {
   
           setResult3(json3);
           
  
          const accessToken = json3.access_token;
          console.log(accessToken);
          
           const response4 = await fetch('https://schoolhelpbackend.onrender.com/api/disbursement/disburse', {
           method: 'POST',
           body: JSON.stringify({ accessToken, externalId, amount, partyId }),
           headers: {
             'Content-Type': 'application/json'
           }
         })
         const json4 = await response4.json()
         
         if (!response4.ok) {
          console.log(json4.error);
          setIsLoading(false);
          return;
         }
         if (response4.ok) {
   
           setResult4(json4)

           const response5 = await fetch('https://schoolhelpbackend.onrender.com/api/question/payed', {
            method: 'POST',
            body: JSON.stringify({ transactionid }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const json5 = await response5.json()
          
          if (!response5.ok) {
           console.log(json5.error);
           setIsLoading(false);
           return;
          }
          if (response5.ok) {
    
            setResult5(json5)

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
            
              console.log('disbursement balance decremented');
              console.log(json6);
            
              setResult6(json6);
              setIsLoading(false);
            
            }       
           
           }       
           
           }       
          
        }       
      }
    });
    }
}

const getStatus = async () => {
      
  setResultX("");
  setResult("");
  setResult2("");
  setResult3("");
  setResult4("");
  setResult5("");
  setResult6("");
  setIsLoading(true);

  const response = await fetch('https://schoolhelpbackend.onrender.com/api/finance/status', {
    method: 'POST',
    body: JSON.stringify({ statusuuid, statusaccessToken }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  
  if (!response.ok) {
   console.log(json.error);
   setIsLoading(false);
   return;
  }
  if (response.ok) {
    setResult(json)
    console.log(json);
   const statustransactionid = json.externalId;
   const statusstatus = json.status;
   console.log(statustransactionid);
   console.log(statusstatus);
  
    const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/question/update', {
    method: 'POST',
    body: JSON.stringify({ statustransactionid, statusstatus }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json2 = await response2.json()
  
  if (!response2.ok) {
   console.log(json2.error);
   setIsLoading(false);
   return;
  }
  if (response2.ok) {

    setResult2(json2)

    var studentnumber = json2.studentnumber
    var increment = "questionsasked";
    const response3 = await fetch('https://schoolhelpbackend.onrender.com/api/student/increment', {
      method: 'POST',
      body: JSON.stringify({ studentnumber, increment }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json3 = await response3.json()
    
    if (!response3.ok) {
     console.log(json3.error);
     setIsLoading(false);
     return;
    }
    if (response3.ok) {
  
      setResult3(json3)
      setIsLoading(false);
     
  
    } 

  } 
}      
}


const refundMoney = async () => {

  setResultX("");
  setResult("");
  setResult2("");
  setResult3("");
  setResult4("");
  setResult5("");
  setResult6("");

  setIsLoading(false);
 

  const responseX = await fetch('https://schoolhelpbackend.onrender.com/api/question/getrefunds', {
    method: 'POST',
  })
  const jsonX = await responseX.json()
  
  if (!responseX.ok) {
   console.log(jsonX.error);
   setIsLoading(false);
   return;
  }
  if (responseX.ok) {
    setResult(jsonX)
    console.log(jsonX);
    const data = jsonX;

  data?.map( async (result) => {
     var transactionid = result.transactionid;
     var externalId = result.transactionid;
     var partyId = result.teachernumber;
     var amount = result.rate;
      console.log(result);
    
  
  const response = await fetch('https://schoolhelpbackend.onrender.com/api/disbursement/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()
  
  if (!response.ok) {
   console.log(json.error);
   setIsLoading(false);
   return;
  }
  if (response.ok) {
    setResult(json)
    console.log(json);
   const id = json.id;
   console.log(id);
  
    const response2 = await fetch('https://schoolhelpbackend.onrender.com/api/disbursement/createKey', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json2 = await response2.json()
  
  if (!response2.ok) {
   console.log(json2.error);
   setIsLoading(false);
   return;
  }
  if (response2.ok) {

    setResult2(json2)

    const id = json2.id;
    const apiKey = json2.apiKey;
    console.log(id);
    console.log(apiKey);
   
     const response3 = await fetch('https://schoolhelpbackend.onrender.com/api/disbursement/getOauth', {
     method: 'POST',
     body: JSON.stringify({ id, apiKey }),
     headers: {
       'Content-Type': 'application/json'
     }
   })
   const json3 = await response3.json()
   
   if (!response3.ok) {
    console.log(json3.error);
    setIsLoading(false);
    return;
   }
   if (response3.ok) {

     setResult3(json3);
     

    const accessToken = json3.access_token;
    console.log(accessToken);
    
     const response4 = await fetch('https://schoolhelpbackend.onrender.com/api/disbursement/disburse', {
     method: 'POST',
     body: JSON.stringify({ accessToken, externalId, amount, partyId }),
     headers: {
       'Content-Type': 'application/json'
     }
   })
   const json4 = await response4.json()
   
   if (!response4.ok) {
    console.log(json4.error);
    setIsLoading(false);
    return;
   }
   if (response4.ok) {

     setResult4(json4)

     const response5 = await fetch('https://schoolhelpbackend.onrender.com/api/question/cancel', {
      method: 'POST',
      body: JSON.stringify({ transactionid }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json5 = await response5.json()
    
    if (!response5.ok) {
     console.log(json5.error);
     setIsLoading(false);
     return;
    }
    if (response5.ok) {

      setResult5(json5)

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
      
        console.log('disbursement balance decremented');
        console.log(json6);
      
        setResult6(json6);
        setIsLoading(false);
      
      }       
     
     }       
     
     }       
    
  }       
}
});
}
}


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
        <Dropdown.Item onClick={() =>   navigate('/TutorManagement', { replace: true })}  > Manage Tutors</Dropdown.Item> 
        <Dropdown.Item onClick={() =>   navigate('/FundsManagement', { replace: true })}  > Manage Funds</Dropdown.Item> 
        <Dropdown.Item onClick={() =>   navigate('/ManualDisbursement', { replace: true })}  > Manual Disbursements</Dropdown.Item> 
        <Dropdown.Item onClick={() => {setDiv1Visible(true); setDiv2Visible(false); setDiv3Visible(false); }}  > Disbursements</Dropdown.Item> 
      
      <Dropdown.Item onClick={() => {setDiv2Visible(true); setDiv1Visible(false); setDiv3Visible(false);  }} > Reviews</Dropdown.Item> 
      <Dropdown.Item onClick={() => {setDiv3Visible(true); setDiv1Visible(false); setDiv2Visible(false); }} > Reported</Dropdown.Item> 

        <a href="" onClick={(e) => logout(e)}> <FontAwesomeIcon icon={faSignOutAlt} />logout</a>
    </Dropdown.Menu>
        </Col>
        
        <Col md={9}>

        {menu && 
        <Row className="stuRows d-md-block d-lg-none">
        <Col >
        <div id="menuDiv" style={{position: 'relative',width: '100%', background: 'white'}} >
        <Dropdown.Header style={{fontSize: 20, fontWeight: 'bold', position: 'relative'}}> Hi {data.emailornum}</Dropdown.Header>

        <button className="menuItem2" onClick={() => {navigate('/TutorManagement', { replace: true })}} > Manage Tutors</button> 
        <button className="menuItem2" onClick={() => {navigate('/FundsManagement', { replace: true })}} > Manage Funds</button> 
        <button className="menuItem2" onClick={() => {navigate('/ManualDisbursement', { replace: true })}} > Manual Disbursements</button> 
        <button className="menuItem2" onClick={() => {setDiv1Visible(true); setDiv2Visible(false); setDiv3Visible(false); }}  > Disbursements</button> 
      
      <button className="menuItem2" onClick={() => {setDiv2Visible(true); setDiv1Visible(false); setDiv3Visible(false);  }} > Reviews</button> 
      
      <button className="menuItem2" onClick={() => {setDiv3Visible(true); setDiv1Visible(false); setDiv2Visible(false); }} > Reported</button> 

        <a href="" onClick={(e) => logout(e)}> <FontAwesomeIcon icon={faSignOutAlt} />logout</a>
    </div>
        </Col>
        </Row>}
        

        {div1Visible &&     
        <Row className="stuRows">
          <Col>
          <div className="paddedDiv">
            <table className="accbaltbl">
              <thead>
                <tr>
                  <td>Disbursement Balance</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                 {statistics && <td>{statistics[0].disbursementAmount}LRD</td> }
                </tr>
              </tbody>
            </table>
            </div>
          </Col>
        </Row>}

        {div1Visible &&   
        <Row className="stuRows">
          <Col>
          <table><tbody><tr><td>
          <FormControl type="text"
        value={statusuuid}
        onChange={(e) => setStatusUuid(e.target.value)}
        placeholder="requesttopay uuid" /></td>
        <td>
          <FormControl type="text"
        value={statusaccessToken}
        onChange={(e) => setStatusAccessToken(e.target.value)}
        placeholder="access token" /></td>
        <td>
        <Button variant="secondary" onClick={getStatus}>Get Status</Button>
        </td></tr></tbody></table>
          </Col>
        </Row>}

       
        {div1Visible &&  
       <Row className="stuRows">
        <Col>
        <table><tbody>
        <tr>
        <td><Button variant="outline-danger" onClick={calculateDisbursements}>Calculate Disbursements</Button></td>
        
        <td><Button variant="outline-danger" onClick={calculateRefunds}>Calculate Refunds</Button></td>
        </tr>  
        <tr>
        <td>
       <Button variant="danger"  onClick={dispurseMoney}>Initiate Disbursements</Button>
       </td>
       <td>
       <Button variant="danger" onClick={refundMoney}>Initiate Refunds</Button>
       </td>
       </tr>
       <tr><td colSpan={2}>
        <div>
        {resultX && <p>{JSON.stringify(resultX)}</p>}
        {result && <p>{JSON.stringify(result)}</p>}
        {result2 && <p>{JSON.stringify(result2)}</p>}
        {result3 && <p>{JSON.stringify(result3)}</p>}
        {result4 && <p>{JSON.stringify(result4)}</p>}
        {result5 && <p>{JSON.stringify(result5)}</p>}
        {result6 && <p>{JSON.stringify(result6)}</p>}
        </div>
        </td></tr>
       </tbody></table>
       </Col>
       </Row>}

       {div2Visible &&        
       <Row className="stuRows">
        <Col>
        <Tabs defaultActiveKey="reviews">
      <Tab eventKey="reviews" title="Reviews">
        {reviews?.map((q, index) => (
         <div key={index}>
           <p>{index + 1}. </p>
         <img src={`data:image/png;base64,${q.questionText}`} alt={`Question ${index + 1}`} style={{ width: '100px', height: '100px' }} />

          <Button variant="danger" onClick={() => viewAnswer(index)}>review question</Button>
          </div>
        ))}
      </Tab>
    </Tabs>
       </Col>
       </Row>}


       {div3Visible &&        
       <Row className="stuRows">
        <Col>
        <Tabs defaultActiveKey="reported">
      <Tab eventKey="reported" title="Reported">
        {reported?.map((q, index) => (
          <span key={index}>
            <p>{index + 1}. </p>
         <img src={`data:image/png;base64,${q.questionText}`} alt={`Question ${index + 1}`} style={{ width: '100px', height: '100px' }} />
          <Button variant="danger" onClick={() => viewQuestion(index)}>review</Button>
          </span>
        ))}
      </Tab>
    </Tabs>
       </Col>
       </Row>}

        
        </Col>
        </Row>
        </Container>

        <Modal show={showAnswer} backdrop={false} style={{zIndex: '2'}} >
      <Modal.Header>
        
        <Modal.Title>{answer &&  (<img src={`data:image/png;base64,${answer.questionText}`} style={{ width: '100%', height: '300px'}}  />)}</Modal.Title>
       
      </Modal.Header>
      {answer && 
      <Modal.Body>
         {isLoading &&    <div style={{ textAlign: 'center', width: '100%' }}>
            <ScaleLoader css={override} color={'#000000'} loading={true} size={150} />
          </div>}
       <table><tbody><tr><td>Answer</td></tr>
       <tr><td>{answer.answer}</td></tr>
       <tr><td>Explanation</td></tr>
       <tr><td>{answer.explanation}</td></tr>
       
       <tr><td><Button variant="primary" onClick={awardStudent}>Award Student</Button></td><td><Button variant="success" onClick={awardTutor}>Award Tutor</Button></td></tr>
       </tbody></table>
       </Modal.Body>}
      <Modal.Footer>
          <Button variant="secondary" onClick={closeAnswer}>
            Cancel
          </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showReported} backdrop={false} style={{zIndex: '2'}}>
      <Modal.Header>
        {reportee && 
        <Modal.Title> <img src={`data:image/png;base64,${reportee.questionText}`} alt="reportee question" style={{ width: '100px', height: '100px' }} /></Modal.Title>
        }
      </Modal.Header>
      {answer && 
      <Modal.Body>
        {isLoading &&    <div style={{ textAlign: 'center', width: '100%' }}>
            <ScaleLoader css={override} color={'#000000'} loading={true} size={150} />
          </div>}
       <table><tbody>
       
       <tr><td><Button variant="primary" >Refund</Button></td><td><Button variant="success" >Refund &amp; Delete</Button></td></tr>
       </tbody></table>
       </Modal.Body>}
      <Modal.Footer>
          <Button variant="secondary" onClick={closeReportee}>
            Cancel
          </Button>
        </Modal.Footer>
    </Modal>

   {isLoading && <PopupLoading style={{zIndex: '9999'}} />}
        
  </>
  );
}

export default ControlPanel;