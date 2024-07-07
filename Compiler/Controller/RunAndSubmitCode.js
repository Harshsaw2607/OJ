const generateFile=require('../generateFile')
const generateInputFile=require('../generateInputFile')
const executeCpp=require('../executeCpp')
const Problem=require('../../Backend/models/Problem')

const RunCodeFile = async (req,res) => {
    console.log(req.body)
    const {language="C++",code,Input} = req.body
    console.log("Input = ",Input)
    
   if(code===undefined){
    return res.status(400).json({
        message:"Empty code",
        success:false
    })
   }

   try {

    const filePath= await generateFile(code,language)
    const inputPath=await generateInputFile(Input)
    if(language==='C++'){
        console.log("language = ",language)
        const output= await executeCpp(filePath,inputPath)

        console.log("output = ",output)
        
        return res.status(200).json({
            output
        })
        
    }
    
    
   } catch (error) { 
        console.log("error = ",error)
         res.status(500).json({
            message : "Error " + error.message,
            success:false
        })
   }
}



const SubmitCodeFile = async (req,res) => {

    const result = [];
    let timeLimitExceeded = false;

    console.log(req.body)
    const {language="C++",code,id} = req.body
    if(code===undefined){
        return res.status(400).json({
            message:"Empty code",
            success:false
        })
    }


    try {
        const filePath= await generateFile(code,language)
        console.log("filePath = ",filePath);
        const ProblemData = await Problem.findById(id)
        console.log("ProblemData = ",ProblemData)
        const InputArray  = ProblemData.Testcase

        await Promise.all(InputArray.map(async (item,index) => {

            if(timeLimitExceeded){
                return
            }

            const inputPath= await generateInputFile(item.Input)
            console.log("item.Input = ",item.Input)
            if(language==='C++'){
                console.log("language = ",language)
                const output= await executeCpp(filePath,inputPath)
                console.log("output = ",output)
                
                if(output.output=='Time Limit Exceeded'){{
                    const response=`Time Limit Exceeded at testcase ${index+1}`
                    timeLimitExceeded=true
                    result.push(response);
                    return 
                }}

                if(output.message!=='Successful Submission'){
                    const response=`${output.message} at testcase ${index+1}`
                    result.push(response);
                    return
                }

                else{
                    // console.log("output.output = ",output.output)
                    // console.log("item.Expected_Output = ",item.Expected_Output)
                    // console.log("output = ",output)
                    // console.log("item = ",item)
                    if(output.output.trim()===item.Expected_Output.trim()){
                        const response=`Testcase ${index+1} Accepted`
                        result.push(response);
                        return 
                    }
                    else{
                        const response=`Wrong Answer at Testcase ${index+1}`
                        result.push(response);
                        return
                    }
                }
                
            }
        }))

        result.map((item,index) => (
            console.log(`item at ${index+1} = `,item)
        ))

        return res.status(200).json({
            result
        })
        

    } catch (error) {
        console.log("error = ",error)
        // res.status(500).json({
        //     message : "Error " + error.message,
        //     success:false
        // })
    }
    
}

module.exports = {RunCodeFile,SubmitCodeFile}