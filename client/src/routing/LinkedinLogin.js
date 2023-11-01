
import React, { useState } from 'react'
import img from '../images/Sign-in-Large---Active.png'
// import { LinkedIn } from 'react-linkedin-login-oauth2';
// // You can use provided image shipped by this package or using your own
import LinkedIn from 'react-linkedin-login-oauth2/assets/linkedin.png';
function LinkedInPage() {
  return (
    <LinkedIn
      clientId="86vhj2q7ukf83q"
      redirectUri={`${window.location.origin}/linkedin`}
      onSuccess={(code) => {
        console.log(code);
      }}
      onError={(error) => {
        console.log(error);
      }}
    >
      {/* {({ linkedInLogin }) => ( */}
       <a href='http://localhost:5000/auth/linkedin' >
       <img src={img}/>
       </a> 
    {/* //   )} */}
    </LinkedIn>
  );
}

export default LinkedInPage;