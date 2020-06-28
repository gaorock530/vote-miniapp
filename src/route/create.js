import React, {useReducer} from 'react'
import cuid from 'cuid'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {id: cuid(), v: ''}]
    case 'DEL':
      return state.filter(op => op.id !== action.id)
    case 'CHA':
      return state.map(op => {
        if (op.id === action.id) op.v = action.v
        return op
      })
    default:
      return state
  }
}

export default () => {

  const [state, dispatch] = useReducer(reducer, [])

  const add = () => dispatch({type: 'ADD'})

  const onChange = (id, e) => dispatch({type: 'CHA', id, v: e.target.value})

  const onDel = id => dispatch({type: 'DEL', id})

  // useEffect(() => {
  //   console.log(state)
  // })

  const create = () => {
    let valid = true
    console.log(state)
    if (state.length < 2) return
    for (let op of state) {
      if (op.v.trim() === '') {
        valid = false
        break
      }
      
    }

    if (!valid) return;

    console.log('Published!')

  }

  return (
    <div className="wrapper create">
      <label>
        标题：
        <input type="text" name="title" style={{width: '100%'}}/>
      </label>
      <div className="create-vote-type">
        <label htmlFor="huey1"><input type="radio" id="huey1" name="drone" value="huey" defaultChecked />单选</label>
        <label htmlFor="huey2"><input type="radio" id="huey2" name="drone" value="huey" />多选</label>
      </div>
      <div className="create-vote-option">
        {state.map((op, index) => <Option key={op.id} op={op} index={index} onChange={onChange} onDel={onDel}/>)}
      </div>
      <p><button onClick={add} className="add">+</button></p>
      <p><button onClick={create} className="publish">发布</button></p>
    </div>
  )
}

function Option ({index, op, onChange, onDel}) {

  return (
    <label>
      <span>选项{index+1}：</span>
      <div>
        <input type="text" defaultValue={op.v} onChange={onChange.bind(this, op.id)}/>
        <button onClick={onDel.bind(this, op.id)}>-</button>
      </div>
    </label>
  )
}