const mongoose = require('mongoose')

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
    },
    userID:{
        type:String, 
    },
    postID:{
        type:String, 
    },
    creationDateTime:{type:Number, default:()=>Date.now()},	
    updated_at:{type:Number, default:()=>Date.now()}	
})


const ModelComment=mongoose.model("model-comment", commentSchema)

module.exports=ModelComment