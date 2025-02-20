//note: all the css used in this component is used from app.css 

import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import ViewTodo from './ViewTodo';
import { useNavigate } from 'react-router-dom';




const todoCard = ({title, body, del, id, todoUpdate}) => {


   const navigate= useNavigate()

  const viewTodo = () => {
    navigate("/viewTodo", { state: { title, body } }); // Passing data correctly
  };

  return (
    <div className='todoCard'>
        <div>
        <h5>Title:{title}</h5>
        
        <p>Body:{body.length > 20 ? body.substring(0, 18) + "..." : body}
        
        </p>
        </div>
        
        <div className='actions'>
      <MdDelete className='delete' onClick={() => del(id)} />
      <GrDocumentUpdate className='update' onClick={() => todoUpdate(title, body, id)} />
      <div className="viewTask" onClick={viewTodo}>
        View
        <FaRegArrowAltCircleRight />
      </div>

        </div>
      
    </div>
  )
}

export default todoCard