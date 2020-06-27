import React, {useContext} from 'react'
import {AuthContext, LOGOUT} from 'context/authContext'
import {Link} from "react-router-dom";

export default () => {
  const [state, dispatch] = useContext(AuthContext)

  const logout = () => {
    dispatch({type: LOGOUT})
  }

  return (
    <header>
      <div>
        <Link to="/">主页</Link>
        <Link to="/create">创建投票</Link>
      </div>
      <section>{state.login?<button onClick={logout}>注销</button>:<Link to="/login">登录</Link>}</section>
      
    </header>
  )
}