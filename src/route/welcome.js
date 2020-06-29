import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

export default () => {
  const [last, setLast] = useState(false)
  const history = useHistory()
  const onRecent = () => {
    history.push({pathname: `/vote/${last}`})
  }

  useEffect(() => {
    const lastVoteID = localStorage.getItem('last')
    if (lastVoteID) {
      const lastVote = localStorage.getItem(lastVoteID)
      if (lastVote) {
        const data = JSON.parse(lastVote)
        setLast(lastVoteID)
      }
    }
  }, [])





  return (
    <div className="home">
      <h2>Welcome to Vote APP</h2>
      <h3>欢迎使用免费投票工具</h3>
      <Link to="/create">创建投票</Link>
      {last && <>
        <h5>或者</h5>
        <button onClick={onRecent}>查看最近投票</button>
      </>}
      
      
    </div>
  )
}