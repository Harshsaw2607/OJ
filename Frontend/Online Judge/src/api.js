import axios from 'axios'
const URL="http://localhost:3000"
const uploadData=async (Data)=>{
    try{
        const response=await axios.post(`${URL}/register`,Data)
        // console.log("Val ",response)
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

const uploadDataLogIn = async() =>{
    try{
        const response=await axios.post(`${URL}/login`,Data)
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

export default uploadData