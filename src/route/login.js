import React, {useContext} from 'react'
import {AuthContext, LOGIN} from 'context/authContext'
import {useHistory, useLocation} from 'react-router-dom'

export default () => {
  const [, dispatch] = useContext(AuthContext)
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  let login = () => {
    dispatch({type: LOGIN, payload: 'username'})
    history.replace(from);
  };

  return (
    <div>
      <button onClick={login}>Log in</button>
    </div>
  );
}