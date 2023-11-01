import Jobsite from "./routing/Jobsite"
import { Route, Routes, useNavigate } from "react-router";
import Home from "./routing/Home";
import ChatWebSockets from "./routing/ChatWebSockets";
import Login from "./routing/Login";
import Register from "./routing/Register";
import CreateJobs from "./routing/CreateJobs";
import Files from "./routing/Files";
import FbLoginDisplay from "./routing/FbLoginDisplay";
import AllfileUsers from "./routing/AllfileUsers";
import User_allfilesdata from "./routing/User_allfilesdata";
import Database_users from "./routing/Database_users";
import LinkedScreen from "./routing/LinkedScreen";
import Adminpage from "./routing/Adminpage";
import { useEffect } from "react";
import UserRequest from "./routing/UserRequest";
// import { LinkedInCallback } from 'react-linkedin-login-oauth2';

function App() {
  let navigate = useNavigate()
  useEffect(() => {
    let token = sessionStorage.getItem('token')
    //   if(token){
    //     // console.log('at App.js 20..no token provided')
    //     navigate('/login')
    // }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chatimp' element={<ChatWebSockets />} />
        <Route exact path="/linkedin" element={<LinkedScreen />} />
        <Route exact path="/usersfiles" element={<User_allfilesdata />} />
        <Route exact path="/usersrequest" element={<UserRequest />} />
        <Route exact path="/Admin" element={<Adminpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/createjob' element={<CreateJobs />} />
        <Route path='/alljob' element={<Jobsite />} />
        <Route path='/allusers' element={<Database_users />} />
        <Route path='/fileupload' element={<Files />} />
        <Route path='fileusers' element={<AllfileUsers />} />
        <Route path='/facebook/callback' element={<FbLoginDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
