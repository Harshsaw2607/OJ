const mongoose=require('mongoose')

const codeSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },

    code:{
        type:String,
        required:true
    }

})

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    code:{
        type:[codeSchema],
        required:true
    }
})
module.exports=mongoose.model('User',UserSchema)