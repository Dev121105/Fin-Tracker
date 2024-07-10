import React from 'react'
import "./style.css"

function Buttons({text,onCLick,blue,disabled}) {
  return (
    <div 
    className={blue ? "btn btn-blue" : 'btn'} 
    onClick={onCLick}
    disabled={disabled} >
      {text}
    </div>
    
  )
}

export default Buttons