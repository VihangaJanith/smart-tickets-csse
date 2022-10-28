import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

function Dashboard() {

    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [tokens, setTokens] = useState('');

    if (localStorage.getItem("token") == null){

       
        window.location.replace("/login")


    }

    const fire = async() => {
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
              

            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Get Your Smart Card',
            text: "Select Option",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Tempory Smart Token',

            cancelButtonText: 'Permanant Smart Card',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("/tempory")
             
            }
            if(result.dismiss === Swal.DismissReason.cancel){
                window.location.replace("/payforcard")
            }
             else if (
              /* Read more about handling dismissals below */
                console
              
            ) {
              
            }


          })

          
          

    }

    const logout=(e)=>{
       
        if (window.confirm("You Want To LogOut ")){
          const token = localStorage.removeItem("token");
   
          if (token == null  ){
            alert("log  Out Success ");
            window.location.replace("/login")
          } }
          
       }
    useEffect((e) => {
        //Runs on every render 
        
        const len = localStorage.getItem("token").length
        let result = localStorage.getItem("token").slice(1,len-1)
        const abc = {token:result}
        
        
        axios.post('http://localhost:5000/user/view', abc).then(res=>{
           
            
                setName(res.data.name)
                setEmail(res.data.email)
                setPhone(res.data.phone) 
                setTokens(res.data.uniqueID)
                
                console.log(res.data)
            
        }).catch((err)=>{
            alert(err);
        })

    });



  return (
    <div className="container mt-5" style={{marginLeft:'300px'}}>
        <h2>{name}'s Smart Tickets Dashboard</h2>

        


        <div className="row mt-5">

        
        <a>
        <button onClick={fire} style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> Get My Smart Card </button>
        </a>

        <a href="/addjourney">
        <button style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> New Journey </button>
  </a>      

  <a href="/viewJourney">
        <button style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> Previous Journeys</button>
  </a> 

   <a href="/rechargepay">
        <button style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> Recharge My Smart Card</button>
  </a> 
  <a href="/previouspayments">
        <button style={{width:"600px"}} class=" btn btn-danger btn-lg btn-block mb-3"> Payment History</button>
  </a>               

  </div>

        

      
    </div>
  )
}

export default Dashboard
