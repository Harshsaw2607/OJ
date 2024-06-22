const mongoose=require('mongoose')


const ProblemSchema=new mongoose.Schema({
    ProblemName:{
        type:String,
        required:true
    },
    ProblemStatement:{
        type:String,
        required:true
    },
    Editorial:{
        type:String,
        required:true
    },
    Difficulty:{
        type:String,
        required:true
    },

})

module.exports=mongoose.model('Problem',ProblemSchema)