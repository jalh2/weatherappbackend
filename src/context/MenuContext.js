import { createContext, useReducer } from 'react'
import React, { useEffect } from 'react';

export const MenuContext = createContext()

export const MenuReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MENU': 
      return {
        menu: action.payload
      }
    default:
      return state
  }
}



export const MenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MenuReducer, {
   menu: true
  })


  return (
    <MenuContext.Provider value={{...state, dispatch}}>
      { children }
    </MenuContext.Provider>
  )
}