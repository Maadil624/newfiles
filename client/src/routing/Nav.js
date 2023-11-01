import React from 'react'
import { Link, useNavigate } from "react-router-dom"
// import logo from "../images/logowhite.png"
import "./Nav.css"
import Swal from 'sweetalert2';
export default function Nav() {
    const navigate = useNavigate();
    return (
        <div className='bartop'>
            <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" >
                <div class="container-fluid">
                    {/* <img src={logo} alt='image' id="logo" /> */}
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item m-3">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            
                        </ul>
                    </div>
                    <div class="rightbar">
                        <ul class="rightbar" id='navright'>
                            <li><Link to='/login' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "18px" }}>Login</Link></li>
                            <li><Link to='/register' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "18px" }}>Register</Link></li>
                            <li><Link to='/login'
                                onClick={() => {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        width:'250px',
                                        iconColor:'black',
                                        title: 'Should have an account',
                                        showConfirmButton: false,
                                        // timer: 2000
                                      })
                                    // alert("Should have an account to Apply....\npress OK to login/register");
                                    
                                }} style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "18px" }}>Careers</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}
