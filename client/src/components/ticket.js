import React,{useContext,useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {UserContext} from '../App'
import Navbar from './navbar'


const Ticket =()=>{
  const {state,dispatch} = useContext(UserContext)
  
  return(
    <>
    <Navbar/>
    <div>
       <Card className="Card">
          <Card.Header><h3>Submit a Ticket</h3></Card.Header>
            <Card.Body className="card-body">
              <Form>
                <div className="form">
                 <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label><h5>Department</h5></Form.Label>
                       <Form.Control as="select" 
                           style={{width:"160%",height:"60px",fontSize:"20px"}} >
                          <option>PWSLab DevOps Support</option>
                          <option>iSupport</option>
                        </Form.Control>
                  </Form.Group>
                 <Form.Group controlId="exampleForm.ControlSelect1">
                     <Form.Label><h5>Category</h5></Form.Label>
                        <Form.Control as="select" 
                            style={{width:"160%",height:"60px",fontSize:"20px"}} >
                            <option>-none-</option>
                            <option>NEW Project CI/CD Pipeline Setup</option>
                            <option>Update CI/CD Pipeline Configuration</option>
                            <option>CI/CD pipeline failure</option>
                            <option>DevSecOps Pipeline Setup</option>
                        </Form.Control>
                 </Form.Group>
                 <Form.Group controlId="formBasicName3">
                   <Form.Label><h5>Subject</h5></Form.Label>
                      <Form.Control type="text" placeholder="Enter subject"
                       style={{width:"160%",height:"60px",fontSize:"20px"}} 
                       />
                 </Form.Group>
              <Form.Group controlId="formBasicName4">
                 <Form.Label><h5>Description</h5></Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Enter description"
                      style={{width:"160%",height:"100px",fontSize:"20px"}} 
                    />
             </Form.Group>
             <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label><h5>Priority</h5></Form.Label>
                   <Form.Control as="select" style={{width:"160%",height:"60px",fontSize:"20px"}} >
                       <option>-none-</option>
                       <option>High - production system down</option>
                       <option>Medium - System impaired</option>
                       <option>Low - general guidance</option>
                   </Form.Control>
            </Form.Group>
            <h4 style={{fontWeight:"bold"}}>Contact details</h4>
            <Form.Group controlId="formBasicName">
                <Form.Label><h5>Name</h5></Form.Label>
                  <Form.Control type="text" placeholder="Enter username"
                    style={{width:"160%",height:"60px",fontSize:"20px"}} 
                    value={state?state.name:""}
                    disabled/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label><h5>Email address</h5></Form.Label>
                  <Form.Control type="email" placeholder="Enter email"
                   style={{width:"160%",height:"60px",fontSize:"20px"}} 
                   value={state?state.email:""}
                    disabled/>
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
                 <Form.Label><h5>Mobile</h5></Form.Label>
                    <Form.Control type="number" placeholder="Enter mobile number"
                      style={{width:"160%",height:"60px",fontSize:"20px"}} 
                    />
            </Form.Group>
            <Button className="submit" type="button">
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