import React,{useState,useContext, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../App'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Navbar from './navbar'

const Login =()=>{
    const {dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [show,showPass] = useState("password")
    const [sub,submit] = useState(false)
    const [err,emailError] = useState("")
    const [pas,passError] = useState("")

    // validation for input field
    const PostData =()=>{
 
       
        // email validation
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            emailError("invalid email") 
            return
        }
        // password validation
        if(!/^(?=.{4,})/.test(password)){
            passError("password must contain minimum 4 characters")
            return
        }
        // login api
        fetch("http://localhost:5000/login",{
            method:"post",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log("login",data)
            if(data.error){
            //    M.toast({html: 'Invalid email/password',classes:"#b71c1c red darken-4"})
            console.log(data.error)
            }
            else{
                
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:"data.user"})
                history.push('/')
                submit(true)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    // show password toggle
    const pass=()=>{
        showPass(!show)
    }
    return(
    <>
    <Navbar/>
       <div>
         <Card className="Card">
             <Card.Header><h3>Already a member?</h3></Card.Header>
             <Card.Body className="card-body">
              <Form>
          <div className="form">
             <Form.Group controlId="formBasicEmail">
             <Form.Label><h5>Email address</h5></Form.Label>
             <Form.Control type="email" placeholder="Enter email"
                   style={{width:"160%",height:"60px",fontSize:"20px"}} 
                   value ={email}
                   onChange = {(e)=>setEmail(e.target.value)}/>
                  <p style={{ fontSize: 14, color: "red" }}>{err||""}</p>
              </Form.Group>
          <Form.Group controlId="formBasicPassword">
              <Form.Label><h5>Password</h5></Form.Label>
              <Form.Control type={show?"password":"text"} 
                  placeholder="Password"  value ={password}
                  style={{width:"160%",height:"60px",fontSize:"20px"}} 
                  onChange = {(e)=>setPassword(e.target.value)}/>
                  <p style={{ fontSize: 14, color: "red" }}>{pas||""}</p>
              </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
       <Form.Check type="checkbox" onClick={()=>pass()} 
            style={{fontSize:"16px"}} label="show password"/>
     </Form.Group>
     <Button className="submit" type="button"  
        onClick = {()=>PostData()} disabled={!email  || !password }>
        Submit
     </Button>
     </div>
        <div className="link">
            <div>
                <i className="fa fa-user" 
                   style={{fontSize:"70px",marginTop:"20px"}} 
                   aria-hidden="true">
                </i>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{display:"flex",flexDirection:"column"}}>
                  <p> New user?&nbsp;&nbsp;
                  <Link to="/signup">Signup</Link>
                  <br/>
                  <label style={{fontSize:"19px",marginTop:0,color:"grey"}} >
                   Create an account to submit tickets,<br/> read articles and engage in our community.
                  </label>
                </p>
              </div>
             </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
    )
  }
export default Login