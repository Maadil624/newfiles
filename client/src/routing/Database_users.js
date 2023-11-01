import React, { useState, useEffect } from 'react'
import NavafterLogin from './NavafterLogin'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
export default function Database_users() {
  const [token, settoken] = useState()
  const [data, setdata] = useState()
  let [role, setrole] = useState()
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  async function fetchApi() {
    try {
      let url = 'http://localhost:5000/allusers' +
        `?data=${role}`
      // encodeURIComponent(`?data=${role}`)
      await fetch(url, {
        method: 'GET',
        headers: {
          'x-access-token': sessionStorage.getItem('token')
        }
      })
        .then(json => json.json()).then(async (data) => {
          // console.log('data',data.data.users.length)
          // console.log('data',Object.values(data.data)[0])
          // let dt=data.data
          // (data.data.users.length>0)?
          // :setLoading(true)
          // console.log(data.data)
          // (data) ?
          setdata(Object.values(data.data)[0])
          // : setdata(null)
          setLoading(false)
        })
    } catch (err) {
      console.log('err at fetch ', err)
    }
  }

  useEffect(() => {
    // console.log(data)
    let tokn = sessionStorage.getItem('token')
    // console.log(sessionStorage.getItem('token'))
    settoken(tokn)
    let data1 = document.cookie.split(';')
    data1.forEach((data) => {
      let ck = data.split('=')
      // console.log(ck[0].includes('role'))
      if (ck[0].includes('role')) {
        role = ck[1] 
      }
    })
    if (!tokn) {
      Swal.fire(
        'Token Expired',
        'redirecting to login page',
        'error'
      ).then(() => {
        navigate('/login')
      })
    }
    fetchApi();
  }, [])
  return (
    <>
      {
        (loading) ?
          <div>
            <NavafterLogin />
            <div className="loader-container">
              <div className="loader">
              </div>
            </div>
          </div>
          :
          <>
            <div>
              <NavafterLogin />
              <div class="card mb-1" id='display' style={{height:'100vh'}}>
                <div className='d-flex flex-wrap' id="main" >
                  {
                    (data)
                      ?
                      <>
                        {data.map((data, id) => {
                          // console.log(data)
                          return (
                            <>
                              <div class="card d-flex flex-wrap text-left justify-content-center m-1 p-1" style={{ width: "350px" }}>
                                <div class="card-body" id='id1'>
                                  name : {data.name}<br />
                                  email : {data.email}<br />
                                  role : {data.role}
                                </div>
                              </div>
                            </>)
                        })}
                      </>
                      :
                      <>no data</>
                  }
                </div>
              </div>
            </div>
          </>
      }
    </>
  )
}
