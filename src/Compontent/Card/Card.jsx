import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { LuCheckSquare } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'
import DropDown from '../DropDown/DropDown'

import './Card.css';
import { AiOutlineClockCircle } from "react-icons/ai"
import CardInfo from './CardInfo/CardInfo'
const Card = (props) => {
  const [showDropdown, SetshowDropdown] = useState(false)
  const[showModal, SetshowModal] = useState(false)
  return (
    <>
     {
      showModal && <CardInfo card={props.card} 
      updateCard={props.updateCard}
      boardId={props.boardId}
      onClose={() => SetshowModal(false)}/>
    }
    <div className='card'
    draggable
    onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
    onDragEnter={() => props.handleDrageEnter(props.card?.id, props.boardId)}
    onClick={() => SetshowModal(true )}
    >
   
    
      <div className='card_top'>
        <div className='card_lables'>
          <div className='card_top_more' onClick={() => SetshowDropdown(true)}>
            <BsThreeDots className='threedots'/>
            {
              showDropdown && (
                <DropDown
                  onClose={() => SetshowDropdown(false)}>
                  <div className='card_dropdown'>
                    <MdDelete onClick={() => props.removeCard(props.card?.id,props.boardId)}/>
                  </div>
                </DropDown>
              )}
          </div>
        </div>
        <div className='card_title'>
          {props.card?.title}
        </div>
        <div className='card-footer'>
        { props.card?.date && (
          <p>
            <AiOutlineClockCircle />
             {props.card?.date}
          </p>

        )}
         {
          props.card?.tasks?.length > 0 && (
            <p>
            <LuCheckSquare />
            {props.card?.tasks?.filter(item => item.completed).length}/
            {props.card?.tasks?.length}
          </p>
          )}
         
        </div>
      </div>
    </div>
    </>
  )
}

export default Card
