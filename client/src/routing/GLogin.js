import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jdecode from "jwt-decode";

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
const clientId =
  '277235661468-ju1qncs00a5vd3um2ocoat39bflfpuni.apps.googleusercontent.com';

function GLogin() {
  const [data, setdata] = useState([])
  
  let navigate=useNavigate()
  // console.log(data)
  function gsubmit(email,name) {
    // e.preventDefault();
    // console.log('at g-login ',email,name)
    let url = "http://localhost:5000/glogin"
    let responce = fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then((data) => {
        sessionStorage.setItem('token',data.token)
        // sessionStorage.setItem('token','data.token')
        console.log("data", data);
      });
  }
  return (<div className='glogin'>
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={async credentialResponse => {

          /*jwt decode is alibrary used to decode
          the toke and details provided by the google
          */
          
          setdata(jdecode(credentialResponse.credential))
          // console.log(jdecode(credentialResponse.credential));
          // console.log(jdecode(credentialResponse.credential).name)
          gsubmit(jdecode(credentialResponse.credential).email,jdecode(credentialResponse.credential).name);
          Swal.fire(
            'Login Successful',
            'Redirecting to Jobs',
            'success'
          ).then(()=>{
            navigate('/alljob')
          })
        }}
        onError={() => {
          console.log('Login Failed');
        }} />
    </GoogleOAuthProvider><br/>
  </div>
  );
}
export default GLogin;