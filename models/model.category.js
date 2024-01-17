const mongoose = require('mongoose')

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
    },
    adminID:{type:String},
    creationDateTime:{type:Number, default:()=>Date.now()},	
    updated_at:{type:Number, default:()=>Date.now()}	
})


const ModelCategory=mongoose.model("model-category", categorySchema)

module.exports=ModelCategory