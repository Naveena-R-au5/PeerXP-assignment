const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config/key')
const Auth = require('../middleware/userMiddleware')
const fetch = require('node-fetch')
const { response } = require('express')
const router = express.Router()
const users = mongoose.model("user")
var data=[]
router.post('/', function(req, res) {
    console.log("done")
});  

router.post('/signup',(req,res)=>{
    console.log(req.body)
    const {firstName,lastName,email,password} = req.body
    if(!email || !password || !firstName || !lastName){
        return res.status(422).json({error:"Please fill all the fields"})
    }
    users.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({errMessage:"user already exist"}) 
        }
        bcrypt.hash(password,12)
        .then(hashedpassword =>{
            const User = new users({
                email,
                password:hashedpassword,
                firstName,lastName
            })
            User.save().then(User=>{
                console.log(User)
                res.json({message:"Registered successfully!!"})
            })
        
    }).catch(err =>{
        console.log(err)
    })
})
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
      return res.status(422).json({error:"add email/password"})
    }
    users.findOne({email:email}).then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({error:"invalid user"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},SECRET_KEY)
                const {_id,firstName,lastName,email} = savedUser
                res.json({token,user:{_id,firstName,lastName,email}})
            }
            else{
                return res.status(422).json({error:"invalid user"})
            }
        }).catch(err =>{
            console.log(err)
        })
    })
})

router.post("/contacts",(req,res)=>{
    const {email,firstName,lastName} = req.body
    console.log("req-contacts",req.body)
    fetch("https://desk.zoho.in/api/v1/contacts",{
        method:"post",
        headers:{
            "content-Type":"application/json",
            "orgId":"60001280952",
            "Authorization":"aa8cd2f4d25aa3418e47f953ad9fe323",
        },
        body:JSON.stringify({
           lastName,
           firstName,
           email,

        })
    }).then(response => response.json())
    users.save(response)
    .then(data=>{
        console.log("data")
    }).catch(err=>{
        console.log(err)
    })
    

})
var contacts 

router.post("/ticket",(req,res)=>{
    const {firstName,lastName,email,phone,department,category,description,subject,priority,contactId} = req.body
    
    console.log("rr",req.body)
    fetch(`https://desk.zoho.in/api/v1/contacts/search?limit=1&lastName=${lastName}&firstName=${firstName}&email=${email}`,{
        method:"GET",
        headers:{
            'Accept': 'application/json',
           "Content-Type":"application/json",
            "orgId":"60001280952",
            "Authorization":"aa8cd2f4d25aa3418e47f953ad9fe323",
        },
        
    })
    .then(res=>res.json())
    // .then(console.log(res))
    .then(data=>{
        // contacts.push(data.data[0]);
         res.json({data})
        console.log("hh",data.data[0].id)
        
    }).catch(err=>{
        console.log(err)
})
    


    fetch("https://desk.zoho.in/api/v1/departments",{
        method:"POST",
        // mode:"cors",
        headers:{
            'Accept': 'application/json',
           "Content-Type":"application/json",
            "orgId":"60001280952",
            "Authorization":"aa8cd2f4d25aa3418e47f953ad9fe323",
        },
        body:JSON.stringify({
            "isAssignToTeamEnabled" : false,
            "isVisibleInCustomerPortal" : true,
            "name" : firstName,
            "description" : description,
            "associatedAgentIds" : [  "7189000000780054", "7189000001460001","7189000000042033"],
            "nameInCustomerPortal" : department
        })
        
    })
    .then(res=>res.json())
    // .then(console.log(res))
    .then((data)=>{
        console.log("ok")
    }).catch(err=>{
        console.log(err)
})
    
    fetch("https://desk.zoho.in/api/v1/tickets",{
        method:"POST",
        // mode:"cors",
        headers:{
            'Accept': 'application/json',
           "Content-Type":"application/json",
            "orgId":"60001280952",
            "Authorization":"aa8cd2f4d25aa3418e47f953ad9fe323",
        },
        body:JSON.stringify({

        "subCategory" : "Sub General",
        "cf" : {
          "cf_permanentaddress" : null,
          "cf_dateofpurchase" : null,
          "cf_phone" : null,
          "cf_numberofitems" : null,
          "cf_url" : null,
          "cf_secondaryemail" : null,
          "cf_severitypercentage" : "0.0",
          "cf_modelname" : "F3 2017"
        },
        "productId" : "",
        "contactId" : "7189000001886232",
        "subject" : subject,
        // "dueDate" : "2016-06-21T16:16:16.000Z",
        "departmentId" : "7189000001896319",
        "channel" : "Email",
        "description" : description,
        "priority" : priority,
        "classification" : "",
        // "assigneeId" : "1892000000056007",
        "phone" : phone,
        "category" : category,
        "email" : email,
        "status" : "Open"
        })
        
    })
    .then(res=>res.json())
    // .then(console.log(res))
    .then((data)=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
})

 })


router.get('/getTickets/:email',(req,res)=>{
    email=req.params.email
// "7189000001886232"
fetch(`https://desk.zoho.in/api/v1/tickets/search?email=${email}`,{
        method:"GET",
        // mode:"cors",
        headers:{
            'Accept': 'application/json',
           "Content-Type":"application/json",
            "orgId":"60001280952",
            "Authorization":"aa8cd2f4d25aa3418e47f953ad9fe323",
        },
        
    })
    .then(res=>res.json())
    // .then(console.log(res))
    .then(data=>{
        // console.log("ticket details",data)
        return res.json({data})
    }).catch(err=>{
        console.log(err)
})


    
})
 
//7189000001883179

//contactid ="7189000001886232"

module.exports = router