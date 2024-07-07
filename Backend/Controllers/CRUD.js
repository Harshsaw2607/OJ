const mongoose=require('mongoose')
const Problem=require('../models/Problem')


const { applyPatch } = require('diff')
const User = require('../models/User')




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
        const {ProblemName,ProblemStatement,Editorial,Difficulty,Testcase} = req.body
        const existingOne= await Problem.findOne({ProblemStatement})
        if(existingOne){
            return res.status(400).send("Problem Statement Already Exists")
        }

        const newProblem=await Problem.create({
            ProblemName,
            ProblemStatement,
            Editorial,
            Difficulty,
            Testcase

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

const saveCodeToDatabase = async (req,res) => {
    const userId=req.params.id
    const {id,code} = req.body
    console.log("req.body = ",req.body)
    console.log("uSerId = ",userId)

    try {
        
        const user = await User.findById(userId)
        if(user){
            const existingCode = user.code.find(c => c.id === id);
            if(existingCode){
                existingCode.code=code
            }
            else{
                user.code.push({ id, code });
            }

            // Both of the below methods are correct
            await user.save()
            // await User.updateOne({ _id: userId }, { $set: { code: user.code } });

            return res.status(200).json({ 
                message: 'Code saved successfully' ,
                success : true
            });
        }

        else {
            return res.status(404).json({ 
                message: 'User not found',
                success : false
            });
        }

    } catch (error) {
        console.error('Error saving code:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            success : false
        });
    }
    
}


const getCodeFromdatabase = async (req,res) =>{
    const {userId,id} = req.params
    try {
        const user = await User.findById(userId)
        if(user){
            const existingCode = user.code.find(c => c.id === id);
            if(existingCode){
                res.status(200).json({
                    data : existingCode.code,
                    success: true
                })
            }
            else{
                return res.status(400).json({
                    message : "Code not found",
                    success : false
                })
            }
        }
    } catch (error) {
        console.error('Error retrieving code:', error);
        return res.status(500).json({ 
            message: 'Internal server error',
            success : false
        });
    }
}


const getProblemStatementUsingID = async(req,res) =>{
    const id=req.params.id
    console.log("Problem ")

    const ProblemData= await Problem.findById(id)
    console.log("ProblemData = ",ProblemData)
    if(!ProblemData){
        return res.status(400).json({
            message:"Problem doesn't exists",
            success:false
        })
    }

    res.status(201).json({
     message : ProblemData,
     success:true
    })

}

const UpdateDataonDatabase = async (req,res) =>{

    const id=req.params.id
    const {updatedProblemDetails}=req.body


    try {
        
        const originalProblemDetails= await Problem.findById(id)
        console.log("ProblemDetails = ",originalProblemDetails)
        if(!originalProblemDetails){
            return res.status(400).json({
                message:"Problem doesn't exists",
                success:false
            })
        }

        // const updatedProblemDetails = applyPatch(originalProblemDetails, changedText);

        
        const result= await Problem.findByIdAndUpdate(id,{ProblemStatement:updatedProblemDetails})
        // console.log("result = ",result)

        if(!result){
            console.log("Error")
            return res.status(400).json({
                message:"Error while updating",
                success:false
            })
        }

        res.status(201).json({
            message:"Problem Updated Succesfully",
            success:true
        })



    } catch (error) {
        console.log("Error while updating the problem", error);
    }

}

const DeleteDatafromDatabase = async (req,res) =>{

    const id=req.params.id;

    const isDeleted= await Problem.findByIdAndDelete(id)
    if(!isDeleted){
        return res.status(400).json({
            message : "Error while deleting",
            success : false
        })
    }

    res.status(200).json({
        message : "Deleted Successfully",
        success : true
    })


    
}

module.exports={getDataFromDatabase,saveDataTodatabase,getProblemStatementUsingID,UpdateDataonDatabase,DeleteDatafromDatabase,
                saveCodeToDatabase,getCodeFromdatabase
}