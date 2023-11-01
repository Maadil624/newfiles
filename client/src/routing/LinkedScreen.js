import React,{useEffect,useState} from 'react'
import './user.css'
import { useNavigate } from 'react-router'
export default function LinkedScreen() {
  const [data, setdata] = useState()
  let navigate=useNavigate()
    let fetchApi=async()=>{fetch('http://localhost:5000/linkedin',{
        method:'GET',
        headers:{
            "Content-Type": "application/json"
        }
    }).then(json=>json.json())
    .then((data)=>{
      setdata(Object.entries(data.data))
        console.log(typeof(data))
        console.log(Object.entries(data.data))
    })}
    async function handlelogout(){
      fetch('http://localhost:5000/logout').then((data)=>{
        console.log(data)
    })}
    
    useEffect(() => {
    fetchApi();
    // navigate('/fileupload')
    }, [])
  return (
    <div>
      {
      (data)
      ?
      <div className='linkeddiv'>
        <table id='linkedscreentable'>
          <tbody>
        {
          // console.log(typeof(data))
          data.map((data,id)=>{
            return(
              <tr id='linkedtablerow' key={id}>
                <td className='linkedtabledata' >
              {data[0]} </td><td  className='linkedtabledata'>{(id!=3)?data[1]:data[1][1]}</td>        
        </tr>
            ) 
          })
        }
        </tbody>
        </table>
        {/* <a href='https://www.linkedin.com/oauth/v2/'>logout</a> */}
        <a href='http://localhost:5000/logout'>logout</a>
        {/* <button className='btn btn-danger' onClick='http://localhost:5000/logout'>Logout</button> */}
      </div>
      :
      <div></div>
      }
    </div>
  )
}
