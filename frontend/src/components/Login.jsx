import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/store';
import { toast } from "react-toastify";
import useTodos from './CustomHook/useTodos';
import Spinner from './Spinner';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let id = sessionStorage.getItem("id");

  const { todos, fetchTodos } = useTodos(id);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/v1/login`, formData);
      toast.success("Login Successful");
      console.log(res.data.message);
      sessionStorage.setItem("id", res.data.others._id);
      dispatch(logIn());
      navigate("/todo");
      fetchTodos();
    } catch (err) {
      console.error("Error: ", err.response?.data?.message || "Something went wrong");
      toast.error("Login Failed");
    } finally {
      setLoading(false); // Always stop loading (hide spinner) even on error
    }

    setFormData({
      email: "",
      password: ""
    });
  }

  return (
    <div className="content">
      <div className="subcontainer">
        <h4>Log In</h4>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={changeHandler}
            required
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={formData.password}
            onChange={changeHandler}
            required
          />
          <br />


          <button type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
