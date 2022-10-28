import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

function ViewBookings() {
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
        
        axios.get(`http://localhost:5000/journey/book/${ids}`).then(res => {
         
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


    


    const deleteBookings = (e) =>{

        const ID = e.target.id;

        axios.delete(`http://localhost:5000/journey/${ID}`).then((res) => {
            console.log(res.data)
            alert('Booking Deleted')
            window.location.reload();

            



        })

    }











  return (
    <div className="ml-5" style={{marginLeft: "50px"}}>
        <h1>My Journeys</h1>

       

        {bookings? <div>
            {bookings.map((booking,index) => (
                <div>
                    <Card className="mb-2" key={booking._id} border="primary" style={{ width: '35rem' }}>
        <Card.Header>{index+1}.  <strong>Journey ID - {booking._id}</strong> </Card.Header>
        <Card.Body>
          <Card.Title>Starting Point  : {booking.start}</Card.Title>
          <Card.Title>Destination : {booking.end}</Card.Title>
            <Card.Title>Distance : {booking.distance}</Card.Title>
            <Card.Title>Price : {booking.price}</Card.Title>
          <Card.Text>
            Created at {booking.createdAt.substring(0,10)} , {booking.createdAt.substring(11,16)} 
            <div className="row mt-2">
            
                <div className="col-6 md-4">
                    <button className="btn btn-danger" id={booking._id} onClick={(e)=> deleteBookings(e)}>Cancel Reservation</button>
                    </div>


            </div>
          </Card.Text>
        </Card.Body>
      </Card>
     
      </div>



            ))}
        </div> :  <div><p>You have not booked tables. Please Book a table from the menu</p></div> }


            

        







        
    </div>
  )
}

export default ViewBookings