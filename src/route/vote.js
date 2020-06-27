import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'

import Option from 'components/option'
import Result from 'components/result'

const fakeTitle = {
  id: 1,
  title: '你最喜欢下面哪个英雄'
}

const fakeData = [
  '皮城女警',
  '寡妇制造者',
  '阿木木',
  '伊泽瑞尔'
]

let tempData = []


export default () => {
  const [voted, setVoted] = useState(-1)
  const location = useLocation()

  useEffect(() => {

    // if user has a vote history, use result mark
    const last = localStorage.getItem('last')
    if (last) {
      const lastVote = JSON.parse(last)
      if (lastVote.voted !== -1) {
        setVoted(lastVote.voted)

        // if client refreshes, data will be lost from memory, so we can restore data from localStorage
        if (tempData.length === 0) {
          const lastData = localStorage.getItem(fakeTitle.id)
          if (lastData) tempData = JSON.parse(lastData)
        }
      }
    }
  }, [])

  const onSelect = index => {
    console.log(index, fakeData[index])

    // simulate a server
    const onlineData = localStorage.getItem(fakeTitle.id)

    if (onlineData) {
      tempData = JSON.parse(onlineData)
      const total = tempData.reduce((t, c) => t + c.count, 1)
      tempData.forEach((v, no) => {
        if (no === index) v.count++
        v.percent = Math.floor((v.count / total)*1000) / 10
      })

    } else {
      fakeData.forEach((v, no) => {
        tempData.push({name: v, count: no === index?1:0, percent: no === index?100:0})
      })
      
    }
    localStorage.setItem(fakeTitle.id, JSON.stringify(tempData))
    localStorage.setItem('last', JSON.stringify({pathname: location.pathname, voted: index}))

    // update state
    setVoted(index)
  }

  const renderOptions = data => data.map((option, index) => <Option key={index} title={option} index={index} onSelect={onSelect}/>)
  const renderResults = data => data.map((option, index) => <Result key={index} data={option} index={index} voted={voted} />)

  return (
    <div className="wrapper">
      <p className="vote-title">{fakeTitle.title}？</p>
      {voted === -1?renderOptions(fakeData):renderResults(tempData)}
    </div>
  )
}