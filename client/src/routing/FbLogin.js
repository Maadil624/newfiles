import React from 'react'

function login(){
    window.location.href='http://localhost:5000/facebook'
}
function FbLogin() {
  return (
    <div className='fblogin'>
      <button type='button' onClick={login} id='fbbtn'>
        facebook login
      </button>
    </div>
  )
}

export default FbLogin
