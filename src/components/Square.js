import React from 'react'

export default function Square(props) {
   
  return (
    <div   onClick={props.onClick} className='square'>
      <h4>{props.value}</h4>
    </div>
  )
}
