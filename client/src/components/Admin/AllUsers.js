import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

function AllUsers() {
    const [id,setId] = useState();
    const [Users, setUsers] = useState();

    if (localStorage.getItem("admin") == null){

       
        window.location.replace("/adminlogin")


    }




    useEffect((e) => {
        
        
         axios.get('http://localhost:5000/user/').then(res => {
         
         if(res.data.length != 0){
              setUsers(res.data)
         }else{
           
            
         }

            console.log(res.data)      
            
        })
        
        
        
        .catch((err)=>{
            alert(err);
        })
  
    },[]);


    


    const deleteUsers = (e) =>{

        const ID = e.target.id;

        axios.delete(`http://localhost:5000/user/${ID}`).then((res) => {
            console.log(res.data)
            alert('Booking Deleted')
            window.location.reload();

            



        })

    }











  return (
    <div className="ml-5" style={{marginLeft: "50px"}}>
        <h1>All Smart Ticket Users</h1>

       

        {Users? <div>
            {Users.map((user,index) => (
                <div>
                    <Card className="mb-2" key={user._id} border="primary" style={{ width: '35rem' }}>
        <Card.Header>{index+1}.  <strong>User ID - {user._id}</strong> </Card.Header>
        <Card.Body>
          <Card.Title>User Name  : {user.name}</Card.Title>
          <Card.Title>User Email : {user.email}</Card.Title>
            <Card.Title>Mobile : {user.phone}</Card.Title>
            
          <Card.Text>
           Account Created at {user.createdAt.substring(0,10)} , {user.createdAt.substring(11,16)} 
            <div className="row mt-2">
            
                <div className="col-6 md-4">
                    <button className="btn btn-danger" id={user._id} onClick={(e)=> deleteUsers(e)}>Block User</button>
                    </div>


            </div>
          </Card.Text>
        </Card.Body>
      </Card>
     
      </div>



            ))}
        </div> :  <div><p>No Users</p></div> }


            

        







        
    </div>
  )
}

export default AllUsers