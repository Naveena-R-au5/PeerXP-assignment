import React,{useContext,useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {UserContext} from '../App'
import Navbar from './navbar'
import Alert from 'react-bootstrap/Alert'


const Ticket =()=>{
  const {state,dispatch} = useContext(UserContext)
  const [department,setDepartment] = useState("")
  const [category,setCategory] = useState("")
  const [subject,setSubject] = useState("")
  const [description,setDescription] = useState("")
  const [priority,setPriority] = useState("")
  // const [firstName,setName] = useState([])
  const [lastName,setlName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [contactId,setContact] = useState("")
  const [sub,SubmitT] = useState("")

  const handleSubmit = (e) => {
    SubmitT("Ticket created successfully!!!")
    console.log(state.lastName)
    e.preventDefault()
    fetch("http://localhost:5000/conticket",{
      method:"POST",
      headers:{
          'Accept': 'application/json',
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
      firstName:state.firstName,
      lastName:state.lastName,
      email,
      // contactId:contactId
      }),
     
  
  })
  .then(res => res.json())
  .then(res=>{
        console.log("contactsss",res.data.data[0])
        setContact(res.data.data[0].id)
        // localStorage.setItem("contact",JSON.stringify(res.data.data[0].id))
        // dispatch({type:"CONTACT",payload:"res.data.data[0].id"})
  })
  .catch(err=>{
    console.log(err)
  })
  fetch("http://localhost:5000/ticket",{
    method:"POST",
    headers:{
        'Accept': 'application/json',
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
    firstName:state.firstName,
    lastName:state.lastName,
    email,
    phone,
    description,
    department,
    subject,
    category,
    priority,
    contactId:contactId
    }),
   

})
.then(res => res.json())
.then(res=>{
      console.log("contactsss",res)
      // setContact(res.data.data[0].id)
})
.catch(err=>{
  console.log(err)
})

}
console.log("c",contactId)
const alertBox=()=>{
  [
    'primary'
  ].map((variant, idx) => (
    <Alert key={idx} variant={variant}>
      Ticket added successfully!
    </Alert>
  ));
}

  return(
    <>
    <Navbar/>
    <div>
       <Card className="Card">
          <Card.Header><h3>Submit a Ticket</h3></Card.Header>
            <Card.Body className="card-body">
            <p style={{ fontSize: 20, color: "green" }} >{sub}</p>
              <Form onSubmit={(e)=>handleSubmit(e)} >
                <div className="form">
                 <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label><h5>Department</h5></Form.Label>
                       <Form.Control as="select" 
                           style={{width:"160%",height:"60px",fontSize:"20px"}}
                           value={department} 
                           onChange = {(e)=>setDepartment(e.target.value)}>
                          <option vlaue="PWSLab DevOps Support">PWSLab DevOps Support</option>
                          <option value="iSupport">iSupport</option>
                        </Form.Control>
                  </Form.Group>
                 <Form.Group controlId="exampleForm.ControlSelect1">
                     <Form.Label><h5>Category</h5></Form.Label>
                        <Form.Control as="select" 
                            style={{width:"160%",height:"60px",fontSize:"20px"}} 
                            value={category} 
                            onChange = {(e)=>setCategory(e.target.value)}>
                            <option value="-none-">-none-</option>
                            <option value="NEW Project CI/CD Pipeline Setup">NEW Project CI/CD Pipeline Setup</option>
                            <option value="Update CI/CD Pipeline Configuration">Update CI/CD Pipeline Configuration</option>
                            <option value="CI/CD pipeline failure">CI/CD pipeline failure</option>
                            <option value="DevSecOps Pipeline Setup">DevSecOps Pipeline Setup</option>
                        </Form.Control>
                 </Form.Group>
                 <Form.Group controlId="formBasicName3">
                   <Form.Label><h5>Subject</h5></Form.Label>
                      <Form.Control type="text" placeholder="Enter subject"
                       style={{width:"160%",height:"60px",fontSize:"20px"}} 
                       value={subject} 
                       onChange = {(e)=>setSubject(e.target.value)}/>
                 </Form.Group>
              <Form.Group controlId="formBasicName4">
                 <Form.Label><h5>Description</h5></Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Enter description"
                      style={{width:"160%",height:"100px",fontSize:"20px"}} 
                      value={description} 
                      onChange = {(e)=>setDescription(e.target.value)}/>
             </Form.Group>
             <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label><h5>Priority</h5></Form.Label>
                   <Form.Control as="select" style={{width:"160%",height:"60px",fontSize:"20px"}} 
                       value={priority} 
                       onChange = {(e)=>setPriority(e.target.value)}>
                       <option value="-none-">-none-</option>
                       <option value="High - production system down">High - production system down</option>
                       <option value="Medium - System impaired">Medium - System impaired</option>
                       <option value="Low - general guidance">Low - general guidance</option>
                   </Form.Control>
            </Form.Group>
            <h4 style={{fontWeight:"bold"}}>Contact details</h4>
            <Form.Group controlId="formBasicEmail">
                <Form.Label><h5>Email address</h5></Form.Label>
                  <Form.Control type="email" placeholder={state?state.email:""}
                   style={{width:"160%",height:"60px",fontSize:"20px"}} 
                   value={email}
                   onChange = {(e)=>setEmail(e.target.value)}
                    />
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
                 <Form.Label><h5>Mobile</h5></Form.Label>
                    <Form.Control type="number" placeholder="Enter mobile number"
                      style={{width:"160%",height:"60px",fontSize:"20px"}}
                      value={phone}
                      onChange = {(e)=>setPhone(e.target.value)} 
                    />
            </Form.Group>
            <Button className="submit" type="submit" onClick={alertBox()}>
                     Submit
            </Button>
      </div>
     </Form>
    </Card.Body>
   </Card>
  </div>
 </>
 )
}

export default Ticket