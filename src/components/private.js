import React, {useContext} from "react";
import {AuthContext} from 'context/authContext'
import {Route, Redirect} from "react-router-dom";

export default ({ children, ...rest }) => {
  const [{login}] = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        login ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}