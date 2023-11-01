import React, { useEffect, useState } from 'react'
import "./user.css"
import { useLocation, useNavigate } from 'react-router'
import Swal from "sweetalert2"
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import NavafterLogin from './NavafterLogin';

export default function Jobsite() {
  const loc = useLocation();
  let navigate = useNavigate();
  const [jobupdt, setupdt] = useState()
  const [jobs, setjobs] = useState([])
  const [totaljobs, settotaljobs] = useState(0)
  const [sucess, setsucess] = useState()
  const [loading, setLoading] = useState(true);

  let [edit, setedit] = useState(false)
  let [active, setactive] = useState(true)
  let [id, setid] = useState()
  
  let url = "http://localhost:5000/alljob"
  let res;
  async function fetchApi() {
    res = await fetch(url, {
      method: "get",
      headers: {
        'x-access-token': sessionStorage.getItem('token')
      }
    }).then(json => json.json()).then(data => {
      // console.log(data)
      setjobs(data.job)
      setsucess(data.sucess)
      settotaljobs(data.totalJobs)
      if(data.job.length>0){
        setLoading(false)
      }
    })
  }
 
  function handlelogout() {
    if(!sessionStorage.chk){
      sessionStorage.removeItem('email')
      sessionStorage.removeItem('pass')
    }
    sessionStorage.removeItem('token')
    sessionStorage.setItem('active', false)
    Swal.fire(
      "Session Expired Please login again",
      'navigating to login page',
      'error'
      ).then(() => {
        navigate('/login')
      })
  }
  function handleSubmit() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('pass')
    sessionStorage.setItem('active', false)
    Swal.fire(
      "logout sucessful",
      'Thank you',
      'sucess'
    ).then(() => {
      navigate('/login')
    })
  }
  async function deletejob(id){
    setid(id)
    const socket =await io.connect("http://localhost:5000")
    let url=`http://localhost:5000/deletejob/${id}`
    socket.emit("delete_job",{id})

    // await socket.on("deleted_job",(job)=>{
      // console.log(id)
      // console.log("data from backend",job)
    // })
    await socket.on("data_after_deletion",(job)=>{
      // console.log(id)
      setupdt(job)
      console.log("data from backend",job)
    })
    res = await fetch(url, {
      method: "DELETE",
    }).then(json => json.json()).then(data => {
      // console.log("before fetch",url)
      console.log(data)
    }).then(()=>{
      fetchApi();
      // console.log("array id",id);
      Swal.fire(
        "Deleted the job",
        '',
        'success'
        )
      })
  }
  async function editjob(id,company,position){
    edit=true
    console.log(id)
    console.log(company)
    console.log(position)
    // console.log(edit)
  }
  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   handlelogout()
    // }, 60000);
  // sessionStorage.setItem('timeoutid',timeout)
    // console.log("rendering time",jobupdt)
    setactive(true);
    sessionStorage.setItem("loginpage", false)
    sessionStorage.setItem("jobsitepage", true)
    sessionStorage.getItem("jobsitepage")
    let loginactive=sessionStorage.getItem("loginpage")
    const handleBeforeUnload = (event) => {
      sessionStorage.removeItem('token')
      // sessionStorage.setItem('active',false);
    event.returnValue = 'You are about logout.. . Are you sure you want to leave?';
  };
  fetchApi();
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [jobupdt,id])
  return (
    <>
    {
      (loading)?
      <div>
        <NavafterLogin/>
      <div className="loader-container">
      <div className="loader">
      </div>
      </div>
      {/* <h1>loading data </h1> */}
      </div>
      :
    <>
    <NavafterLogin/>
    {(sucess&&sessionStorage.getItem('active'))
      ?
      <div className='maindiv'>
        {/* <button type="button" className="btn btn-danger btn-lg" id='btn' onClick={handleSubmit}>Logout</button> */}
        <div class="card m-2 mb-1">
          <div class="row no-gutters">
            <div class="col-md-4">
              {/* <img src={img} class="card-img" alt="Pago Logo" /> */}
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Jobs Available To Apply : {totaljobs}</h5><br />
                <p class="card-text">We provide a full and professional solution for the Job needs for your career by offering a wide range of services and specialties in this It field to get you into the job and make your professional life sucessful.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex flex-wrap' id="main" >
          {
            jobs.map((job, id) => {
              // console.log(job)
              return (
              <>
                <div class="card d-flex flex-wrap text-left justify-content-center m-2 p-1" style={{ fontSize:'15px',minWidth:'140px', margin: '5px' }}>
                  <div class="card-header" >
                    {/* <input type='text' value={job.company}/> */}
                    <b>{job.company}</b>
                  </div>
                  <div class="card-body" style={{ fontSize:'8px' }}>
                    <h6 style={{ fontSize:'10px' }}>Position Available <br/><b>{job.position}</b></h6>
                    <br />
                    <h6 style={{ fontSize:'10px' }}>Location: <b>{job.location} </b></h6><br />
                    <button style={{ fontSize:'10px' }} type="button" class="btn btn-primary" onClick={() => Swal.fire(
                      "Applied for the job",
                      '',
                      'success'
                    )}>Apply</button>
                    {/* <button type="button" style={{margin:"15px"}} class="btn btn-success" onClick={() => editjob(job._id,job.company,job.position)}>Edit</button> */}
                    {/* <button type="button"  class="btn btn-danger" onClick={() => deletejob(job._id)}>Delete</button> */}
                  </div>
                </div>
              </>)
            })}
        </div>
      </div>
      :
      <div>
      {
      (!totaljobs)
      ?
      <div className='failed'>
        <h1>please login first</h1>
        <button type="button" class="btn btn-danger btn-lg" >
          <Link to="/login" style={{ "textDecoration": "none", "listStyle": "none", "color": "white" }}>Login
          </Link></button>
      </div>
        :      
        <div class="card m-5 mb-3" style={{ maxHeight: "700px" }}>
          <div class="row no-gutters">
            <div class="col-md-4">
              {/* <img src={img} class="card-img" alt="Pago Logo" /> */}
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Jobs Available To Apply : 0{totaljobs}</h5><br />
                <p class="card-text">We provide a full and professional solution for the Job needs for your career by offering a wide range of services and specialties in this It field to get you into the job and make your professional life sucessful.</p>
              </div>
            </div>
          </div>
        </div>  
      }
      </div>
    }
    </>
}</>
  )
}