import React , {useState}from 'react'
import axios from 'axios'
import { Col, Form, Row } from "react-bootstrap";
import {  useEffect } from "react";


function Register() {

    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
  
  
    useEffect(()=>{

        const token = localStorage.getItem('token');

        
        if (token){
           
            window.location.replace("/dashboard");
           
        }
})


 
    const [validated, setValidated] = useState(false);

    const reg =  async(e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
    else{

        e.preventDefault();
    
        const newUser = {
            name,
            email,
            phone,
            password,
            confirmPass
        }
      //   if(newUser.name.length < 4){
      //       alert("Enter Full Name")
      //       return false;
      //   }
      //   if(newUser.mobile !=10){
      //     alert("Enter Valid Mobile")
      //     return false;
      // }
        if (newUser.email == '' || newUser.email.includes('@'  && '.com') == false ){

             alert("Enter Valid email Address")
      return false;
       }
        if (newUser.password != newUser.confirmPass){
            alert("Password not matched")
             return false;
        }   
    
        axios.post('http://localhost:5000/user/reg', newUser).then((res)=>{
            console.log(res.data)
            alert("Registration Success")
            
        }).catch((err)=>{
            alert(err);
        })
    
   
    }
    setValidated(true);
    }


  return (
    <div style={{marginLeft:"380px"}} >
         <div className="container mt-3" >
        <div className="shadow-sm p-3 mb-5 bg-white rounded" style={{maxWidth:"600px"}}>
            <h1>Sign Up</h1>
            <hr/>

            <Form noValidate validated={validated} onSubmit={(e) => reg(e)}>
<div>
                <label  for="name">Name</label>
            <input type="text"
            id="name"
            className="form-control  mb-3 "
            placeholder="Enter Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid" className=" mb-2">
              Please provide a valid Name
            </Form.Control.Feedback>
</div>
            <Row>
        <Col>
         <div>
            <label  for="description">Email</label>
<input type="text"
            id="description"
            className="form-control mb-3 "
            placeholder="Enter Email"
            value={email} 
            onChange={(e)=> setEmail(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid"className=" mb-2">
              Please provide a Email
            </Form.Control.Feedback>
</div>



        </Col>


        <Col>
 <div>
            <label  for="users">Phone Number </label>
<input type="text"
            id="users"
            className="form-control col-md-2 mb-3"
            placeholder="Enter Phone Number"
            value={phone}
            pattern="[0-9]{9,10}"
            onChange={(e)=> setPhone(e.target.value)} 
            required />
            <Form.Control.Feedback type="invalid" className=" mb-2">
              Please provide Mobile No
            </Form.Control.Feedback>
</div>

          



        </Col>
      </Row>
            



           

           

            <div>

            <label  for="image">Password</label>
            <input type="password"
            id="image"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid"className=" mb-2">
              Please provide Password
            </Form.Control.Feedback>

</div>
<div>

            <label  for="image">Confirm Password</label>
            <input type="password"
            id="image"
            className="form-control mb-3"
            placeholder="Re-Enter Password"
            value={confirmPass} 
            onChange={(e)=> setConfirmPass(e.target.value)}
            required />
             <Form.Control.Feedback type="invalid"className=" mb-2">
              Please Confirm Password
            </Form.Control.Feedback>

</div>
            <button style={{width:"100%"}} type="submit" class=" btn btn-danger btn-lg btn-block" >Sign Up</button>


        </Form>

        <a >
             Have an account? <a href="/login">Login</a>
        </a>

        </div>


    </div>
    </div>
  )
}

export default Register