import React,{useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Navbar from './navbar'
import {UserContext} from '../App'


const Area =()=>{
 
    return(
           <>
             <Navbar/>
              <div>
                <Card className="Card ">
                <Card.Header><h4>status:<Link>open</Link></h4></Card.Header>
                <Card.Body className="card-body text-center">
                   <Card.Title>No Tickets found</Card.Title>
                   <Card.Text>
                      <h5>Submit a new support <Link to="/createTicket">ticket</Link> , and we will be happy to assist.</h5>
                   </Card.Text>
                </Card.Body>
            </Card>
        </div>
  
      </>
    )
}

export default Area