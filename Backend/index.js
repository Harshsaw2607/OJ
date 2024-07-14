const express = require('express')
const app = express();
Port = 3000
const { DBCOnnection } = require('./database/db.js')
const AuthRouter = require('./Routers/AuthRouter.js')
const CRUDRouter = require('./Routers/CRUDRouter.js')
const cookieParser = require('cookie-parser')

DBCOnnection();


const cors = require('cors');
const { log } = require('console');

app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use('/api/auth/', AuthRouter)
app.use('/api/Crud/', CRUDRouter)

app.get('/', (req, res) => {
    res.send("HELLO")
})

app.listen(Port, () => {
    console.log(`Listening on Port ${Port}`)
})
