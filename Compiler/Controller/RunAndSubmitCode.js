const generateFile=require('../generateFile')
const generateInputFile=require('../generateInputFile')
const executeCpp=require('../executeCpp')
const executeJS = require('../executeJs')
const Problem=require('../../Backend/models/Problem')
const executeJava = require('../executeJava')
const executePython = require('../executePython')

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

    else if(language==='Javascript'){
        console.log("language = ",language)
        const output= await executeJS(filePath,inputPath)

        console.log("output = ",output)
        
        return res.status(200).json({
            output
        })
    }

    else if(language==='Java'){
        console.log("language = ",language)
        const output= await executeJava(filePath,inputPath)

        console.log("output = ",output)
        
        return res.status(200).json({
            output
        })
    }

    else if(language==='Python'){
        console.log("language = ",language)
        const output= await executePython(filePath,inputPath)

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
    const {language="C++",code,testcase} = req.body
    if(code===undefined){
        return res.status(400).json({
            message:"Empty code",
            success:false
        })
    }


    try {
        const filePath= await generateFile(code,language)
        const InputArray=testcase
        for(let i=0;i<InputArray.length;i++){
            if(timeLimitExceeded){
                break;
            }

            const inputPath= await generateInputFile(InputArray[i].Input)
            if(language==='C++'){
                // console.log("language = ",language)
                const output= await executeCpp(filePath,inputPath)
                // console.log("output = ",output)
                
                if(output.output=='Time Limit Exceeded'){{
                    const response=`Time Limit Exceeded at testcase ${i+1}`
                    timeLimitExceeded=true
                    result.push(response);
                    break;
                }}

                if(output.message!=='Successful Submission'){
                    const response=`${output.message} at testcase ${i+1}`
                    result.push(response);
                    break;
                }

                else{
                    console.log("InputArray[i].Expected_Output = ", JSON.stringify(InputArray[i].Expected_Output.trim()));
                    console.log("output.output.trim() = ", JSON.stringify(output.output.trim()));
                    const normalizeNewlines = (str) => str.replace(/\r\n/g, '\n').trim();
                    const expectedOutput = normalizeNewlines(InputArray[i].Expected_Output);
                    const actualOutput = normalizeNewlines(output.output);
                    if(actualOutput === expectedOutput){
                        const response=`Accepted Testcase ${i+1}`
                        result.push(response);
                    }
                    else{
                        const response=`Wrong Answer at Testcase ${i+1}`
                        result.push(response);

                        // Additional debug information
                        console.log("Difference found:");
                        console.log("Expected Output:", JSON.stringify(InputArray[i].Expected_Output.trim()));
                        console.log("Actual Output:", JSON.stringify(output.output.trim()));
                        console.log("Expected Output Length:", InputArray[i].Expected_Output.trim().length);
                        console.log("Actual Output Length:", output.output.trim().length);
                        break;
                    }
                }
                
            }

            else if(language==='Javascript'){
                const output= await executeJS(filePath,inputPath)
                if(output.output=='Time Limit Exceeded'){{
                    const response=`Time Limit Exceeded at testcase ${i+1}`
                    timeLimitExceeded=true
                    result.push(response);
                    break;
                }}

                if(output.message!=='Successful Submission'){
                    const response=`${output.message} at testcase ${i+1}`
                    result.push(response);
                    break;
                }

                else{
                    
                    if(output.output.trim()===InputArray[i].Expected_Output.trim()){
                        const response=`Accepted Testcase ${i+1}`
                        result.push(response);
                    }
                    else{
                        const response=`Wrong Answer at Testcase ${i+1}`
                        result.push(response);
                        break;
                    }
                }
            }

            else if(language==='Java'){
                const output= await executeJava(filePath,inputPath)
               
                if(output.output=='Time Limit Exceeded'){{
                    const response=`Time Limit Exceeded at testcase ${i+1}`
                    timeLimitExceeded=true
                    result.push(response);
                    break;
                }}

                if(output.message!=='Successful Submission'){
                    const response=`${output.message} at testcase ${i+1}`
                    result.push(response);
                    break;
                }

                else{
                    
                    if(output.output.trim()===InputArray[i].Expected_Output.trim()){
                        const response=`Accepted Testcase ${i+1}`
                        result.push(response);
                    }
                    else{
                        const response=`Wrong Answer at Testcase ${i+1}`
                        result.push(response);
                        break;
                    }
                }
            }

            else if (language==='Python'){
                const output= await executePython(filePath,inputPath)
                
                if(output.output=='Time Limit Exceeded'){{
                    const response=`Time Limit Exceeded at testcase ${i+1}`
                    timeLimitExceeded=true
                    result.push(response);
                    break;
                }}

                if(output.message!=='Successful Submission'){
                    const response=`${output.message} at testcase ${i+1}`
                    result.push(response);
                    break;
                }

                else{
                    
                    if(output.output.trim()===InputArray[i].Expected_Output.trim()){
                        const response=`Accepted Testcase ${i+1}`
                        result.push(response);
                    }
                    else{
                        const response=`Wrong Answer at Testcase ${i+1}`
                        result.push(response);
                        break;
                    }
                }
                
            }
        }

        

        result.map((item,index) => (
            console.log(`item at ${index+1} = `,item)
        ))

        return res.status(200).json({
            result
        })
        

    } catch (error) {
        console.log("error = ",error)
        res.status(500).json({
            message : "Error " + error.message,
            success:false
        })
    }
    
}

module.exports = {RunCodeFile,SubmitCodeFile}