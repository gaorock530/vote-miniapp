import React, {useEffect, useRef, useCallback} from 'react'

export default ({data, index, voted}) => {
  const {name, count, percent} = data;
  const bar = useRef()
  const progress = useRef(0)
  const requestID = useRef()


  const animation = useCallback(() => {

    // constant speed
    progress.current+= (percent / 100) * 4
    // prevent overflow
    if (progress.current > 100) progress.current = 100

    if (bar.current && progress.current <= percent) {
      bar.current.style.width = progress.current + '%'
      requestID.current = requestAnimationFrame(animation)
    } else {
      cancelAnimationFrame(requestID.current)
    }
  },[percent])

  useEffect(() => {
    requestID.current = requestAnimationFrame(animation)

    return () => {
      cancelAnimationFrame(requestID.current)
    }
  }, [animation])


  return (
    <div className="voted-option">
      <div className={voted === index?"vote-result": null}>
        <span>{index !== 'undefined' && <i>{index}.</i>}{name}</span>
        <div className="vote-percentage" ref={bar}></div>
        <p>{count}-{percent}%</p>
      </div>
    </div>
  )
}
