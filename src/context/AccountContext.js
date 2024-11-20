import { createContext, useReducer } from 'react'
import React, { useEffect } from 'react';

export const AccountContext = createContext()

export const AccountReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT': 
      return {
        account: action.payload
      }
    default:
      return state
  }
}



export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AccountReducer, {
   account: null
  })


  useEffect(() => {
    async function fetchAccount() {
      const account1 = JSON.parse(localStorage.getItem('student'));
      const account2 = JSON.parse(localStorage.getItem('tutor'));
        
      if (account1) {
        const userid = account1.emailornum;
         
        const response = await fetch('https://schoolhelpbackend.onrender.com/api/student/get', {
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
         
        const response = await fetch('https://schoolhelpbackend.onrender.com/api/tutor/get', {
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
  }, [])


  return (
    <AccountContext.Provider value={{...state, dispatch}}>
      { children }
    </AccountContext.Provider>
  )
}