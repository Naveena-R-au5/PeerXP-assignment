import React,{useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Navbar from './navbar'
import {UserContext} from '../App'
import axios from 'axios'


const Area =()=>{
   const [details,setData] = useState([])
   const {state,dispatch} = useContext(UserContext)



fetch(`http://localhost:5000/getTickets/${state?state.email:""}`,{
  method:"GET",
  headers:{
    'Accept': 'application/json',
    "Content-Type":"application/json"
   },

  }).then(res => res.json())
  .then(res=>{
        // console.log("contact",res)
      setData(res.data.data)
  })
  .catch(err=>{
    console.log(err)
  })

   
    return(
           <>
             <Navbar/>
             {details?details.map(d=>{
               console.log("d",details) 
               return( 
              <div>
              <Card className="Card ">
               <Card.Header style={{display:"flex",flexDirection:"row"}}><h4>status:<Link>{d.status}</Link></h4><h4 style={{right:"0",marginLeft:"auto"}}>#{d.ticketNumber}</h4></Card.Header>
                <Card.Body className="card-body">
               <Card.Title style={{display:"flex",flexDirection:"row"}}>
                  <h4>{d.subject}</h4>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; 
                  <h4>{d.category}</h4>
                </Card.Title>
                </Card.Body>
            </Card>
           
        </div>
         )}):""} 
      </>
    )
}


export default Area