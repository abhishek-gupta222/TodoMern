import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/store';
import { toast } from "react-toastify";
import useTodos from './CustomHook/useTodos';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let id = sessionStorage.getItem("id");
 
  const { todos, fetchTodos } = useTodos(id);

  const [formData, setFormData] = useState({
    email: "",

    password: ""
  });

  function changeHandler(event) {
    const { name, value } = event.target; // Destructure name and value
    setFormData((prev) => ({
      ...prev,
      [name]: value // Update the specific field in the form data
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    await axios.post(`${backendUrl}/api/v1/login`, formData)
      .then((res) => {
        toast.success("Login Successfull")
        console.log(res.data.message)
        console.log("res send successfully")
        console.log(res.data.others._id)
        sessionStorage.setItem("id", res.data.others._id);
        dispatch(logIn()); 
        navigate("/todo")
      //  window.location.reload();
          fetchTodos();
      })


      .catch((err) => {  // Corrected the catch block here
        console.error("Error: ", err.response.data.message);
      });
    //console.log("Finally printing the value of Form Data:");
    // console.log(formData);

    setFormData({
      email: "",
      password: ""
    })
  }

  return (
    <div className="content">
      <div className="subcontainer">
        <h4>Log In</h4>
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
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={changeHandler} // Handle title input changes
          />
          <br />

          <button type="submit">LogIn</button>
        </form>
      </div>
    </div>
  )
}

export default login