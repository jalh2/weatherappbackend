import { createContext, useReducer } from 'react'
import React, { useEffect } from 'react';

export const StatisticsContext = createContext()

export const StatisticsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATISTICS': 
      return {
        statistics: action.payload
      }
    default:
      return state
  }
}



export const StatisticsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StatisticsReducer, {
   statistics: null
  })

  useEffect(() => {
    async function fetchStatistics() {

  
        const response = await fetch('https://schoolhelpbackend.onrender.com/api/finance/statistics', {
          method: 'POST',
        })
  
        const json = await response.json()
        if (!response.ok) {
          console.log(json.error)
        }
        if (response.ok) {
          console.log("response1")
          console.log(json);
          dispatch({ type: 'SET_STATISTICS', payload: json }) 
        
      }
    }
  
    fetchStatistics();
  }, [])


  return (
    <StatisticsContext.Provider value={{...state, dispatch}}>
      { children }
    </StatisticsContext.Provider>
  )
}