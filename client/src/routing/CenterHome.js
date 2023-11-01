import React from 'react'
import "./Nav.css"
import { useNavigate } from "react-router-dom"
import img1 from "../images/jobback.jpg"
import img2 from "../images/jobback1.jpg"
import img3 from "../images/abt.png"
import img4 from "../images/abt1.png"
export default function CenterHome() {
  const navigate = useNavigate();
  return (
    <div className='middlehome'>
      {/* middle content on pic */}
      <div class="bg-image"></div>
      <div class="bg-text">
        <h1>We provide solutions for
          your Jobs</h1>
        <p>Just don't give up trying to do what you really want to do</p>

      </div>
      <div className='imageclass' id='divimg'>
        <img id='image1' src={img1} />
      </div>
      <div className='imageclass'>
        <img id='image2' src={img2} />
        <div id='img2h1tag1'>
          <h1 style={{ margin: "0px" }}>Searching for a job ?</h1>
          <p>Find the most exciting jobs</p>
          <h1>👇</h1>
        </div>
        <button
          onClick={() => {
            alert("Should have an account to Apply....\npress OK to login/register");
            navigate("/login");
          }}
          type="button" class="btn btn-danger btn-lg" id='img2h1tag2' style={{ margin: "0px" }}>Apply Here</button>
      </div>

      <div className='contact'>
        <h1 id='contact'>contact</h1>
        <img id='contactimg' src={img4} />
        <h2 id='mob'>mobile:+9185959461</h2>
        <h2 id='add'>address:dlf gate no-1,gachibowli.</h2>
        <h2 id='loc'>location:Hyderabad</h2>
      </div>
      <div className='foot'>
        <h1 id='about'>About us</h1>
        <div className='foot1'>
          <span><h1 id='foot1'>our company</h1></span>
          <span><h1 id='foot2'>With the past few decades filled with the eruption of business in various industrial sectors, competition has highly become intense therefore giving rise to the need for quick and efficient Business Growth and Development tools and strategies. Business Intelligence has highly been adopted in various business industries in recent years</h1></span>
          <img src={img3} />

        </div>
      </div>

    </div>
  )
}
