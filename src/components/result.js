import React, {useEffect, useRef, useCallback} from 'react'

export default ({data, index, voted}) => {
  const {name, count, percent} = data;
  const bar = useRef()
  const progress = useRef(0)

  const animation = useCallback(() => {
    console.log('change:', progress.current)
    // constant speed
    progress.current+= (percent / 100) * 4
    if (progress.current < percent) {
      bar.current.style.width = progress.current + '%'
      requestAnimationFrame(animation)
    }
  },[percent])

  useEffect(() => {
    requestAnimationFrame(animation)
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
