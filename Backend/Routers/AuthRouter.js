const express=require('express')
const AuthRouter=express.Router()
const Register=require('../Controllers/Register')
const LogIn=require('../Controllers/LogIn')
AuthRouter.post('/register',Register)
AuthRouter.post('/login',LogIn)

module.exports = AuthRouter;