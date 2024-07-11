import axios from 'axios'
const URL="http://localhost:3000"
const URLForCompiler = "http://localhost:8000"
const uploadDataRegister=async (Data)=>{
    try{
        const response=await axios.post(`${URL}/api/auth/register`,Data,{withCredentials:true})
        console.log("Val ",response)
        return response
    } catch (error){
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error while Uploading Data ", error.response.data);
            const newResponse={
                data:error.response.data,
                success:false
            }
            console.log(newResponse)
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while Uploading Data ", error);
        }
    }
}

 const uploadDataLogIn = async(Data) =>{
    try{
        const response=await axios.post(`${URL}/api/auth/login`,Data,{withCredentials:true})
        console.log(response.data)
        return response.data
    } catch (error){
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error while Uploading Data ", error.response.data);
            const newResponse={
                data:{
                    message:error.response.data,
                    success:false
                }
            }
            console.log(newResponse)
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while Uploading Data ", error);
        }
    }
}


const uploadDataProblem = async (Data) => {
    try{
        const response= await axios.post(`${URL}/api/Crud/save`,Data)
        console.log("newData ",response.data);
        return response.data
    } catch (error){
        if (axios.isAxiosError(error) && error.response) {
            // console.log("Error while creating Coding Problem ", error.response.data);
            const newResponse={
                message:error.response.data,
                success:false
                
            }
            // console.log(newResponse)
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while creating Coding Problem ", error);
        }
    }
}

const fetchDatafromDatabase = async () =>{
    try{
        const response=await axios.get(`${URL}/api/Crud/get`)
        // console.log("newData ",response.data);
        return response.data

    } catch (error){
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error while creating Coding Problem ", error.response.data);
            const newResponse={
                data:{
                    message:error.response.data,
                    success:false
                }
            }
            // console.log(newResponse)
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while fetching data ", error);
        }
    }
}

const saveCodeToDatabase = async (id,code,userId,language) => {
    try {
        const response =await axios.put(`${URL}/api/Crud/codeUpdate/${userId}`,{code,id,language})
        // console.log("Response received while saving code to database = ",response)
    } catch (error) {
        console.error("Error = ",error)
    }
    
    
}

const RetrieveCodeFromDatabase = async(id,userId) => {
    try {
        // console.log("id api = ",id)
        const response = await axios.get(`${URL}/api/Crud/getCode/${userId}/${id}`)
        // console.log("REsponse received from server = ",response)
        return response
    } catch (error) {
        console.error("Error while retrieving code = ",error)
    }
}

const SaveVerdictToDatabase = async (id,verdict,language,code,userId) => {
    try {
        console.log("Verdict = ",verdict)
        const response= await axios.post(`${URL}/api/Crud/saveVerdict/${userId}/${id}`,{verdict,code,language})
        console.log("Verdict save response = ",response)
        return response
    } catch (error) {
        console.log("Error while saving verdict to database = ",error)
    }
}


const MySubmissionsDetails = async (userId, id) => {
    try {
        console.log("User id in My Submission = ",userId)
        const response = await axios.get(`${URL}/api/Crud/submissionDetails/${userId}/${id}`)
        console.log("Submission Details = ",response)
        return response
    } catch (error) {
        console.error("Error while retrieving Submission details = ",error)
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error while Fetching Submission Details ", error.response.data);
            const newResponse={
                data:error.response.data
               
            }
            console.log(newResponse)
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while Uploading Data ", error);
        }
    }
}

const AllSubmissionDetails = async (id) => {
    try {
        console.log("Problem id in All Submission = ",id)
        const response = await axios.get(`${URL}/api/Crud/AllSubmissionDetails/${id}`)
        console.log("All Submission Details = ",response)
        return response
    } catch (error) {
        console.error("Error while retrieving All Submission details = ",error)
    }
}


const fetchDatafromDatabaseUisngID = async(id) => {
    try{

        const response=await axios.get(`${URL}/api/Crud/problemStatement/${id}`)
        // console.log("Got Data = ",response)
        return response

    } catch (error){
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error while fetching Problem Statement ", error.response.data);
            const newResponse={
                data:{
                    message:error.response.data,
                    success:false
                }
            }
            console.log(newResponse)
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while fetching data ", error);
        }
    }
}


const updateProblemInDatabase = async (id,diff) => {
    try {
        console.log("diff = ",diff)
        const response=await axios.put(`${URL}/api/Crud/update/${id}`,diff)
        console.log("Data Back = ",response)
        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error while fetching Problem Statement ", error.response.data);
            const newResponse={
                data:{
                    message:error.response.data,
                    success:false
                }
            }
            console.log(newResponse)
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while fetching data ", error);
        }
    }
}


const deleteDatafromDatabase = async (id) => {
    try {

        const response=await axios.delete(`${URL}/api/Crud/delete/${id}`)
        console.log("Response Received = ",response)
        return response
        
    } catch (error) {
  
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error while fetching Problem Statement ", error.response.data);
            const newResponse={
                data:{
                    message:error.response.data,
                    success:false
                }
            }
            console.log(newResponse)
            return newResponse; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while fetching data ", error);
        }
        
        
    }
}


const CompileCode = async (language,code,Input) => {
    try {
        console.log(" code language = ",language)
        const response=await axios.post(`${URLForCompiler}/runCode`,{language,code,Input})
        console.log("response = ",response)
        return response

    } catch (error) {
        console.log("error = ",error)
        console.log("error response = ",error.response.data.success)
        const response=error.response

        return response
    }

}


const CompileCodeWithHiddenTestCases = async (language,code,testcase) => {
    try {
        
        console.log("language = ",language)
        const response=await axios.post(`${URLForCompiler}/submitCode`,{language,code,testcase})
        console.log("response Received = ",response)
        return response


    } catch (error) {

        console.error("Error while Submitting code = ",error)
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error while Fetching Submission Details ", error.response.data);
            const response=error.response
            console.log(response)
            return response; // You can return this to handle the error in the calling function
        } else {
            console.log("Error while Uploading Data ", error);
        }
        // console.log("errors = ",error)
        // console.log("error response = ",error.response.data.success)
        // const response=error.response

        
    }

}




export {uploadDataRegister,uploadDataLogIn,uploadDataProblem,fetchDatafromDatabase,fetchDatafromDatabaseUisngID,
        updateProblemInDatabase,deleteDatafromDatabase,CompileCode,CompileCodeWithHiddenTestCases,
        saveCodeToDatabase, RetrieveCodeFromDatabase,SaveVerdictToDatabase,MySubmissionsDetails,AllSubmissionDetails}