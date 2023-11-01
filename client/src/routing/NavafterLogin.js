import React, { useState, useEffect } from 'react'
import { Link, json, useNavigate } from "react-router-dom"
// import logo from "../images/logowhite.png"
import "./Nav.css"
import { useLocation } from 'react-router-dom';
export default function NavafterLogin(props) {
    const [notifications, setnotifications] = useState()
    const [value, setvalue] = useState()
    // let p = { ...props }
    // console.log(p)
    let admin = sessionStorage.getItem('Admin')
    let user = sessionStorage.getItem('user')
    const location = useLocation()
    const navigate = useNavigate();
    function navclick(event) {
        event.target.style.color = 'red';
        // event.target.innerHTML.style.color='red'
        // console.log(event.target.innerHTML.color='red');
    }
    // item.addEventListener('click', () => {
    //     navItems.forEach(i => {
    //     console.log(i)
    //         })
    //     });
    // });
    // function notidisplay() {
    //     console.log('notifications')
    // }
    function fetchNotifications() {
        setvalue(true)
        let url = 'http://localhost:5000/allNotifications'
        fetch(url).then(json => json.json()).then(data => {
            console.log(data.allNotifications);
            // console.log(data);
            (data.allNotifications.length >= 1) ? setnotifications(data.allNotifications) : setnotifications()
        })
    }
    function deleteNotifications(id) {
        // console.log('delete notification', id)
        let url = `http://localhost:5000/deletenotification/${id}`
        fetch(url, {
            method: 'DELETE'
        }).then(json => json.json()).then(data => {
            // setnotifications('')
            fetchNotifications()
            console.log(data)
        })
    }
    useEffect(() => {
        // fetchNotifications()
    }, [])
    return (
        <>
            {
                ((user) ? user.includes('user') : !admin) ?
                    <div className='bartop' style={{ zIndex: '2' }}>
                        <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" >
                            <div class="container-fluid">
                                {/* <img src={logo} alt='image' id="logo" /> */}
                                <div class="collapse navbar-collapse m-0 p-1" >
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="navbarSupportedContent" onClick={(e) => { navclick(e) }}>
                                        <li class="nav-item m-3"><a href='/' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Home</a></li>
                                        <li class="nav-item m-3"><Link to='/usersfiles' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Filesdata</Link></li>
                                        {/* <li><Link to='/createjob' style={{ "listStyle": "none", "textDecoration": "none", "margin": "25px", "color": 'black', "fontSize": "20px" }}>Create-Job</Link></li> */}
                                        <li class="nav-item m-3"><Link to='/alljob' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Careers</Link></li>
                                        {<li class="nav-item m-3"><Link to='/fileupload' style={{
                                            marginLeft: '10px',
                                            "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px"
                                        }}>fileupload</Link></li>}
                                    </ul>
                                </div>
                                <div class="rightbar">
                                    <ul class="rightbar">
                                    </ul>
                                </div>
                                <li style={{ listStyleType: 'none', padding: '10px' }}><button type="button" class="btn btn-danger btn-lg LRbtns" onClick={() => {
                                    sessionStorage.clear()
                                    navigate('/login')
                                }}>Logout</button></li>
                                {/* <i class="fa-solid fa-bell noti" style={{ "font-size": "30px" }} onClick={() => { fetchNotifications() }}></i> */}
                            </div>
                        </nav>
                    </div>
                    : <>
                        <div className='bartop' style={{ zIndex: '2' }}>
                            <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" >
                                <div class="" >
                                    <ul class="rightbar" onClick={(e) => navclick(e)} >
                                        <li><Link to='/Admin' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px", marginRight: '15px' }}>Home</Link> </li>
                                        <li><Link to='/fileusers' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Filesdata</Link></li>
                                        <li><Link to='/createjob' style={{
                                            "width": "100px",
                                            "listStyle": "none", "textDecoration": "none", "margin": "25px", "color": 'black', "fontSize": "20px"
                                        }}>Create-Job</Link></li>
                                        <li><Link to='/alljob' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>Careers</Link></li>
                                        <li><Link to='/fileupload' style={{
                                            marginLeft: '10px',
                                            "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px"
                                        }}>Fileupload</Link></li>
                                        <li style={{ marginLeft: '10px' }}>
                                            <Link to='/allusers' style={{ "listStyle": "none", "textDecoration": "none", "color": 'black', "fontSize": "20px" }}>DB-users</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="container-fluid " style={{ justifyContent: "end", float: 'right', right: '0px', marginRight: '25px' }} >
                                    <li style={{ listStyleType: 'none' }}><button type="button" class="btn btn-danger btn-lg LRbtns" onClick={() => {
                                        sessionStorage.clear()
                                        navigate('/login')
                                    }}>Logout</button></li>
                                </div>
                            </nav>
                        </div>
                    </>
            }
            {(value) ?
                <div class="notification">
                    <i
                        onClick={() => {
                            setvalue(false)
                        }}
                        style={{ fontSize: '20px' }} class="fa-regular fa-circle-xmark contentbtn"></i>
                    <div className='noticontent'>
                        {/* <button className='contentbtn' > */}
                        {/* </button> */}
                        {/* {console.log('notifications=', notifications)} */}
                        {/* {console.log(Object.entries(notifications))} */}
                        {/* {console.log(typeof notifications)} */}
                        <div className='notification_div'>
                            {(notifications != undefined)
                                ?
                                <>
                                    {
                                        notifications.map((item, index) => {
                                            console.log(item.Notification.action)
                                            // console.log(item.action.includes('hii'))
                                            return (
                                                <>
                                                    <h6 style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                        <span style={{ color: 'black', paddingRight: '5px' }}>{index + 1}</span>
                                                        <span style={{ color: 'green', display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                            FileId : {(item.Notification.fileid) ? item.Notification.fileid : 'Error'},
                                                            Requested : {(item.Notification.action.includes('onsave')) ? 'Data Updation ' : item.Notification.action},
                                                            Status : sucessfull
                                                        </span>
                                                        <span style={{ width: '10%', float: 'right' }} ><i onClick={() => deleteNotifications(item['_id'])} class="fa-regular fa-circle-xmark"></i></span>
                                                    </h6>
                                                    <hr />
                                                </>
                                            )
                                        })
                                    }
                                </>
                                :
                                <>No new Notifications</>
                            }
                        </div>
                    </div>
                </div> :
                <></>}
        </>
    )
}
