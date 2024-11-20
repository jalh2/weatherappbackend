import { createContext, useReducer } from 'react'
import React, { useEffect } from 'react';

export const ReviewContext = createContext()

export const ReviewReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REVIEWS': 
      return {
        reviews: action.payload
      }
    default:
      return state
  }
}



export const ReviewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReviewReducer, {
   reviews: null
  })

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
        }
      
   
    }
  
    fetchReviews();
  }, [])
  


  return (
    <ReviewContext.Provider value={{...state, dispatch}}>
      { children }
    </ReviewContext.Provider>
  )
}