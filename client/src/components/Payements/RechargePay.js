import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Col, Form, Row } from 'react-bootstrap';

function RechargePay() {

    const [uniqueID , setUniqueID] = useState('');
    const [info, setInfo] = useState('');
    const [card, setCard] = useState('');
    const [expire, setExpire] = useState('');
    const [cvv, setCvv] = useState('');
    const [price, setPrice] = useState('');

    

    const [validated, setValidated] = useState(false);


    useEffect((e) => {
        //Runs on every render 
        
        const len = localStorage.getItem("token").length
        let result = localStorage.getItem("token").slice(1,len-1)
        const abc = {token:result}
        
        
        axios.post('http://localhost:5000/user/view', abc).then(res=>{
           
            
                setUniqueID(res.data.uniqueID)
                
                console.log(res.data)
            
        }).catch((err)=>{
            alert(err);
        })

    });



    const addPayment =  async(e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
    else{
    e.preventDefault();
        const newStudent = {
           uniqueID: uniqueID,
                info : "Recharge Smart Card",
                cardno: card,
                expire,
                cvv,
                price



        }
    
       await axios.post('http://localhost:5000/payment/add', newStudent).then((res)=>{
           alert("Payment Successful")
            console.log(res.data)
            
            
            
        })
    
    
    }
    setValidated(true);
}


const handleCardDisplay = () => {
    const rawText = [...card.split(' ').join('')] // Remove old space
    const creditCard = [] // Create card as array
    rawText.forEach((t, i) => {
        if (i % 4 === 0) creditCard.push(' ') // Add space
        creditCard.push(t)
    })
    return creditCard.join('') // Transform card array to string
}










  return (
    <div>

         <div style={{marginLeft:"380px"}} >
         <div className="container mt-3" >
        <div className="shadow-sm p-3 mb-5 bg-white rounded" style={{maxWidth:"600px"}}>
            <h1>Recharge Smart Card</h1>
            <hr/>

            


            <Form noValidate validated={validated} onSubmit={(e) => addPayment(e)}>
    <div>

            <label  for="image">Credit Card Number</label>
            <input type="text"
           
            className="form-control mb-3"
            placeholder="Card Number"
            value={handleCardDisplay()} 
            onChange={(e)=> setCard(e.target.value)}
            maxLength="20"
            required />
            <Form.Control.Feedback type="invalid"className=" mb-2">
              Please provide Credit Card Number
            </Form.Control.Feedback>
           

</div>
            <Row>
        <Col>
         <div>
            <label  for="description">Expire Date</label>
<input type="text"
            id="description"
            className="form-control mb-3 "
            placeholder="Expire Date"
            value={expire}
            maxLength="5"
            onChange={(e)=> setExpire(e.target.value)}
            required />
             <Form.Control.Feedback type="invalid"className=" mb-2">
              Please provide Expire Date
            </Form.Control.Feedback>
           
</div>



        </Col>


        <Col>
 <div>
            <label  for="users">CVV </label>
<input type="text"
            id="users"
            className="form-control col-md-2 mb-3"
            placeholder="CVV"
            value={cvv}
            maxLength="3"
           
            onChange={(e)=> setCvv(e.target.value)} 
            required />
             <Form.Control.Feedback type="invalid"className=" mb-2">
              Please provide CVV
            </Form.Control.Feedback>
          
</div>

          



        </Col>
      </Row>
            



           

           

        
<div>

            <label  for="image"> Price</label>
            <input type="text"
            id="image"
            className="form-control mb-3"   
            placeholder="Price"
            
           
            value={price}   
            onChange={(e)=> setPrice(e.target.value)}
            
            required />
             <Form.Control.Feedback type="invalid"className=" mb-2">
              Please Enter Pay Amount
            </Form.Control.Feedback>

</div>
            <button style={{width:"100%"}} type="submit" class=" btn btn-danger btn-lg btn-block" > Add Journey</button>


        </Form>

        </div>


    </div>
    </div>
      
    </div>
  )
}

export default RechargePay;
