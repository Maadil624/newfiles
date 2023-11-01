import React, { useEffect, useState } from 'react'
import NavafterLogin from './NavafterLogin'
import './user.css'
import Swal from 'sweetalert2'
export default function Adminpage() {
  const [token, settoken] = useState()
  let [requests, setrequests] = useState()
  const [uptvalue, setuptvalue] = useState()
  const [dltvalue, setdltvalue] = useState()
  const [flvalue, setflvalue] = useState()
  const [role, setrole] = useState()

  let Admin = sessionStorage.getItem('Admin')
  let details = Admin.split(',')
  let url = 'http://localhost:5000/adminrequest' + `?data=${Admin}`
  let fetchrequests = async (req, res) => {
    fetch(url, {
      method: 'get',
      headers: {
        'x-access-token': sessionStorage.getItem('token')
      }
    }).then(data => data.json()).then(data => {
      setrequests(data.requests)
      // console.log(data.requests)
    })
  }
  let updatedata
  let deletedata
  let deletefile
  if (requests) {
    updatedata = requests.filter((data, id) => {
      return data.action == 'onsavedata'
    })
    deletedata = requests.filter((data, id) => {
      return data.action == 'deleteuser'
    })
    deletefile = requests.filter((data, id) => {
      return data.action == 'deletefile'
    })
    // console.log(deletedata)
  }
  function disp() {
    // let disp=document.querySelector('content')
    let disp = document.getElementById('backdiv')
    console.log('disp', disp)
    disp.classList.add('disp')
  }
  function usernotification(data) {
    console.log(data)
    let url = 'http://localhost:5000/createnotification'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        data
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(json => json.json()).then(data => {
      console.log(data)
    })
  }
  async function handledelfile(data) {
    console.log(data)
    let id = data.fileid
    let reqid = data._id
    let url = `http://localhost:5000/deletefile/${id}`
    let requrl = `http://localhost:5000/adminreqdel/${reqid}`
    const [res1, res2] = await Promise.all([
      fetch(requrl, {
        method: 'DELETE'
      }).then(async (json) => await json.json())
        .then(data => {
          console.log(data)
        }),
      fetch(url, {
        method: 'DELETE'
      }).then(json => json.json()).then((data) => {
        console.log(data)
      })
    ])
    Swal.fire(
      "deleted file",
      '',
      'success'
    )
      .then(() => {
        requests = null
        fetchrequests()
      })
    // console.log('sxsx',res1,res2)
  }
  async function handledeldata(data) {
    let id = data.fileid
    let reqid = data._id
    // console.log('81',data)
    let requrl = `http://localhost:5000/adminreqdel/${reqid}`
    let posturl = 'http://localhost:5000/getdeletedata'
    let url = `http://localhost:5000/deletefileuser/${id}`
    const [res1, res2, res3] = await Promise.all([
      fetch(posturl, {
        method: 'POST',
        body: JSON.stringify({
          name: data.filename,
          olddata: data.olddata
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(json => json.json())
        .then(data => {
          console.log(data)
        }),
      fetch(requrl, {
        method: 'DELETE'
      }).then(json => json.json()).then((data) => {
        console.log(data)
      }),
      fetch(url, { method: "DELETE" }).then(async (json) => await json.json()).then(data => {
        console.log('delete request data', data)
      }).then(() => {
        Swal.fire(
          "Deleted the user",
          '',
          'success'
        ).then(() => {
          requests = null
          fetchrequests()
        })
      })
    ])
    Swal.fire(
      "Deleted the user",
      '',
      'success'
    ).then(() => {
      requests = null
      fetchrequests()
    })
    // console.log('res1=',res1)
    // console.log('res2=',res2)
    // console.log('res3=',res3)
  }
  async function handleupdate(data) {
    let id = data.fileid
    let reqid = data._id
    let url = `http://localhost:5000/updatefiledata/${id}`
    let requrl = `http://localhost:5000/adminreqdel/${reqid}`
    let [res1, res2] = await Promise.all([
      fetch(url, {
        method: 'put',
        body: JSON.stringify({
          index: data.index,
          olddata: data.olddata,
          data: data.data
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(json => json.json()).then(data => {
        console.log(data)
      }),
      fetch(requrl, {
        method: "DELETE"
      }).then(json => json.json()).then((data) => {
        console.log(data)
      })
    ])
    Swal.fire(
      "updated data",
      '',
      'success'
    )
      .then(() => {
        requests = null
        fetchrequests()
      })
    console.log(data)
  }
  async function rejectrequest(data) {
    let reqid = data._id
    let requrl = `http://localhost:5000/adminreqdel/${reqid}`
    fetch(requrl, {
      method: 'DELETE'
    }).then(() => {
      Swal.fire("rejected request", `doc id : ${data._id}`, 'success')
      requests = null
      fetchrequests()
    })
  }
  async function refreshall() {
    const icon = document.getElementById('refreshbtn');
    icon.addEventListener("click", () => {
      icon.classList.add("rotate-animation");
      setTimeout(() => {
        icon.classList.remove("rotate-animation");
      }, 2000);
    });

    requests = null
    fetchrequests()
  }
  useEffect(() => {
    fetchrequests()
    // setAdmin(sessionStorage.getItem('Admin'))
    settoken(sessionStorage.getItem('token'))
    // console.log(sessionStorage.getItem('Admin'))
    // console.log(details)
    // console.log(requests)
  }, [])
  if (token) {
    return (
      <div id='adminmain' className='adminmain'>
        <NavafterLogin />
        <div>
        </div>
        <div id='backdiv' className='adminreq'>
          <i class="fa-solid fa-arrows-rotate" id='refreshbtn' onClick={() => { refreshall() }}></i>
          <div id='req1' className='req1' onClick={() => { setuptvalue(true) }}>
            <i class="fa-regular fa-pen-to-square" id='requpdate'></i>
            <br />
            <span>{(updatedata) ? updatedata.length + ' update requests' : 'update requests'}</span>
          </div>
          <div id='req2' className='req1' onClick={() => {
            setflvalue(true)
          }}>
            <i class="fa-regular fa-trash-can" id='reqdel'></i>
            <br />
            <span>{(deletefile) ? deletefile.length + ' delete file requests' : 'delete file requests'}</span>
          </div>
          <div id='req3' className='req1' onClick={() => setdltvalue(true)}>
            <i class="fa-regular fa-trash-can" id='reqdel'></i>
            <br />
            <span>{(deletedata) ? deletedata.length + ' delete data requests' : 'delete data requests'}</span>
          </div>
        </div>
        {(requests && uptvalue || dltvalue || flvalue)
          ? (
            // (updatedata.length<=0&&deletefile.length<=0&&deletedata.length<=0) ? Swal.fire('No requests available to process') 
            // :            
            <div id='outdiv'>
              <div id='popcont' class="popcontainer">
              </div>
              <div class="content">
                <div class="card m-2 mb-3 d-flex flex-wrap" id='display' style={{ Height: "100%" }}>
                  <div className='d-flex flex-wrap' id="main" >
                    <div id='contentbtn'>
                      <button className='flex-items' onClick={() => {
                        setdltvalue(false)
                        setuptvalue(false)
                        setflvalue(false)
                      }}>X</button>
                    </div>
                    {
                      (uptvalue)
                        ?
                        <>
                          {
                            updatedata.map((data, id) => {
                              return (
                                <>
                                  <div style={{ margin: '5px', padding: '5px', textAlign: 'center' }}>
                                    <div class="card d-flex flex-wrap text-left justify-content-left m-2 p-1" style={{ width: "35rem", margin: '3rem' }}>
                                      <div class="card-body flex-wrap " id='id1'>
                                        <h6>Request : Data Update</h6>
                                        <h6>Fileid : {data.fileid}</h6>
                                        <h6>Filename : {data.filename}</h6>
                                        {/* <h6>Update-id : {data.index}</h6> */}
                                        <br />
                                        <button type="button" style={{ margin: "15px" }} class="btn btn-success" onClick={() => {
                                          handleupdate(data);
                                          usernotification(data);
                                        }}>Accept</button>
                                        <button type="button" class="btn btn-danger" onClick={() =>
                                          rejectrequest(data)}>Reject</button>
                                      </div>
                                    </div>
                                  </div >
                                </>
                              )
                            })
                          }
                        </>
                        :
                        <>
                          {
                            (dltvalue)
                              ?
                              <>
                                {
                                  deletedata.map((data, id) => {
                                    return (
                                      <>
                                        <div style={{ margin: '5px', padding: '5px', textAlign: 'center' }}>
                                          <div class="card d-flex flex-wrap text-left justify-content-left m-2 p-1" style={{ width: "35rem", margin: '3rem' }}>
                                            <div class="card-body flex-wrap " id='id1'>
                                              <h6>Request : Delete user data</h6>
                                              <h6>Fileid : {data.fileid}</h6>
                                              <h6>Filename : {data.filename}</h6>
                                              {/* <h6>Data No : {data.index}</h6> */}
                                              <br />
                                              <button type="button" style={{ margin: "15px" }} class="btn btn-success" onClick={() => {
                                                handledeldata(data);
                                                usernotification(data);
                                              }}>Accept</button>
                                              <button type="button" class="btn btn-danger" onClick={() =>
                                                rejectrequest(data)}>Reject</button>
                                            </div>
                                          </div>
                                        </div >
                                      </>
                                    )
                                  })
                                }
                              </> : <>
                                {
                                  (flvalue) ? <>
                                    {
                                      deletefile.map((data, id) => {
                                        return (
                                          <>
                                            <div style={{ margin: '5px', padding: '5px', textAlign: 'center' }}>
                                              <div class="card d-flex flex-wrap text-left justify-content-left m-2 p-1" style={{ width: "35rem", margin: '3rem' }}>
                                                <div class="card-body flex-wrap " id='id1'>
                                                  <h6>Request : {data.action}</h6>
                                                  <h6>Fileid : {data.fileid}</h6>
                                                  <h6>Filename : {data.filename}</h6>
                                                  <br />
                                                  <button type="button" style={{ margin: "15px" }} class="btn btn-success" onClick={() => {
                                                    handledelfile(data);
                                                    usernotification(data);
                                                  }}>Accept</button>
                                                  <button type="button" class="btn btn-danger" onClick={() =>
                                                    rejectrequest(data)}>Reject</button>
                                                </div>
                                              </div>
                                            </div >
                                          </>
                                        )
                                      })
                                    }
                                  </> : <div>
                                    <h1>no data available</h1>
                                  </div>
                                }
                              </>
                          }
                        </>
                    }
                  </div>
                </div>
              </div >
            </div >
          )
          : <></>
        }
        <div id='d1'></div>
      </div >
    )
  } else {
    return (
      <div>
        please provide token
      </div>
    )
  }
}
