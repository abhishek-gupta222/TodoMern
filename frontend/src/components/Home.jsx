import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";


const Home = () => {
  const navigate=useNavigate()
  const goToSignUp=()=>{
navigate("/signup")
  }


  return (
    <div className='content'>

        <div className="subcontainer">
        <h1>Welcome to our Todo app! </h1>
        <br></br>
        <h3>"Stay organized and productive with our Todo app.
             Easily manage tasks, set priorities, and track your progress to get
              things done with ease!"</h3>
              <br>
              </br>
              
              <button onClick={goToSignUp}>Get Started<FaArrowRight /></button>
      
        </div>
       
    </div>
  )
}

export default Home