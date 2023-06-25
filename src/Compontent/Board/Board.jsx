import React, { useState } from 'react'
import {BsThreeDots} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import Editable from '../Editable/Editable'
import Card from '../Card/Card'
import './Board.css'
import DropDown from '../DropDown/DropDown'
const Board = (props) => {
  const [showDropdown , SetshowDropdown] = useState(false);
  return (
    <div className='board'>
    <div className='board_top'>
      <p className='board_top_title'>
        {props.boards?.title} <span style={{color: "white"}}> &nbsp; &nbsp; &nbsp; {`${props.boards?.cards?.length}`}</span>
      </p>
      <div className='board_top_more' onClick={() => SetshowDropdown(true)}>
      <BsThreeDots className='threedots'/>
      {
        showDropdown && ( 
      <DropDown
      onClose={() => SetshowDropdown(false)}>
      <div className='board_dropdown'>
      <MdDelete onClick={() => props.removeBoard(props.boards?.id)} />
      </div> 
      </DropDown>
      )}
      </div>  
    </div>
      <div className='board_cards'>
      {
        props.boards?.cards?.map((item) => (
          <Card 
          key={item.id} 
          card={item}
          removeCard={props.removeCard}
          boardId={props.boards?.id}
          handleDragEnd={props.handleDragEnd}
          handleDrageEnter={props.handleDrageEnter}
          updateCard = {props.updateCard}
          />
        ))
      }
      
       <Editable 
       displayclass="boards_cards_add"
       text="Add Card"
       placeholder ="Enter Card Title"
       onSubmit={(value) => props.addcard(value, props.boards?.id)}
      
       />

      </div>
     
    </div>
  )
}

export default Board
