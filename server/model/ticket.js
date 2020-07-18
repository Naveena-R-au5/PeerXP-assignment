const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const ticketSchema = new mongoose.Schema({

    firstName:{
        type:String,
    },
    email:{
        type:String
    },
    phone:{
        type:String,
        // required:true
    },
    department:{
        type:String,
        // required:true
    },
    category:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        // required:true
    },
    priority:{
        type:String,
        // required:true
    },
    subject:{
        type:String,
        // required:true
    }
})

mongoose.model("ticket",ticketSchema)