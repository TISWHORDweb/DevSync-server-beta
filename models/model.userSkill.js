const mongoose = require('mongoose')

const userSkillSchema=new mongoose.Schema({
    userID:{
        type:String, 
    },
    skill:{
        type:String, 
    },
    skillID:{
        type:String, 
    },
    creationDateTime:{type:Number, default:()=>Date.now()},	
    updated_at:{type:Number, default:()=>Date.now()}	
})


const ModelUserSkill=mongoose.model("model-user-skill", userSkillSchema)

module.exports=ModelUserSkill