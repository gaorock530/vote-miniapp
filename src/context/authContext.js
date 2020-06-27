import React, {useReducer} from 'react'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_USER = 'SET_USER'

export const AuthContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {login: true, user: action.payload}
    case LOGOUT:
      return {login: false, user: null}
    case SET_USER:
      return {...state, user: action.payload}
    default: 
      return state
  }
}

const defaultStore = {
  login: false, 
  user: null
}

export const AuthProvider = ({children}) => {

  const store = useReducer(reducer, defaultStore)

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  )
}
