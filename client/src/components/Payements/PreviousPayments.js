import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

function PreviousPayments() {
    const [id,setId] = useState();
    const [bookings, setBookings] = useState();

    


    if (localStorage.getItem("token") == null){

        alert("Please Login")
        window.location.replace("/login")
  
  
    }



    useEffect((e) => {
        //Runs on every render 

        console.log("useEffect Called")
        
        const len = localStorage.getItem("token").length

        let result = localStorage.getItem("token").slice(1,len-1)
        const abc = {token:result}
        
        
        axios.post('http://localhost:5000/user/view', abc).then(res=>{
           
            
                setId(res.data.uniqueID)
                console.log(res.data.uniqueID)
                const ids = res.data.uniqueID
        
        axios.get(`http://localhost:5000/payment/book/${ids}`).then(res => {
         
         if(res.data.length != 0){
              setBookings(res.data)
         }else{
           
            
         }

            console.log(res.data)

            
        })
                
              
            
        })
        
        
        
        .catch((err)=>{
            alert(err);
        })
  
    },[]);


    


    











  return (
    <div className="ml-5" style={{marginLeft: "50px"}}>
        <h1>Payment History</h1>

       

        {bookings? <div>
            {bookings.map((booking,index) => (
                <div>
                    <Card className="mb-2" key={booking._id} border="primary" style={{ width: '35rem' }}>
        <Card.Header>{index+1}.  <strong>Payment Info : {booking.info}</strong> </Card.Header>
        <Card.Body>
          <Card.Title>Payed Amount  : Rs.{booking.price} /=</Card.Title>
          <Card.Title>Payment id : {booking._id}</Card.Title>
            <Card.Title>Used Credit Card : {booking.cardno}</Card.Title>
            
          <Card.Text>
            Payed Date : {booking.createdAt.substring(0,10)} , {booking.createdAt.substring(11,16)} 
            <div className="row mt-2">
            
               


            </div>
          </Card.Text>
        </Card.Body>
      </Card>
     
      </div>



            ))}
        </div> :  <div><p>You have not done any payments.</p></div> }


            

        







        
    </div>
  )
}

export default PreviousPayments