import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router';
import './user.css'
import NavafterLogin from './NavafterLogin.js';
export default function AllfileUsers() {
  // All file displaying state variables
  let [users, setusers] = useState();
  let [len, setlen] = useState([]);
  let [filename, setfilename] = useState([]);
  let [filedata, setfiledata] = useState([]);
  let [field, setfield] = useState();
  let [editactive, seteditactive] = useState();
  let [deletedata, setdeletedata] = useState();
  let [updateddata, setupdateddata] = useState();
  let [olddata, setoldddata] = useState();
  const [loading, setLoading] = useState(true);
  // navigation variable
  let navigate = useNavigate();

  let handledelete = async (id) => {
    // console.log('file deleted',id)
    let url = `http://localhost:5000/deletefile/${id}`
    await fetch(url, {
      method: 'DELETE',
    }).then(json => json.json())
      .then((data) => {
        setusers([])
        setfiledata([])
        setfilename([])
        setlen([])
        users = []
        filedata = []
        filename = []
        len = []
        fetchApi()
        // console.log(data)
        // console.log('deleted')
        Swal.fire(
          `${data.message}`,
          `${data.filename}`,
          'success'
        ).then(() => {
          navigate('/fileusers')
        })
      })
  }
  async function handledeleteuser(id, name, index) {
    setusers([])
    setfiledata([])
    setfilename([])
    setlen([])
    users = []
    filedata = []
    filename = []
    len = []
    // console.log(index)
    // console.log(name)
    let posturl = 'http://localhost:5000/getdeletedata'
    let url = `http://localhost:5000/deletefileuser/${id}`
    const [res1, res2] = await Promise.all([
      fetch(posturl, {
        method: 'POST',
        body: JSON.stringify({
          index: index,
          name: name
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(async (json) => await json.json())
        .then(data => {
          console.log(data)
        }),
      fetch(url, {
        method: "DELETE",
        body: JSON.stringify({
          index: index,
          name
        }),
      }).then(async (json) => await json.json()).then(data => {
        fetchApi();
        // console.log("before fetch",url)
        console.log(data)
      }).then(() => {
        // console.log("array id",id);
        Swal.fire(
          "Deleted the user",
          '',
          'success'
        )
      })
    ]).then(() => {
      let maindiv = document.getElementById('display');
    maindiv.classList.remove('disp')
    });
  }
  async function handleedit(id, name, index, file) {
    seteditactive(true)
    setfield(file)
    let data = [id, name, index]
    setdeletedata(data)
    // console.log(deletedata)
    // console.log(name)
    console.log(file)
    let obj = Object.fromEntries(file);
    setoldddata(obj)
    let maindiv = document.getElementById('display');
    maindiv.classList.add('disp')
  }
  const handleFieldChange = (index, newValue) => {
    // Create a copy of the 'field' array
    const updatedField = [...field];

    // Update the value at the specified index
    updatedField[index][1] = newValue;
    console.log(field[index][1])
    // Update the state with the new array
    setfield(updatedField);
    console.log(field)
    let obj = Object.fromEntries(field);
    console.log(obj)
    setupdateddata(obj)
    // setfield(obj)
    const updatedfile = [...filedata]
    updatedfile[deletedata[2]] = field
  };
  const handleSave = (id, index, olddata, data) => {
    console.log(data)
    let url = `http://localhost:5000/updatefiledata/${id}`
    fetch(url, {
      method: 'put',
      body: JSON.stringify({
        index,
        olddata: olddata,
        data: data
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(json => json.json()).then(data => {
      console.log(data)
      Swal.fire(
        "Saved",
        '',
        'success'
      ).then(() => {
        seteditactive(false)
        let maindiv = document.getElementById('display');
        maindiv.classList.remove('disp')
      })
    })
  }
  // console.log(deletedata)
  const handleeditdelete = async () => {
    handledeleteuser(deletedata[0], deletedata[1], deletedata[2])
    // window.location.reload()
    seteditactive(false)
  }
  const handlereset = (field) => {
    // field.forEach(data=>{
    //   data[1]=''
    // }).then(()=>{
    // })
    Swal.fire(
      "Reset",
      '',
      'success'
    )
  }
  let url = 'http://localhost:5000/fileusers'
  let fetchApi = async () => {
    try {
      await fetch(url,{
        method:'get',
        headers:{
          'x-access-token':sessionStorage.getItem('token')
        }
      }).then(json => json.json()).then(async (data, id) => {
        // console.log(data.fileusers[0].data.forEach((data,id)=>{console.log(Object.keys(data))}))
        // console.log(data)
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
          // console.log(filedata.length)
          if (filedata.length == 0) {
            setfilename(flname => [...flname, element.name])
            setfiledata((oldvalues) => [...oldvalues, filedetails])
            // setfiledata( filedetails)
            // console.log("at 188",filedata)
            setlen((len) => [...len, element.data.length])
          }
          // console.log(element.length)
        });
        setusers(data.fileusers)
        if(filedata.length>0){
          setLoading(false)
        }
      }
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchApi();
    // console.log(filedata)
    // console.log(users)
    // console.log(len)
    // console.log(field)
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
    <NavafterLogin/>
      {(users&&users.length>0) ? <div class="card mb-3" id='display' style={{ Height: "100%" }}>
        <div className='d-flex flex-wrap' id="main" >
          {
            filedata.map((filedata, id) => {
              // console.log(id)
              return (
                <>
                  <div style={{ width: '100%', margin: '12px', padding: '5px', textAlign: 'center',overflow:'hidden'}}>
                    <h5>{(users) ? <>File Name - {filename[id]}</> : ''}</h5>
                    <button type="button" class="btn btn-danger" style={{fontSize:"10px" }} onClick={() => handledelete(users[id]._id)}>Delete File</button>
                    <button type="button" class="btn btn-primary" id='editaddbtn' style={{fontSize:"10px" }} onClick={() => Swal('Added','Implementation is still pending')}>Add Data</button>
                  </div>
                  {
                    filedata.map((file, index) => {
                      return (
                        <div class="card d-flex flex-wrap text-left justify-content-center m-1 p-2" style={{ fontSize:'8px', width: "180px", margin: '5px',margin:'0px 10px 10px 10px',overflow:'hidden' }}>
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
                            <button type="button" class="btn btn-danger" style={{ margin: "5px",fontSize:"9px" }} onClick={() =>
                              handledeleteuser(users[id]._id, users[id].name, index,
                              )}>Delete</button>
                          </div>
                        </div>  
                      )
                    })

                  }
                  <div style={{width:'100%'}}>
                    <br/>
                  <hr style={{fontSize:"10px",borderTop: "2px solid black" }}/>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
        : <div style={{
          margin: "20%",
          color: "white",
          backgroundColor: "red",
          height: '20vh',
          textAlign: 'center'
        }}>
          <h1>No users to display</h1>
        </div>}
      {
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
                <button type="button" id='editbtn1' class="btn btn-success" onClick={() => { handleSave(deletedata[0], deletedata[2], olddata, updateddata) }}>Save</button>
                <button type="button" id='editbtn2' class="btn btn-danger" onClick={() => { handleeditdelete() }}>Delete</button>
                <button type="button" id='editbtn3' class="btn btn-primary" onClick={() => { seteditactive(false)
                let maindiv = document.getElementById('display');
                maindiv.classList.remove('disp')
                }}>cancel</button>
              </div> : 'no data'
            }
          </>
          :<>{!users||!len&&
            <div style={{
              margin: "20%",
              color: "white",
              backgroundColor: "red",
              height: '30vh',
              textAlign: 'center'
            }}>

            <h1>No users to display</h1>
            <button className='btn btn-primary'
            onClick={()=>navigate('/fileupload')}>file upload</button>
          </div>
          }
      </>
      }</>
    }</>
    </>
  )
}