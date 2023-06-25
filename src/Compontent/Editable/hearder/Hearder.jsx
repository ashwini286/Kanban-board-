import React from 'react'
import './Header.css'
const Hearder = (props) => {

  return (
    <div className='navbar'>
   
      <div className='app-navbar'>
      
        <div className='themes'>
        <h1>Made with <span>💕</span> </h1>
        <div className='btn' >
        <button onClick={props.changeTheme}>Change Theme</button>
         &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
        <button onClick={props.clearBoardAll}>Clear Boards</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Hearder


