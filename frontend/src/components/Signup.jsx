
import React, { useState } from 'react';
import axios from "axios"
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {

  const navigate= useNavigate();

  function goToLogin(){
    navigate("/login")
  }

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password:""
      });
    
      function changeHandler(event) {
        const { name, value } = event.target; // Destructure name and value
        setFormData((prev) => ({
          ...prev,
          [name]: value // Update the specific field in the form data
        }));
      }
    
      async function submitHandler (event) {
        event.preventDefault();
        await axios.post(`${backendUrl}/api/v1/register`, formData)
        .then((res)=>{
          toast.success("Account Created!")
          console.log(res)
          console.log("res send successfully")
          navigate("/login")

        })
       

        .catch((err) => {  // Corrected the catch block here
          console.error("Error: ", err.response.data.message);
      });

     //   console.log("Finally printing the value of Form Data:");
      //  console.log(formData);
    
        setFormData({
            email: "",
            username: "",
            password:""
        })
      }

  return (
    <div className="content">
      <div className="subcontainer">
        <h4>Sign Up</h4>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={changeHandler} // Handle title input changes
          />
          <br />
          <input
            type="text"
            placeholder="username"
            name="username"
            id="username"
            value={formData.username}
            onChange={changeHandler} // Handle title input changes
          />
          <br />

          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={changeHandler} // Handle title input changes
          />
          <br />
          
          <button type="submit">SignUp</button>
        </form>
        <br></br>
        <h3>---OR---</h3>
      <p>Already have an Account</p>
      <br></br>
      <button className='btn' onClick={goToLogin}>Go to login</button>
      </div>
    
    </div>
  )
}

export default Signup