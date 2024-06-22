const express=require('express')
// Removed const path = require('path')
const app=express();
Port=3000
const {DBCOnnection}=require('./database/db.js')
const AuthRouter = require('./Routers/AuthRouter.js')
const CRUDRouter = require('./Routers/CRUDRouter.js')



DBCOnnection();


const cors = require('cors');
const { log } = require('console');

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/api/auth', AuthRouter)
app.use('/api/Crud',CRUDRouter)

app.get('/',(req,res)=>{
    console.log("val",__dirname)
    res.send("HELLO")
})


app.listen(Port,()=>{
    console.log(`Listening on Port ${Port}`)
})
