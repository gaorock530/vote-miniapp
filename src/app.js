import React from 'react'
import {AuthProvider} from 'context/authContext'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Private from 'components/private'

import Header from 'components/header'
import Welcome from 'route/welcome'
import Login from 'route/login'
import Vote from 'route/vote'
import Create from 'route/create'

export default () => {
  


  return (
    <AuthProvider>
      <Router>
        <Header/>
        <Switch>
          
          <Route exact path="/"><Welcome/></Route>
          <Route exact path="/vote/:id"><Vote/></Route>
          <Route exact path="/login"><Login/></Route>
          <Private exact path="/create"><Create/></Private>
          
        </Switch>
      </Router>
    </AuthProvider>
    
  )
}