import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

function Dashboard() {
    if (localStorage.getItem("admin") == null){

       
        window.location.replace("/adminlogin")


    }

    const logout = () => {
        localStorage.removeItem("admin");
        window.location.replace("/adminlogin")
    }
   



  return (
    <div className="container mt-5" style={{marginLeft:'300px'}}>
        <h2>Admin Dashboard</h2>

        


        <div className="row mt-5">

        
        <a href='/allcardrequests'>
        <button  style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> All Card Requests</button>
        </a>
        
    

        <a href="/alljourneys">
        <button style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> All Journeys </button>
  </a>      

  <a href="/allusers">
        <button style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> All Users</button>


  </a> 

    <a >
  
        <button onClick={logout} style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> Logout</button>

        </a>
 

 

  </div>

        

      
    </div>
  )
}

export default Dashboard
