import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Col, Form, Row } from 'react-bootstrap';

function CardDelivery() {

    const [uniqueID , setUniqueID] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [province, setProvince] = useState('');


    const [validated, setValidated] = useState(false);


    useEffect((e) => {
        //Runs on every render 
        
        const len = localStorage.getItem("token").length
        let result = localStorage.getItem("token").slice(1,len-1)
        const abc = {token:result}
        
        
        axios.post('http://localhost:5000/user/view', abc).then(res=>{
           
            
                setUniqueID(res.data.uniqueID)
                setPhone(res.data.phone)
                
                console.log(res.data)
            
        }).catch((err)=>{
            alert(err);
        })

    });



    const addDetails =  async(e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
    else{
    e.preventDefault();
        const newStudent = {
           uniqueID: uniqueID,
                address,
                city,
                phone : phone,
                postalCode,
                province


        }
    
       await axios.post('http://localhost:5000/delivery/add', newStudent).then((res)=>{
           
            console.log(res.data)
            alert("Delivery Details Added")
            window.location = '/dashboard'
            
            
            
        })
    
    
    }
    setValidated(true);
}






  return (
    <div>

         <div style={{marginLeft:"380px"}} >
         <div className="container mt-3" >
        <div className="shadow-sm p-3 mb-5 bg-white rounded" style={{maxWidth:"600px"}}>
            <h1>Add Delivery Details </h1>
            <hr/>

           

            <Form noValidate validated={validated} onSubmit={(e) => addDetails(e)}>
    <div>

            <label  for="image">Address</label>
            <input type="text"
           
            className="form-control mb-3"
            placeholder="Address"
            value={address} 
            onChange={(e)=> setAddress(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid"className=" mb-2">
              Please provide Address
            </Form.Control.Feedback>

</div>
            <Row>
        <Col>
         <div>
            <label  for="description">City</label>
<input type="text"
            id="description"
            className="form-control mb-3 "
            placeholder="City"
            value={city} 
            onChange={(e)=> setCity(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid"className=" mb-2">
              Please Enter City
            </Form.Control.Feedback>
           
</div>



        </Col>


        <Col>
 <div>
            <label  for="users">Province </label>
{/* <input type="text"
            id="users"
            className="form-control col-md-2 mb-3"
            placeholder="Province"
            value={province}
           
            onChange={(e)=> setProvince(e.target.value)} 
            required />
            <Form.Control.Feedback type="invalid"className=" mb-2">
              Please Enter Province
            </Form.Control.Feedback> */}

<Form.Select aria-label="Default select example"
            id="users"
            className="form-control col-md-2 mb-3"
            
            value={province}
             onChange={(e)=> setProvince(e.target.value)}>
     
      <option value="Western Province">Western Province</option>
        <option value="Southern Province">Southern Province</option>
        <option value="Central Province">Central Province</option>
        <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
        <option value="North Western Province">North Western Province</option>
        <option value="North Central Province">North Central Province</option>
        <option value="Uva Province">Uva Province</option>
        <option value="Eastern Province">Eastern Province</option>
        <option value="Northern Province">Northern Province</option>

    </Form.Select>



          
</div>

          



        </Col>
      </Row>
            



           

           

        
<div>

            <label  for="image"> postalcode</label>
            <input type="text"
            id="image"
            className="form-control mb-3"   
            placeholder="Postal Code"
            
           
            value={postalCode}
            onChange={(e)=> setPostalCode(e.target.value)}
            
            required />
             <Form.Control.Feedback type="invalid"className=" mb-2">
              Please Enter Postal Code
            </Form.Control.Feedback>

</div>
            <button style={{width:"100%"}} type="submit" class=" btn btn-danger btn-lg btn-block" > Add Details</button>


        </Form>

        </div>


    </div>
    </div>
      
    </div>
  )
}

export default CardDelivery;
