import { createContext, useReducer } from 'react'
import React, { useEffect } from 'react';

export const ReportedContext = createContext()

export const ReportedReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REPORTED': 
      return {
        reported: action.payload
      }
    default:
      return state
  }
}



export const ReportedContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReportedReducer, {
   reported: null
  })

  useEffect(() => {
    async function fetchReported() {
     
  
        const response = await fetch('https://schoolhelpbackend.onrender.com/api/question/reported', {
          method: 'POST',
        })
  
        const json = await response.json()
        if (!response.ok) {
          console.log(json.error)
        }
        if (response.ok) {
          console.log("reported")
          console.log(json);
          dispatch({ type: 'SET_REPORTED', payload: json }) 
        }
      
   
    }
  
    fetchReported();
  }, [])
  


  return (
    <ReportedContext.Provider value={{...state, dispatch}}>
      { children }
    </ReportedContext.Provider>
  )
}