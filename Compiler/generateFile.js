const fs=require('fs')
const path=require('path')
const {v4 : uuid} =require('uuid')
const CodePath=path.join(__dirname,"codes")

if(!fs.existsSync(CodePath)){
    fs.mkdirSync(CodePath,{recursive:true})
}

const generateFile =  async(code,language) =>{
    
    
    // Create relevant folders for storing codes of different languages
    if(language==='C++'){
        
        const cppPath=path.join(CodePath,"CPP")
        if(!fs.existsSync(cppPath)){
            fs.mkdirSync(cppPath,{recursive:true})
        }

        console.log("CppPath = ",cppPath)

        const userCodeId=uuid()
        const filename=`${userCodeId}.cpp`
        const filePath=path.join(cppPath,filename)

         fs.writeFileSync(filePath,code)
         

         return filePath

    }

    else if(language==='Java'){
        const javaPath=path.join(CodePath,"java")
        if(!fs.existsSync(javaPath)){
            fs.mkdirSync(javaPath,{recursive:true})
        }
        const userCodeId=uuid()
        const filename=`${userCodeId}.java`
    }

    else if(language==='Python'){
        const pythonPath=path.join(CodePath,"python")
        if(!fs.existsSync(pythonPath)){
            fs.mkdirSync(pythonPath,{recursive:true})
        }
        const userCodeId=uuid()
        const filename=`${userCodeId}.py`
    }

    else if(language==='Javascript'){
        const javaScriptPath=path.join(CodePath,"javascript")
        if(!fs.existsSync(javaScriptPath)){
            fs.mkdirSync(javaScriptPath,{recursive:true})
        }
        const userCodeId=uuid()
        const filename=`${userCodeId}.js`

    }

    





}

module.exports=generateFile