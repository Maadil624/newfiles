import React, { useEffect, useState } from 'react'
import axios from "axios"
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom'
import NavafterLogin from './NavafterLogin';
export default function Files() {
  let location = useLocation()
  const navigate = useNavigate();
  const [file, setfile] = useState();
  let [msg, setmsg] = useState();
  let [errfile, seterrfile] = useState();
  let [sucess, setsucess] = useState();
  let [role, setrole] = useState();
  let files = file ? [...file] : []
  // const [upfile, setupfile] = useState([]);
  let handleChange = (event) => {
    setfile(event.target.files);
    // console.log(file)
  }
  // if(window.location.reload){
  //   sessionStorage.removeItem('sucess')
  // }
  useEffect(() => {
    // fileUpload()
    // navigate('/fileupload')
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get("token")
    // console.log(!sessionStorage.getItem('token'))
    if(!sessionStorage.getItem('token')){
      sessionStorage.setItem('token', token)
    }
    // sessionStorage.setItem('token', token)
    // const location = queryParams.get("location")
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.removeItem('sucess');
    //   sessionStorage.removeItem('token');
    // });
    // setsucess(sessionStorage.getItem('sucess'))
    // console.log(sucess)
    // if (!sessionStorage.getItem('token')) {
    //   Swal.fire(
    //     'token expired', '', 'error'
    //   ).then(() => {
    //     navigate('/login')
    //   })
    // }
  }, [])
  // let filesdatas=Object.entries(file);
  async function fileUpload(e) {
    e.preventDefault();
    // console.log(file)
    try {
      // console.log(typeof(filesdata))
      let filesdata = file ? [...file] : []
      // defining file extentions
      // let allowedTypes = [
      //   "application/vnd.ms-excel",
      //   "application/msexcel",
      //   "application/x-ms-excell",
      //   "application/x-excel",
      //   "application/xls",
      //   "application/csv",
      //   "text/csv",
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      //   "application/x-msexcel"
      // ]
      // console.log(filesdata.length > 3 || filesdata.length <= 0)
      if (filesdata.length > 3 || filesdata.length <= 0) {
        Swal.fire(
          'Select Min 1 & Max 3 Files',
          '',
          'error'
        ).then(() => {
          setfile(null)
        })
      }
      filesdata.forEach(file => {
        // if (!allowedTypes.includes(file.type)) {
        seterrfile(file.name)
        // console.log(errfile)
        // }
      })
      // console.log(filesdata)
      if (filesdata.length <= 3 && filesdata.length > 0) {
        const formData = new FormData();
        // console.log(typeof(filesdata))
        filesdata.forEach((file, i) => {
          formData.append(`file-${i}`, file)
          // console.log(...formData.values())  
        });
        const values = [...formData.values()];
        // console.log(values, "line 17 files");

        const response = await axios.post('http://localhost:5000/fileupload', formData, {
          headers: {
            'x-access-token': sessionStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        // setextfile()
        setmsg(response.data.message)
        // setvalue(response.data.ext_value)
        if (response) {
          if (response.data.message.includes('partially') || response.data.message.includes('Exists')) {
            Swal.fire({
              title: `
              ${(response.data.new_files.length > 0)
                  ?
                  response.data.new_files.length +
                  ' new files uploaded\n' +
                  `${response.data.ext_filesnames.length} Already Exists \n` +
                  'Do you want to replace the old-files to new-files?'
                  :
                  (response.data.ext_filesnames.length > 0)
                    ? 'All files already exists.\n Do you want to replace the old-files to new-files?'
                    : 'Do you want to replace the old-files to new-files?'}`,
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Save',
              denyButtonText: `Don't save`,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                // setvalue(true)
                // (response)?
                if (response.data && response.data.new_files.length > 1) {
                  // let extdata=[...formData.()]
                  response.data.new_files.forEach(async (data, id) => {
                    // let filekey=ext_file[]
                    // extdata[id]
                    formData.delete(data.id)
                    // console.log('102', data)
                    formData.append('value', true)
                    let files_replaced = await axios.post('http://localhost:5000/fileupload', formData, {
                      headers: {
                        'x-access-token': sessionStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                      }
                    }).then(() => {
                      console.log('files replaced')
                    })
                  })
                } else {
                  formData.append('value', true)
                  let files_replaced = await axios.post('http://localhost:5000/fileupload', formData, {
                    headers: {
                      'x-access-token': sessionStorage.getItem('token'),
                      'Content-Type': 'multipart/form-data'
                    }
                  }).then(() => {
                    console.log('files replaced')
                  })
                  console.log('106', files_replaced)

                }
                // console.log('keys',...formData.keys())
                // console.log('values',...formData.values())
                // console.log('entries',...formData.entries())
                // :''
                // existing files saving code
                // console.log([...formData.values()])
                Swal.fire('Files Replaced', 'new files replaced/added', 'success')
                setfile(null)
              } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
              }
            })
          }
          else {
            Swal.fire(
              `${response.data.message}`,
              `${response.data.message.includes('jwt expired') ? 'redirecting to login' : (response.data.file_name) ? response.data.file_name : response.data.message}`,
              `${response.data.message.includes('uploaded') ? 'success' : 'error'}`
            ).then(() => {
              // alert(value)
              // console.log(response.data.message.includes('Exists'))
              setfile(null)
              if (response.data.message.includes('jwt expired')) {
                navigate('/login')
              }
            })
          }
        }
        console.log(response.data)
      }
    } catch (error) {
      console.log('at Files', error)
      if (error) {
        // let err=error?error.response.data.message:'please upload csv file'
        Swal.fire(
          `${(error.response.data.message) ? error.response.data.message : 'Please Upload Csv files'}`,
          `upload err`,
          'warning'
        )
      }
    }
  }
  return (
    <>
      <NavafterLogin />
      {
        (sucess||!sucess) ?
          <form encType='multipart/form-data' id='form1' onSubmit={fileUpload}>
            <div className='files'>
              <label htmlFor='file' id='lbl' name='file'>
                {(file) ? `Total files selected : ${file.length}` : "Click Here to Upload Files"}
                <input type='file' id='file' name='file' multiple
                  required
                  onChange={handleChange}>
                </input>
              </label>
              <button type="submit" className="btn btn-danger btn-lg" id='upldbtn' name='btn'>Upload</button>
              <div>
                {(file) ?
                  <div style={{ textAlign: 'left', marginLeft: '30px' }}>
                    {files.map((file, id) => {
                      return (
                        <>
                          <h6 key={id}>File-Name : {file.name}</h6>
                        </>
                      )
                    })}
                    {/* <h6>Type: {file[0].type}</h6> */}
                  </div>
                  : <h1 style={{ textAlign: 'left', margin: '30px' }}>
                    please select a file...
                  </h1>
                }
              </div>
            </div>
          </form>
          : <div className='failed'>
            <h1>please login first</h1><br />
            <button type="button" class="btn btn-danger btn-lg" >
              <Link to="/login" style={{ "textDecoration": "none", "listStyle": "none", "color": "white" }}>Login
              </Link></button>
          </div>}
    </>
  )
}

// console.log(formdata.append('file',file))
// async function fileUpload(e){
//   e.preventDefault();
//   let url="http://localhost:5000/fileupload"
//   const formdata=new FormData();
//   formdata.append('filed',file)
//   console.log(formdata," form at 7")
//       fetch(url, {
//           method: "POST",
//           body:formdata,
//           headers: {
//               'Content-Type': 'multipart/form-data'
//           }
//       }).then(response => response.json())
//           .then((data) => {
//               console.log("data", data);
//           }).catch(err=>{
//             console.log("error at file uploading",err)
//           })
//       // alert("uploaded")
//   }