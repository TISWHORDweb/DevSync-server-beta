const mongoose = require('mongoose')

const likeSchema=new mongoose.Schema({
    userID:{
        type:String, 
    },
    postID:{
        type:String, 
    },
    creationDateTime:{type:Number, default:()=>Date.now()},	
    updated_at:{type:Number, default:()=>Date.now()}	
})


const ModelLike=mongoose.model("model-like", likeSchema)

module.exports=ModelLike