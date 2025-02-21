import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './App.css'
import About from './components/About'
import Home from './components/Home';
import Todo from './components/Todo';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { logIn } from './redux/store';
import ViewTodo from './components/ViewTodo';
import Spinner from './components/Spinner';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
   // console.log(sessionStorage.getItem("id"));
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(logIn());
    }

  }, [])


  return (
    <div className='box'>

      <div className="container">
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="todo" element={<Todo />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/viewTodo" element={<ViewTodo />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </div>



    </div>
  )
}

export default App
