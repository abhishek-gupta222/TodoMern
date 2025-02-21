import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import axios from "axios";
import { toast } from "react-toastify";
import useTodos from './CustomHook/useTodos';
import { useSelector } from 'react-redux';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import '../App.css'
import './TodoCard.css'
import Spinner from './Spinner';

const Todo = () => {

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const { todos, fetchTodos } = useTodos(id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  // Form state for adding & updating todos
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [updatingTodoId, setUpdatingTodoId] = useState(null);

  // Get user ID from session storage
  useEffect(() => {
    const storedId = sessionStorage.getItem("id");
    if (storedId) setId(storedId);
    else console.log("No valid ID found in session storage.");
  }, []);

  // Fetch todos when user logs in or ID changes
  useEffect(() => {
    if (isLoggedIn && id) fetchTodos();
  }, [isLoggedIn, id]);

  // Delete todo
  const del = async (todoId) => {
    try {
      await axios.delete(`${backendUrl}/api/v2/deleteTask/${todoId}`);
      fetchTodos();
      toast.success("Todo deleted successfully!");
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Load existing todo into input fields for updating
  const todoUpdate = (title, body, todoId) => {
    setFormData({ title, body });
    setUpdatingTodoId(todoId);
  };

  // Handle input changes
  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Add or update a todo
  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true);

    if (formData.title === "" || formData.body === "") {
      toast.error("Title or body can't be empty");
      return;
    }

    if (!id) {
      alert("You are not logged in");
      return;
    }

    try {
      if (updatingTodoId) {
        // Updating an existing todo
        await axios.put(`${backendUrl}/api/v2/updateTask/${updatingTodoId}`, {
          title: formData.title,
          body: formData.body,
          id: id
        });
        toast.success("Todo updated successfully!");
        setUpdatingTodoId(null); // Reset update state
      } else {
        // Adding a new todo
        await axios.post(`${backendUrl}/api/v2/addTask`, {
          title: formData.title,
          body: formData.body,
          id: id
        });
        toast.success("New todo created!");
      }

      fetchTodos();
      setFormData({ title: "", body: "" }); // Clear form
    } catch (error) {
      console.error("Error saving todo:", error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="content">
      <div className="subcontainer">
        <h4>{updatingTodoId ? "Update Todo" : "Create a Todo"}</h4>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={changeHandler}
          />
          <br />
          <textarea
            placeholder="Body"
            name="body"
            value={formData.body}
            onChange={changeHandler}
          />
          <br />
          <button type="submit">
            {
            loading ? <Spinner /> : updatingTodoId ? "Update" : "Add"}
            </button>
        </form>

        <div className='todocard-box'>
          <div className='todocard-container'>
            {todos && todos.map((item) => (
              <TodoCard 
                key={item._id} 
                id={item._id} 
                del={del} 
                todoUpdate={() => todoUpdate(item.title, item.body, item._id)} 
                title={item.title} 
                body={item.body} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
