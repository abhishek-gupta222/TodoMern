import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/store';
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { GrStatusUnknown } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { GiArchiveRegister } from "react-icons/gi";


const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
   

    const logout = () => {
        dispatch(logOut());
        sessionStorage.clear("id");
        
        navigate("/login")
        
        toast.success("Logout successfull!")
       
          
        
    }

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    console.log(isLoggedIn)

    return (
        <div className='topnav'>
            <nav className='navbar'>
                <ul>
                    <li>
                        
                        <Link to="/"><FaHome className='myicons ' />Home</Link>
                    </li>
                    <li>
                       
                        <Link to="/todo"> <LuListTodo className='myicons' />Todo</Link>
                    </li>

                    <li>
                       
                        <Link to="/about"> <GrStatusUnknown className='myicons' />About Us</Link>
                    </li>


                    {
                        !isLoggedIn && <>

                            <li>
                                
                                <Link to="/signup"><GiArchiveRegister className='myicons' />SignUp</Link>
                            </li>
                            <li>
                                
                                <Link to="/login"><CiLogin className='myicons' />LogIn</Link>
                            </li>

                        </>
                    }

                    {
                        isLoggedIn && <>
                            <li onClick={logout} >
                                
                                <Link to="#"><CiLogout className='myicons' />LogOut</Link>
                            </li>

                        </>
                    }



                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Navbar