import React from 'react'

export default ({title = 'default', index, onSelect}) => {

  const onClick = () => {
    onSelect(index)
  }

  return (
    <div className="vote-option" onClick={onClick}>
      <span>{index !== 'undefined' && <i>{index}.</i>}{title}</span>
    </div>
  )
}