import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";


const ViewTodo = () => {
  const location = useLocation();
  const { title, body } = location.state || {}; // Retrieve data safely

  const navigate= useNavigate();

  const goBack=()=>{
    navigate("/todo")
  }

  return (
    <div className='view'>
      
      <h2><u>Title:</u>{title || "No Title"}</h2>
      <p><u>Body:</u><i>{body || "No Body"}</i></p>
      <div className="back" onClick={goBack}>
           
            
            <IoMdArrowBack />
            Go Back
        </div>
    </div>
  );
};

export default ViewTodo;
