import React , {useState}from 'react'
import axios from 'axios'
import { Alert, Col, Form, Row } from "react-bootstrap";
import {  useEffect } from "react";


function Login() {

   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]   = useState('');
    
  
  
    useEffect(()=>{

        const token = localStorage.getItem('token');

        
        if (token){
           
            window.location.replace("/dashboard");
           
        }
})
 
    const [validated, setValidated] = useState(false);

    const log = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
    
        const login = {
            email,
            password
        }
    
        axios.post('http://localhost:5000/user/login', login).then(res=>{



           
                if(res.data.success){

                    alert("Successfull")
                    localStorage.setItem("token",JSON.stringify(res.data.token));
                    console.log(res.data.token)
                    window.location.replace("/dashboard");
                    

                }else {
                    console.log(res.data.message)
                    setError(res.data.message)
                    setTimeout(function(){
                        
                        setError('')
                       
                    }, 3000);

                 
                
                    
                    


                   
                }
            
            
            
        }).catch((err)=>{
            alert(err);
        })

       
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


        <a >
            Don't have an account? <a href="/register">Sign Up</a>
        </a>

        </div>


    </div>
    </div>
  )
}

export default Login