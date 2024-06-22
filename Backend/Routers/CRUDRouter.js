const express=require('express')
const CRUDRouter=express.Router()
const {getDataFromDatabase,saveDataTodatabase}=require('../Controllers/CRUD')

CRUDRouter.get('/get',getDataFromDatabase)
CRUDRouter.post('/save',saveDataTodatabase)


module.exports=CRUDRouter
