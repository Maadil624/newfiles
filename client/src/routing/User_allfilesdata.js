import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router';
import './user.css'
import NavafterLogin from './NavafterLogin.js';
export default function User_allfilesdata() {
  // All file displaying state variables
  let intervalId
  let [users, setusers] = useState();
  let [len, setlen] = useState([]);
  let [filename, setfilename] = useState([]);
  let [filedata, setfiledata] = useState([]);
  let [field, setfield] = useState();
  let [editactive, seteditactive] = useState();
  let [deletedata, setdeletedata] = useState();
  let [updateddata, setupdateddata] = useState();
  let [olddata, setoldddata] = useState();
  let [user, setuser] = useState();
  const [loading, setLoading] = useState(true);
  // navigation variable
  let navigate = useNavigate();

  let handledelete = async (id, filename) => {
    console.log('file deleted', id, 'data', filename)
    let url = `http://localhost:5000/usersrequest`
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        action: 'deletefile',
        id: id,
        name: filename,
        email: user
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(json => json.json()).then((data) => {
      console.log(data)
      Swal.fire(
        `${(data.message.includes('already')) ? data.message : 'Request sent to admin'}`,
        'Waiting for admin to response',
        'success'
      ).then(() => {
        setoldddata(null)
        seteditactive(false)
        let maindiv = document.getElementById('display');
        maindiv.classList.remove('disp')
      })
    })
    // let url = `http://localhost:5000/deletefile/${id}`
    // await fetch(url, {
    //   method: 'DELETE',
    // }).then(json => json.json())
    //   .then((data) => {
    //     setusers([])
    //     setfiledata([])
    //     setfilename([])
    //     setlen([])
    //     users = []
    //     filedata = []
    //     filename = []
    //     len = []
    //     fetchApi()
    //     console.log(data)
    //     console.log('deleted')
    //     Swal.fire(
    //       `${data.message}`,
    //       `${data.filename}`,
    //       'success'
    //     ).then(() => {
    //       navigate('/fileusers')
    //     })
    //   })
  }
  async function handledeleteuser(id, name, file) {
    let obj = Object.fromEntries(file);
    setoldddata(obj)
    console.log(id, name, obj)
    let url = `http://localhost:5000/usersrequest`
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        action: 'deleteuser',
        id: id,
        name: name,
        olddata: obj,
        email: user
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(json => json.json()).then((data) => {
      console.log(data)
      Swal.fire(
        `${(data.message.includes('already')) ? data.message : 'Request sent to admin'}`,
        'Waiting for admin to response',
        'success'
      ).then(() => {
        setoldddata(null)
        seteditactive(false)
        let maindiv = document.getElementById('display');
        maindiv.classList.remove('disp')
      })
    })

    // setusers([])
    // setfiledata([])
    // setfilename([])
    // setlen([])
    // users = []
    // filedata = []
    // filename = []
    // len = []
    // // console.log(index)
    // // console.log(name)
    // let posturl = 'http://localhost:5000/getdeletedata'
    // let url = `http://localhost:5000/deletefileuser/${id}`
    // const [res1, res2] = await Promise.all([
    //   fetch(posturl, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       index: index,
    //       name: name
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //     }
    //   }).then(async (json) => await json.json())
    //     .then(data => {
    //       console.log(data)
    //     }),
    //   fetch(url, {
    //     method: "DELETE",
    //     body: JSON.stringify({
    //       index: index,
    //       name
    //     }),
    //   }).then(async (json) => await json.json()).then(data => {
    //     fetchApi();
    //     // console.log("before fetch",url)
    //     console.log(data)
    //   }).then(() => {
    //     // console.log("array id",id);
    //     Swal.fire(
    //       "Deleted the user",
    //       '',
    //       'success'
    //     )
    //   })
    // ]).then(() => {
    // });
  }
  async function handleedit(id, name, index, file) {
    setoldddata(null)
    console.log(id, name, index, file)
    seteditactive(true)
    setfield(file)
    let data = [id, name, index]
    setdeletedata(data)
    let obj = Object.fromEntries(file);
    setoldddata(obj)
    setupdateddata('')
    // let url= `http://localhost:5000/usersrequest`
    // fetch(url,{
    //   method:'POST',
    //   body:JSON.stringify({
    //     action:'oneditdata',
    //     id:id,
    //     index,
    //     name,
    //     data:file,
    //     useremail:user
    //   }),
    //   headers:{
    //     "Content-Type":"application/json"
    //   }
    // })
    // .then(json => json.json()).then(data => {
    //   console.log(data)
    //   Swal.fire(
    //     "Request sent to admin",
    //     'Waiting for admin for changes',
    //     'success'
    //   ).then(() => {
    //   })
    // })
    let maindiv = document.getElementById('display');
    maindiv.classList.add('disp')

  }
  const handleFieldChange = (index, newValue) => {
    console.log(index, newValue)
    // Create a copy of the 'field' array
    const updatedField = [...field];

    // // Update the value at the specified index
    updatedField[index][1] = newValue;
    // console.log(field[index][1])
    // // Update the state with the new array
    setfield(updatedField);
    // console.log(field)
    let obj = Object.fromEntries(field);
    console.log(obj)
    setupdateddata(obj)
    // // setfield(obj)
    const updatedfile = [...filedata]
    updatedfile[deletedata[2]] = field
  };
  const handleSave = (id, index, name, olddata, data) => {
    console.log(id, index, olddata, data)
    if (data) {
      let url = `http://localhost:5000/usersrequest`
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          action: 'onsavedata',
          id: id,
          name: name,
          index: index,
          olddata,
          data,
          email: user
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(json => json.json()).then((data) => {
        console.log(data)
        Swal.fire(
          `${(data.message.includes('already')) ? data.message : 'Request sent to admin'}`,
          'Waiting for admin to response',
          'success'
        ).then(() => {
          setoldddata(null)
          seteditactive(false)
          let maindiv = document.getElementById('display');
          maindiv.classList.remove('disp')
        })
      })
    }
    // let url = `http://localhost:5000/updatefiledata/${id}`
    // fetch(url, {
    //   method: 'put',
    //   body: JSON.stringify({
    //     index,
    //     olddata: olddata,
    //     data: data
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // }).then(json => json.json()).then(data => {
    //   console.log(data)
    //   Swal.fire(
    //     "Saved",
    //     '',
    //     'success'
    //   ).then(() => {
    //     seteditactive(false)
    //     let maindiv = document.getElementById('display');
    //     maindiv.classList.remove('disp')
    //   })
    // })
  }
  // console.log(deletedata)
  const handleeditdelete = async () => {
    handledeleteuser(deletedata[0], deletedata[1], deletedata[2])
    // window.location.reload()
    seteditactive(false)
    editactive = false
    console.log('object')
  }
  const handlereset = (field) => {
    Swal.fire(
      "cancelled",
      '',
      'success'
    ).then(() => {
      seteditactive(false)
      let maindiv = document.getElementById('display');
      maindiv.classList.remove('disp')
    })
  }
  let url = 'http://localhost:5000/fileusers'
  let fetchApi = async () => {
    try {
      await fetch(url, {
        method: 'get',
        headers: {
          'x-access-token': sessionStorage.getItem('token')
        }
      }).then(json => json.json()).then(async (data, id) => {
        // console.log(data.fileusers[0].data.forEach((data,id)=>{console.log(Object.keys(data))}))
        // console.log(data)
        // console.log('iycviyv',data.message.includes('expired'))
        // console.log(data.message.includes('expired'))
        if(data.message.includes('expired')){
          Swal.fire(`${data.message}`).then(()=>{
            navigate('/login')
          })
        }else{
        await data.fileusers.forEach(async (element, id) => {
          // console.log(element)
          let filedetails = element.data.map((data, id) => {
            // console.log(Object.entries(data))
            return (Object.entries(data))
          })
          // console.lognnnn(filedata.length)
          if (filedata.length == 0) {
            setfilename(flname => [...flname, element.name])
            setfiledata((oldvalues) => [...oldvalues, filedetails])
            setlen((len) => [...len, element.data.length])
            // setfiledata( filedetails)
            // console.log("at 188", filedata)
          }
          // console.log(element.length)
        });
      }
        setusers(data.fileusers)
        // clearInterval(intervalId);
        // console.log(filedata)
        if(filedata.length>0){
          setLoading(false)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(filedata.length)
  useEffect(() => {
    fetchApi();
    // console.log(filedata)
    // console.log(users)
    setuser(sessionStorage.getItem('email'))
    seteditactive(sessionStorage.getItem('edit'))
    // console.log(len)
  }, [filedata.length])
  return (
    <>
    <>
    {(loading)?
    <div>
      <NavafterLogin
        id={editactive}
      />
    <div className="loader-container">
    <div className="loader">
    </div>
    </div>
    {/* <h1>loading data </h1> */}
    </div>
    :
    <>  
      <NavafterLogin
        id={editactive}
      />
      <>
      {(users && users.length > 0) ? <div class="card mb-3" id='display' style={{ Height: "100%" }}>
        <div className='d-flex flex-wrap' id="main" >
          {
            filedata.map((filedata, id) => {
              // console.log(id)
              return (
                <>
                  <div style={{ width: '100%', margin: '12px', padding: '5px', textAlign: 'center',overflow:'hidden'}}>
                    <h5>{(users) ? <>File Name - {filename[id]}</> : ''}</h5>
                    {/* {console.log(users[id])} */}
                    <button type="button" class="btn btn-danger fs-0" style={{ fontSize:"10px" }} onClick={() => handledelete(users[id]._id, filename[id])}>Delete File</button>
                    <button type="button" class="btn btn-primary" id='editaddbtn' style={{fontSize:"10px" }} onClick={() => { Swal.fire('Added', 'Implementation is still pending') }}>Add Data</button>
                  </div>
                  {
                    filedata.map((file, index) => {
                      return (
                        <div class="card d-flex flex-wrap justify-content-center p-2" style={{ fontSize:'8px', width: "180px", margin: '5px',margin:'0px 10px 10px 10px',overflow:'hidden' }}>
                          <div class="card-body" id='id1'>
                            {/* {(file[4])?console.log('yes'):console.log('no')} */}
                            {(file[0]) ? <><b>{file[0][0]}</b> = <b>{file[0][1]}</b></> : ''}
                            <br />
                            {(file[1]) ? <><b>{file[1][0]}</b> = <b>{file[1][1]}</b></> : ''}
                            <br />
                            {(file[2]) ? <><b>{file[2][0]}</b> = <b>{file[2][1]}</b></> : ''}
                            <br />
                            {(file[3]) ? <><b>{file[3][0]}</b> = <b>{file[3][1]}</b></> : ''}
                            <br />
                            {(file[4]) ? <><b>{file[4][0]}</b> = <b>{file[4][1]}</b></> : ''}
                            <br />
                            {(file[5]) ? <><b>{file[5][0]}</b> = <b>{file[5][1]}</b></> : ''}
                            <br />
                            {(file[6]) ? <><b>{file[6][0]}</b> = <b>{file[6][1]}</b></> : ''}
                            <br />
                            {(file[7]) ? <><b>{file[7][0]}</b> = <b>{file[7][1]}</b></> : ''}
                            <br />
                            <button type="button" style={{ margin: "5px",fontSize:"9px" }} class="btn btn-success" onClick={() =>
                              handleedit(users[id]._id,
                                users[id].name,
                                index,
                                file,
                              )}>Edit</button>
                            <button type="button" class="btn btn-danger" style={{textAlign:'left', margin: "5px",fontSize:"9px" }} onClick={() =>
                              handledeleteuser(users[id]._id, users[id].name, file,
                              )}>Delete</button>
                          </div>
                        </div>
                      )
                    })
                  }
                   {/* <h1 style={{color:'black'}}>isddcshyvihb</h1> */}
                </>

              )
            })}
            <hr style={{fontSize:"10px",borderTop: "1px solid black" }}/>
        </div>
      </div>
        : <div style={{
          margin: "20%",
          color: "white",
          backgroundColor: "red",
          height: '150px',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          {/* <div id="loading">
        <div id="loader" class="loader">
        </div>
        <br /><br />
        <h1 id="content">Loading data Please wait</h1>
    </div> */}
          <h1>No users to display</h1><br />
          <button className='btn btn-primary'
            onClick={() => navigate('/login')}>login</button>
        </div>
        }
        </>
      <>{
        (editactive)
          ? <>
            {
              (field) ? <div id='editdiv'>
                <table>
                  {
                    field.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data[0]}</td><td><input type='text' value={data[1]} onChange={(e) => { handleFieldChange(index, e.target.value) }} /></td><br /><br />
                        </tr>
                      )
                    })
                  }
                </table>
                <button type="button" id='editbtn1' class="btn btn-success" onClick={() => { handleSave(deletedata[0], deletedata[2], deletedata[1], olddata, updateddata) }}>Save</button>
                <button type="button" id='editbtn2' class="btn btn-danger" onClick={() => { handleeditdelete() }}>Delete</button>
                <button type="button" id='editbtn3' class="btn btn-primary" onClick={() => { handlereset() }}>cancel</button>
              </div> : 'no data'
            }
          </>
          : <>{!users || !len &&
            <div style={{
              margin: "20%",
              color: "white",
              backgroundColor: "red",
              height: '30vh',
              textAlign: 'center'
            }}>
              <h1>Error to display</h1>
              <button className='btn btn-primary'
                onClick={() => navigate('/fileupload')}>file upload</button>
            </div>
          }
          </>
      }
      </>
      </>}</>
    </>
  )
}