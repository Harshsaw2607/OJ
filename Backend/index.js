const express=require('express')
const app=express();
Port=3000
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')
const {DBCOnnection}=require('./database/db.js')
const User=require('./models/User.js');
const { default: mongoose } = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
DBCOnnection();


app.use(express.json())
app.use(express.urlencoded({extended:true}))


function isValidEmail(email){
    return validator.isEmail(email);
}

function isValidPassword(password) {
    // Define validation criteria
    const minLength = 10;
    const minLowercase = 1;
    const minUppercase = 1;
    const minDigits = 1;
    const minSpecialChars = 1;
    // Check length
    if (password.length < minLength) {
        return false;
    }

    // Check character types
    const lowercaseRegex = /[a-z]/g;
    const uppercaseRegex = /[A-Z]/g;
    const digitRegex = /[0-9]/g;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/g;

    if (!password.match(lowercaseRegex) || (password.match(lowercaseRegex) || []).length < minLowercase) {
        return false;
    }

    if (!password.match(uppercaseRegex) || (password.match(uppercaseRegex) || []).length < minUppercase) {
        return false;
    }

    if (!password.match(digitRegex) || (password.match(digitRegex) || []).length < minDigits) {
        return false;
    }

    if (!password.match(specialCharRegex) || (password.match(specialCharRegex) || []).length < minSpecialChars) {
        return false;
    }

    // If all checks pass, the password is considered valid
    return true;
}


app.get('/',(req,res)=>{
    res.send("HELLO")
})


app.post('/register',async (req,res)=>{
    try{
        console.log(req)
        // get all the data from request.body
        const{firstname,lastname,email,password}=req.body
        
        // check all the sections are filled or not
        if(!(firstname && lastname && email && password)){
            return res.status(400).send("All the fields are required")
        }

        //check valid email
        if(!isValidEmail(email)){
            return res.status(400).send("Format is incorrect");
        }

        // check valid password

        if(!isValidPassword(password)){
            return res.status(400).send("Password should consists of atleast 10 characters,atleat 1 lowerCase 1 UpperCase and 1 special character");
        }
        // check whether user already exist
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).send("User already exists")
        }

        // encrypt the password
        const hashPassword = await bcrypt.hashSync(password, 10);
        console.log(hashPassword)

        // Store the User details and encrypted Password in database
        const newUser=await User.create({
            firstname,
            lastname,
            email,
            password:hashPassword
        })
        // Generate a JWT token and store it in Browser's cookie
        const token=jwt.sign({id:newUser._id,email},process.env.SECRET_KEY,{
            expiresIn:"1d"
        })

        // newUser.token=token
        newUser.password=undefined

        // res.status(201).json({
        //     message:"You have successfully registered",
        //     newUser
        // })

        res.status(201).cookie("token",token,{
            expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }).json({
            message:"You have successfully registered",
            success : true,
            newUser,
            token
        })


    }catch(error){
        console.log(error)
    }
    


})


app.post('/login',async (req,res) =>{

    try {
        const{email,password}=req.body
        if(!(email && password)){
            return res.status(401).send("All fields are required")
        }

        const userExists=await User.findOne({email})
        if(!userExists){
            return res.status(400).send("User doesn't exist")
        }

        const validPassword=await bcrypt.compare(password, userExists.password);

        if(!validPassword){
            return res.status(400).send("Password is incorrect")
        }

        userExists.password=undefined

        const token=jwt.sign({id:userExists._id,email},process.env.SECRET_KEY,{
            expiresIn : "1d"
        })

        res.status(201).cookie("token",token,{
            expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }).json({
            message:"You have successfully registered",
            success : true,
            userExists,
            token
        })
    }catch (error) {
        console.log(error);
    }
    

})





app.listen(Port,()=>{
    console.log(`Listening on Port ${Port}`)
})
