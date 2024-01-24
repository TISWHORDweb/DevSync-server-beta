const mongoose = require('mongoose')

const skillSchema=new mongoose.Schema({
    skill:{
        type:String, 
    },
    creationDateTime:{type:Number, default:()=>Date.now()},	
    updated_at:{type:Number, default:()=>Date.now()}	
})


const ModelSkill=mongoose.model("model-skill", skillSchema)

module.exports=ModelSkill