import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    
    <div style={{display:"flex",justifyContent:"space-around"}}>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      {/* <Link to="/admin">Admin Upload</Link>
      <Link to="/agent">Agent Dashboard</Link> */}
    </div>
   
  )
}

export default Navbar
