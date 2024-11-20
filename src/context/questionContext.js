import { createContext, useReducer } from 'react'
import React, { useEffect } from 'react';

export const QuestionContext = createContext()

export const QuestionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS': 
      return {
        questions: action.payload
      }
    default:
      return state
  }
}



export const QuestionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QuestionReducer, {
   questions: null
  })

  useEffect(() => {
    async function fetchQuestions() {
      const account1 = JSON.parse(localStorage.getItem('student'));
      const account2 = JSON.parse(localStorage.getItem('tutor'));
      const userid = "";
  
      if (account1) {
        const userid = account1.emailornum;
        const type = "studentnumber";
  
        const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/get', {
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
  
        const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/get', {
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
  }, [])
  


  return (
    <QuestionContext.Provider value={{...state, dispatch}}>
      { children }
    </QuestionContext.Provider>
  )
}