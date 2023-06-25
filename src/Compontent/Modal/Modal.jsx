import React from 'react'
import './Modal.css'
const Modal = (props) => {
  return (
    <div className='Modal' 
    onClick={() => (props.onClose ? props.onClose() : " ")}> 
      <div className='modal_content' 
      onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Modal
