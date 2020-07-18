const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Ticket = mongoose.model("ticket")


router.get("/allTickets",(req,res)=>{
    Ticket.find()
    .then(ticket=>{
        res.json({ticket})
        console.log(ticket)
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/addTicket',(req,res)=>{
    const {email,phone,department,category,description,subject,priority} = req.body
    const ticket = new Ticket({
    //   email,
       phone,
       department,
       category,
       description,
       subject,
       priority
})
    ticket.save().then(result=>{
        res.json({ticket:result})
    
    }).catch(err =>{
        console.log(err)
    })
})

module.exports = router