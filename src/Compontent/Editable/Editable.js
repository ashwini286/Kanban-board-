import React, { useState } from 'react'
import './Editable.css'
import {RxCross2} from 'react-icons/rx'
const Editable = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue , setInputValue] = useState(props.text||"")
  return (
    <div className='editable'>
    {showEdit  ? (
      <form 
       className={`editable-edit ${props.editclass || " "}`}
      onSubmit={(e) => {
        e.preventDefault()
        if(props.onSubmit) props.onSubmit(inputValue)
        setShowEdit(!showEdit)
        setInputValue(" ")
      }}
      >
        <input 
         type='text' 
        autoFocus
        placeholder={props.placeholder || "enter item"} 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        />
        <div className='editable_edit_footer'>
            <button type='submit'>{props.buttonText || "Add"}</button>
            <RxCross2  onClick={() => setShowEdit(false)}/>
        </div> 
      </form> 
    )
      : (
        <p className={`editable_display ${props.displayclass || " "}`} onClick={() => setShowEdit(true)}>{props.text || "Add item"}</p> 
        )}
    </div>
  )
}

export default Editable
