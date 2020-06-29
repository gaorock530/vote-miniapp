import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import Option from 'components/option'
import Result from 'components/result'


export default () => {
  const [votedData, setVotedData] = useState({title: '', options: [], voted: -1})
  const {id} = useParams()

  useEffect(() => {
    // loading vote
    const loadVote = localStorage.getItem(id)
    if (loadVote) {
      const parsedVote = JSON.parse(loadVote)
      setVotedData(parsedVote)
    }
  }, [id])

  const onSelect = index => {
    // pre process data
    votedData.options.map(op => {
      if (!op.count) op.count = 0
      if (!op.percent) op.percent = 0
      return op
    })
    // get total count
    const total = votedData.options.reduce((c, v) => c + v.count, 1)

    // calculate percentage for each vote
    const tempOptions = votedData.options.map((v, no) => {
      if (no === index) v.count++
      v.percent = Math.floor((v.count / total)*1000) / 10
      return v
    })
   
    // form new data
    const newData = {...votedData, options: tempOptions, voted: index}
    // update state
    setVotedData(newData)
    // update localstorage
    localStorage.setItem(id, JSON.stringify(newData))
    localStorage.setItem('last', id)
  }


  const renderOptions = data => data.map((option, index) => <Option key={option.id} title={option.name} index={index} onSelect={onSelect}/>)
  const renderResults = data => data.map((option, index) => <Result key={option.id} data={option} index={index} voted={votedData.voted} />)
  /**
   * {id, title: titleValue, options: state, voted: -1}
   */
  return (
    <div className="wrapper">
      <p className="vote-title">{votedData.title}？</p>
      {votedData.voted === -1?renderOptions(votedData.options):renderResults(votedData.options)}
    </div>
  )
}
// {"id":"ckc0lhfzk000b3b5v9d710hf2","title":"你们最喜欢的召唤师是谁？","options":[{"id":"ckc0lggzm00043b5vd62lvn3a","name":"伊泽瑞尔","count":5,"percent":0},{"id":"ckc0lgp7u00063b5v6mwzg9x9","name":"寡妇制造者","count":3,"percent":0},{"id":"ckc0lgwsy00083b5v8kui4q2r","name":"熔岩巨兽","count":32,"percent":100},{"id":"ckc0lha02000a3b5vug5b7io0","name":"皮城女警","count":15,"percent":0}],"voted":-1}