import React, { useState } from 'react'
import NavafterLogin from './NavafterLogin.js'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
export default function CreateJobs() {
    let navigate=useNavigate()
    const [company, setcompany] = useState("")
    const [position, setposition] = useState("")
    const [msg, setmsg] = useState("")
    function handleSubmit(e) {
        e.preventDefault();
        let url = "http://localhost:5000/createjob";
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                company,
                position
            }),
            headers: {
                'x-access-token':sessionStorage.getItem('token'),
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then((data) =>{
console.log(data)
                Swal.fire(
                    `${data.message}`,
                    `${data.message.includes('jwt expired') ?
                     'redirecting to login' : (data.message)?
                     data.message : data.message}`,
                    `${data.message.includes('created') ? 'success' : 'error'}`
                  ).then(() => {
                    // alert(value)
                    if(data.message.includes('sucess')){
                        setposition('')
                        setcompany('')
                    }
                    if (data.message.includes('jwt expired')) {
                      navigate('/login')
                    }
                  })

                setmsg(data.message)
            })
    }
    
    return (
    <>
    <NavafterLogin/>
        <div className='form'>
            <div class='form1'>
                <form onSubmit={handleSubmit} >
                    <div className='logo'>
                    </div>
                    <br />
                    <div class="col-md-15 mb-4 name">
                        <label for="validationDefault01">Enter Company Name</label>
                        <input type="text" value={company} onChange={(e) => setcompany(e.target.value)} class="form-control" id="validationDefault01" placeholder="Enter Your name" required />
                    </div>
                    <div class="col-md-15 mb-4 name">
                        <label for="validationDefault01">Enter Company Name</label>
                        <input type="text" value={position} onChange={(e) => setposition(e.target.value)} class="form-control" id="validationDefault01" placeholder="Enter Your name" required />
                    </div>
                    <br />
                    <br />
                    <button type="submit" class="btn btn-success btn-lg" >Add Job</button>
                </form>
            </div>
        </div>
        </>
    )
}