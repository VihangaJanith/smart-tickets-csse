import React , {useState}from 'react'
import axios from 'axios'
import { Alert, Col, Form, Row } from "react-bootstrap";
import {  useEffect } from "react";


function AdminLogin() {

   
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]   = useState('');

    const [validated, setValidated] = useState(false);


    const log = (e) => {
        e.preventDefault();

        const login = {
            username,
            password
        }

        if(login.username == '' ){
            setError("Enter Username")
            setTimeout(function(){
                    
setError("")
                
                }, 3000);
                

            

            return false;
        }
        if(login.password == '' ){
            setError("Enter Password")
            setTimeout(function(){
                 setError("")
                
                }, 3000);
               

                
                
                return false;
            }
 
            if (login.username == 'admin' || login.password == 'admin'){

                alert("Login Successfull")
                localStorage.setItem("admin",JSON.stringify(login.username));
                window.location.replace("/admindash");
                
            }
            else{
                setError("Invalid Credentials")
                setTimeout(function(){
                     setError("") 

                
                }, 3000);
              

                
                return false;
            }





    }


  return (
    <div style={{marginLeft:"380px"}} >
         <div className="container mt-3" >
        <div className="shadow-sm p-3 mb-5 bg-white rounded" style={{maxWidth:"600px"}}>
            <h1>Login</h1>
            <hr/>
            {error && 
            <Alert variant="danger">
                {error}
            </Alert>
            }

            <Form noValidate validated={validated} onSubmit={(e) => log(e)}>

          
         <div>
            <label  for="description">Username</label>
<input type="text"
            id="description"
            className="form-control mb-3 "
            placeholder="Enter Email"
            value={username} 
            onChange={(e)=> setUserName(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid"className=" mb-2">
              Please provide a Email
            </Form.Control.Feedback>
</div>



     




          






           

           

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

<button style={{width:"100%"}} type="submit" class=" btn btn-danger btn-lg btn-block" >Login</button>

        </Form>



        </div>


    </div>
    </div>
  )
}

export default AdminLogin