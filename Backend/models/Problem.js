const mongoose=require('mongoose')

const TestSchema = new mongoose.Schema({
    Input : {
        type : String,
        required : true
    },

    Expected_Output : {
        type : String,
        required : true
    }
})

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
        required:false
    },
    Difficulty:{
        type:String,
        required:true
    },
    Testcase : {
        type :[TestSchema],
        required : true
    }

})

module.exports=mongoose.model('Problem',ProblemSchema)