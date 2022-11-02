import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

import { QrReader } from 'react-qr-reader';

function Qrscan() {

    const [dat, setDat] = useState('No result');
    const [bookings, setBookings] = useState();
    const [payments, setPayments] = useState();

     
    const handleScan = () => {
    
            
            
        
            const ids = dat;
            
           
            
            axios.get(`http://localhost:5000/journey/book/${ids}`).then(res => {
             
             if(res.data.length != 0){
                  setBookings(res.data)
             }else{
               
                
             }
    
                console.log(res.data)
    
                
            }
            )


        
    }

    const payhistory = () => {
    
            
            
        
        const ids = dat;
        
       
        
        axios.get(`http://localhost:5000/payment/book/${ids}`).then(res => {
         
         if(res.data.length != 0){
              setPayments(res.data)
         }else{
           
            
         }

            console.log(res.data)

            
        }
        )


    
}



        


        
  
  
    



  return (
    <div className="container" style={{
    
        height: '400px',
      width: '400px',
      alignItems: 'center',  
    }}>
          <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setDat(result?.text);
          }

          if (!!error) {
            
          }
        }}
        style={{ width: '25%', height: '25%' }}
      />
      <p>{dat}</p>
      <div className="row">

        
      <button onClick={handleScan} class=" btn btn-danger mb-2">View Journeys</button>
      <button onClick={payhistory} class=" btn btn-danger ">View Payements</button>
</div>


      {bookings? <div>  
                          <button class="btn btn-primary mt-2 mb-2"onClick={(e) => setBookings("")}> Collapse</button>

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
            
               


            </div>
          </Card.Text>
        </Card.Body>
      </Card>
     
      </div>



            ))}
            
        </div> : null }


        {payments? <div>
            <button class="btn btn-primary"onClick={(e) => setPayments("")}> Collapse</button>
            {payments.map((payment,index) => (
                <div>

                    <Card className="mb-2" key={payment._id} border="primary" style={{ width: '35rem' }}>
        <Card.Header>{index+1}.  <strong>Payment Info : {payment.info}</strong> </Card.Header>
        <Card.Body>
          <Card.Title>Payed Amount  : Rs.{payment.price} /=</Card.Title>
          <Card.Title>Payment id : {payment._id}</Card.Title>
            <Card.Title>Used Credit Card : {payment.cardno}</Card.Title>
            
          <Card.Text>
            Payed Date : {payment.createdAt.substring(0,10)} , {payment.createdAt.substring(11,16)} 
            <div className="row mt-2">
            
                


            </div>
          </Card.Text>
        </Card.Body>
      </Card>
     
      </div>



            ))}
        </div> :  null}

    
      
    </div>
  )
}

export default Qrscan
