import React, { useState, useEffect } from 'react'
import "./user.css"
import 'react-toastify/dist/ReactToastify.css';
import { Link, json, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import GLogin from './GLogin';
import FbLogin from './FbLogin';
import Nav from './Nav.js'
import img from '../images/Sign-in-Large---Active.png'
// import LinkedInPage from './LinkedinLogin';

export default function Login() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    // if(status){
    let url = "http://localhost:5000/login"
    // POST request using fetch()
    let responce = fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(async (data) => {
        setalt(true);
        try{
          if(data.role.includes('Admin')){
            // console.log(data.role)
            sessionStorage.setItem('Admin',data.pass.email+","+data.pass.name+','+data.role)
          }
          if(data.role.includes('user')){
            sessionStorage.setItem('user',data.pass.email+","+data.pass.name+','+data.role)
          }
        }catch(err){
          console.log(err)
        }
        setmsg(data.message);
        settkn(data.token);
        setrole(data.role)
        document.cookie = `role=${data.role}; max-age=60*60*1`;
        // console.log(msg);
        console.log("data", data);
      });
    //  }else{
      // setstatus(false)
      // Swal.fire(
        // 'Server is Offline',
        // '',
        // 'error'
      // )
    // }

  }
  let ptype=document.getElementById('exampleInputPassword1')
  let eye=document.getElementById('eye')
  function showpass(){
    // console.log(eye)
    // console.log(ptype.type)
    if(ptype.type=='password'){
      ptype.type='text'
    }else{
      ptype.type='password'
    }
  }
  const [email, setemail] = useState()
  const [status, setstatus] = useState()
  const [pass, setpass] = useState()
  const [msg, setmsg] = useState("")
  const [alt, setalt] = useState(false)
  const [chk, setchk] = useState(false)
  const [active, setactive] = useState(true)
  const [swpass, setswpass] = useState(true)
  const [tkn, settkn] = useState()
  const [role, setrole] = useState()
  useEffect(() => {
    // checkServerStatus()
    // setInterval(checkServerStatus, 1000*10);
    // async function checkServerStatus(){
    //   try{
    //     let url = "http://localhost:5000/check"
    //     return await fetch(url).then(json=>json.json()).then(data=>{
    //       // console.log(data)
    //       setstatus(data.sucess)
    //     })
    //   }catch(error){
    //     console.log(error)
    //     setstatus(false)
    //     return error
    //   }
    // }
    clearTimeout(sessionStorage.getItem('timeoutid'))
    if (active) {
      setactive(sessionStorage.getItem('active'))
      setemail(sessionStorage.getItem('email'))
      setpass(sessionStorage.getItem('pass'))
      sessionStorage.setItem("loginpage", true)
      // sessionStorage.setItem("active", false)
      sessionStorage.setItem("jobsitepage", false)
      let jobsitepageactive = sessionStorage.getItem("jobsitepage")
      // console.log(!!jobsitepageactive)
      if (!!jobsitepageactive) {
        sessionStorage.setItem('active', false)
        // sessionStorage.removeItem('token')
      }
      sessionStorage.removeItem('sucess')
    }
  }, [])
  // console.log(chk,"chk")
  if (alt && handleSubmit) {
    if (msg.includes("login") && msg.includes("sucessfull") && tkn) {
      sessionStorage.setItem("token", tkn)
      sessionStorage.setItem("sucess", true)
      if (chk) {
        sessionStorage.setItem("chk", chk)
        sessionStorage.setItem("email", email)
        sessionStorage.setItem("pass", pass)
        Swal.fire({
          position: "center",
          title: `${msg}`,
          // timer: 3000,
          icon: 'success'
        }).then(() => {
          if (tkn&&role.includes('user')) {
            navigate('/fileupload')
          }
          if(tkn&&role.includes('Admin')){
            navigate('/Admin')
          }
        })
        if (active) {
          sessionStorage.setItem("active", true)
          // setemail(sessionStorage.getItem('email'))
          // setpass(sessionStorage.getItem('pass'))
        }
      }
      sessionStorage.setItem("active", true)
      if (!chk) {
        sessionStorage.removeItem("email", email)
        sessionStorage.removeItem("pass", pass)
        // sessionStorage.removeItem("token", tkn)
      }
      Swal.fire({
        position: "center",
        title: `${msg}`,
        // timer: 3000,
        icon: 'success'
      }).then(() => {
        // console.log(tkn&&role.includes('user'))
        if (tkn&&role.includes('user')) {
          navigate('/fileupload')
        }
        else if(tkn&&role.includes('Admin')){
          navigate('/Admin')
        }
        else {
          navigate('/login')
        }
      })
    }
    else {
      if (chk) {
        setemail(email)
        setpass(pass)
        Swal.fire({
          position: "center",
          title: `${msg}`,
          // timer: 3000,
          icon: 'warning'
        })
      }
      else {
        setemail('')
        setpass('')
        Swal.fire({
          position: "center",
          title: `${msg}`,
          // timer: 3000,
          icon: 'warning'
        })
      }
    }
    setalt(false)
  }
  // console.log(role)
  return (<>
    <Nav />
    <div className='form'>
      <form onSubmit={handleSubmit} >
        <div class='form1'>
          <div className='logo'>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <br />
            <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group"><br />
            <label for="exampleInputPassword1">Password</label><br />
            <input type="password" value={pass} onChange={(e) => setpass(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            {(swpass)?
            <i class="fa-solid fa-eye" id='eye' onClick={()=>{
              setswpass(false)
              showpass()
            }}></i>
            :
            <i class="fa-solid fa-eye-slash" id='eye1' onClick={()=>{
              showpass()
              setswpass(true)
            }}></i>
            }
          </div>
          <div className="form-group form-check"><br />
            <input type="checkbox" className="form-check-input" value={chk} id="exampleCheck1" onChange={(e) => { setchk(e.target.checked) }} />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
          </div><br />
          <button type="submit" className="btn btn-success btn-lg LRbtns" >Submit</button>
          {/* <b><hr></hr></b> */}
          {/* <h6>Don`t Have an account ?</h6> */}
          <button type="button" className="btn btn-danger btn-lg LRbtns" >
            <Link to="/register" style={{ "textDecoration": "none", "listStyle": "none", "color": "white" }}>Register Here
            </Link></button>
        </div>
        <b><hr></hr></b>
        <br />
        <div class="g-signin2" data-onsuccess="onSignIn" className='G_FB_login' >
          <GLogin />
          {/* <LinkedInPage/> */}
        </div>
        <FbLogin /><br />
        <a href='http://localhost:5000/auth/linkedin' >
          <img src={img} />
        </a>
      </form>
    </div>
  </>
  )
}