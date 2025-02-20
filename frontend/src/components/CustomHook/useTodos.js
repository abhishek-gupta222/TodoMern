import { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useTodos = (id) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v2/getTask/${id}`);
      setTodos(res.data.list);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [id]); // Fetch todos whenever the `id` changes

  return { todos, setTodos ,fetchTodos };
};

export default useTodos;
