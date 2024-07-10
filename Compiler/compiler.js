const express=require('express')
const app=express()
const cors=require('cors')
Port=8000

const CompilerRouter = require('./Routers/CompilerRouter')

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',CompilerRouter)

app.listen(Port,()=>{
    console.log(`Listening on Port ${Port}`)
})