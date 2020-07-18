import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Navbar from './navbar'

const Signup =()=>{
    const history = useHistory()
    const [firstName,setName] = useState("")
    const [lastName,setlName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [show,showPass] = useState("password")
    const [sub,submit] = useState(false)
    const [err,emailError] = useState("")
    const [pas,passError] = useState("")
    const [nam,nameError] = useState("")
    const [exist,already] = useState("")
  
const PostData=()=>{
    // username validation
    if(!/^(?=.{4,})/.test(firstName)){
        nameError("username can contain mininum 4 characters")
        return
    }
    // email validation
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
       emailError("invalid email")
        return
    }
    // password validation
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/.test(password)){
        passError("password must contain minimum 4 characters")
        return
    }
    // signup 
    fetch("http://localhost:5000/signup",{
        method:"post",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify({
            firstName,lastName,
            email,
            password,
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.errMessage){
            // M.toast({html: 'email already exist',classes:"#b71c1c red darken-4"})
            already(data.errMessage)
            return
         }
        if(data.error){
            // M.toast({html: 'Please enter all the fields',classes:"#b71c1c red darken-4"})
            // ress(data.error)
        }
        else{
            
            // M.toast({html:data.message,classes:"#43a047 green darken-1"})
            history.push('/login')
            submit(true)
        }
    }).catch(err=>{
        console.log(err)
    })
    fetch("http://localhost:5000/contacts",{
        method:"post",
        headers:{
            "content-Type":"application/json",
           
        },
        body:JSON.stringify({
            firstName,lastName,
            email,

        })
    }).then(response => response.json())
    .then(data=>{
        console.log("data",data)
        history.push('/login')
        submit(true)
    }).catch(err=>{
        console.log(err)
    })
}


// for show password toggle 
const pass=()=>{
    showPass(!show)
}
  return(
        <>
          <Navbar/>
          <div>
             <Card className="Card">
             <Card.Header><h3>Signup</h3></Card.Header>
             <Card.Body className="card-body">
               <Form>
                  <div className="form">
                    <Form.Group controlId="formBasicName">
                         <Form.Label><h5>Username</h5></Form.Label>
                         <Form.Control type="text" placeholder="Enter username"
                            style={{width:"160%",height:"60px",fontSize:"20px"}} 
                            value ={firstName}
                            onChange = {(e)=>setName(e.target.value)}/>
                           <p style={{ fontSize: 14, color: "red" }} >{nam||""}</p>
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                         <Form.Label><h5>Username</h5></Form.Label>
                         <Form.Control type="text" placeholder="Enter username"
                            style={{width:"160%",height:"60px",fontSize:"20px"}} 
                            value ={lastName}
                            onChange = {(e)=>setlName(e.target.value)}/>
                           {/* <p style={{ fontSize: 14, color: "red" }} >{nam||""}</p> */}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><h5>Email address</h5></Form.Label>
                           <Form.Control type="email" placeholder="Enter email"
                               style={{width:"160%",height:"60px",fontSize:"20px"}} 
                               value ={email}
                               onChange = {(e)=>setEmail(e.target.value)}/>
                            <p style={{ fontSize: 14, color: "red" }} >{err||""}</p>
                            <p style={{ fontSize: 14, color: "red" }} >{exist||""}</p>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                       <Form.Label><h5>Password</h5></Form.Label>
                           <Form.Control type={show?"password":"text"} 
                                placeholder="Password"  value ={password}
                                style={{width:"160%",height:"60px",fontSize:"20px"}}
                                value={password} 
                                onChange = {(e)=>setPassword(e.target.value)}/>
                            <p style={{ fontSize: 14, color: "red" }} >{pas||""}</p>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" 
                             onClick={()=>pass()} style={{fontSize:"16px"}} 
                             label="show password"/>
                    </Form.Group>
                    <Button className="submit" type="button"  
                         onClick = {()=>PostData()} disabled={!email || !firstName || !lastName || !password }>
                        Submit
                    </Button>
               </div>
               <div className="link">
               <div>
                <i className="fa fa-user" style={{fontSize:"70px",marginTop:"20px"}} 
                   aria-hidden="true">
                </i>
               </div>&nbsp;&nbsp;&nbsp;&nbsp;
               <div style={{display:"flex",flexDirection:"column"}}>
                  <p> Already a member?&nbsp;&nbsp;
                      <Link to="/login">Login</Link>
                   <br/>
                   <label style={{fontSize:"19px",marginTop:0,color:"grey"}} >
                        Sign in to submit tickets,<br/> browse articles and engage in our community.
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

export default Signup