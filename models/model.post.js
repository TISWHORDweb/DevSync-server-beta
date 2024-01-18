const mongoose = require('mongoose')

const postSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    userID:{
        type:String, 
    },
    categoryID:{
        type:String, 
    },
    like:{
        type:Number, 
        default: 0
    },
    description:{
        type:String,
    },
    image:{
        type:String,    
    },
    adminID:{type:String},
    creationDateTime:{type:Number, default:()=>Date.now()},	
    updated_at:{type:Number, default:()=>Date.now()}	
})


const ModelPost=mongoose.model("model-post", postSchema)

module.exports=ModelPost