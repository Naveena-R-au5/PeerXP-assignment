import React,{useState,useContext, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Modal from 'react-bootstrap/Modal'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Navbar =()=>{
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const [User,setUsers] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
    if(state){
        const user = JSON.parse(localStorage.getItem("user"))
        setUsers(user.firstName.slice(0,2).toUpperCase())
        if(user){
          dispatch({type:"USER",payload:user})
        }
    }
      },[])
      const List=()=>{
        if(state){
              return[
                <Nav.Link as={Link} to="/createTicket" eventKey="/createTicket">
                    <h4 className="nn nav">Add Ticket</h4>
                </Nav.Link>,
                   <Nav.Link className="nn"  onClick={handleShow} 
                        style={{width:"55px",height:"45px",borderRadius:"160px",
                                color:"black",backgroundColor:"white",textAlign:"center",
                                fontSize:"20px",fontWeight:"bold"}}>
                                    {User}
                    </Nav.Link>,
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                   <Modal.Body>
                       <h4>{state?state.firstName:""},want to logout?</h4>
                   </Modal.Body>
               <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                       Close
                    </Button>
                    <Button variant="primary" onClick={()=>{localStorage.clear()
                         dispatch({type:"CLEAR"})
                         history.push('/login')
                    }}>
                     Logout
                    </Button>
              </Modal.Footer>
        </Modal>
        ]
    }
        else{
              return[
                   
                <Nav.Link as={Link} to="/login" >
                    <h4 className="nn nav">Log in</h4>
                </Nav.Link>,
                <Nav.Link as={Link} to="/signup">
                    <h4 className="nn nav">Sign up</h4>
                </Nav.Link> ,
              ]
        }
    
    }
    return(
    <>
     <section className="section1">
           <Jumbotron className="jumbol">
             <Nav className="Nav"
                 variant="tabs"
                 defaultActiveKey="/">
             <Nav.Item className="">
                <Nav.Link as={Link} to="/">
                    <h3 className="main">PeerXP Support</h3>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <NavDropdown className="ff" title="Menu" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">
                <Link to="/">Home</Link>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
                <Link to={state?"/myArea" :"/login"}>My Area</Link>
            </NavDropdown.Item>
               {state?<div> <NavDropdown.Item eventKey="4.1">
               <Link to="/createTicket">Add Ticket</Link>
            </NavDropdown.Item>, 
            <NavDropdown.Item eventKey="4.1">
                <Link  onClick={handleShow}  
                   style={{width:"55px",height:"45px",borderRadius:"160px",
                           color:"black",backgroundColor:"white",textAlign:"center",
                           fontSize:"20px",fontWeight:"bold"}}>
                               {User}
                </Link>
            </NavDropdown.Item></div>
            :<div>
            <NavDropdown.Item eventKey="4.1">
                <Link to="/login">Login</Link>
            </NavDropdown.Item>, 
            <NavDropdown.Item eventKey="4.1" >
                <Link to="/signup">Signup</Link>
            </NavDropdown.Item>
            </div>}
        <NavDropdown.Divider />
     </NavDropdown>
    </Nav.Item>
    <Nav.Item className="offset-6">
        <Nav.Link as={Link} to="/"><h4 className="nn nav">Home</h4>
        </Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link as={Link} to={state?"/myArea" :"/login"}>
            <h4 className="nn nav">My Area</h4>
        </Nav.Link>
    </Nav.Item>
        {List()}
    </Nav>
        <div className="heading1">
           <div  style={{display:"flex",flexDirection:"row",
                         justifyContent:"space-around",marginLeft:"0%",
                         marginTop:"40px"}}>
                <Form.Control type="text" size="lg" 
                        placeholder="search article" 
                        className="search1"/>
           </div>
        </div>
   </Jumbotron>
  </section>
 </>
 )
}

export default Navbar