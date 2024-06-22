const mongoose=require('mongoose')
const Problem=require('../models/Problem')




const getDataFromDatabase = async (req,res) =>{
    try{
        const problem=await Problem.find()

        if(problem.length){
            res.send(problem)
        }


    } catch(error){
        console.log("Error while fetching data ",error)
    }

}

const saveDataTodatabase = async (req,res) =>{
    try{
        console.log("req = ",req)
        const {ProblemName,ProblemStatement,Editorial,Difficulty} = req.body
        const existingOne= await Problem.findOne({ProblemStatement})
        if(existingOne){
            return res.status(400).send("Problem Statement Already Exists")
        }

        const newProblem=await Problem.create({
            ProblemName,
            ProblemStatement,
            Editorial,
            Difficulty

        })

        res.status(201).json({
            message:"Data has been successfully saved",
            success : true,
            newProblem
        })
    } catch(error){
        console.log("Error while storing the data in database ",error)
    }
    

}

const UpdateDataonDatabase = (req,res) =>{

}

const DeleteDatafromDatabase = (req,res) =>{
    
}

module.exports={getDataFromDatabase,saveDataTodatabase}