const fs=require('fs')
const path=require('path')
const {v4 : uuid} =require('uuid')
const outputPath=path.join(__dirname,"output")
const {exec} =require('child_process')

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true})
}


const compileCpp = async (filePath) => {
    const fileID = path.basename(filePath).split('.')[0];
    const outputFilename = `${fileID}.exe`;
    const outputFilePath = path.join(outputPath, outputFilename);
    console.log("outputFilePath = ", outputFilePath);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outputFilePath}`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject({ type: 'compilation', message: error ? error.message : stderr });
            } else {
                resolve(outputFilePath);
            }
        });
    });
}


const runCpp = async (outputFilePath, inputPath) => {
    return new Promise((resolve, reject) => {
        const childProcess=exec(`${outputFilePath} < ${inputPath}`, { cwd: outputPath }, (error, stdout, stderr) => {
            if (error) {
                reject({ type: 'runtime', message: error.message });
            } else if (stderr) {
                reject({ type: 'runtime', message: stderr });
            } else {
                resolve(stdout);
            }
        });

        const timeoutId = setTimeout(() => {
            childProcess.kill(); // Kill the child process
            reject({ type: 'runtime', message: 'Time Limit Exceeded' });
        }, 2000);


        childProcess.on('exit',() => {
            clearTimeout(timeoutId)
        })
        

    });

    

};

// const executeCpp =  (filePath,inputPath) =>{
    
//     const fileID=path.basename(filePath).split('.')[0]
//     const outputFilename=`${fileID}.exe`
//     const outputFilePath=path.join(outputPath,outputFilename)
//     console.log("outputFilePath = ",outputFilePath)

//     return new Promise((resolve,reject) => {

//         exec(`g++ ${filePath} -o ${outputFilePath} && cd ${outputPath} && .\\${outputFilename} < ${inputPath}`,(error,stdout,stderr) => {
            
//             if(error){
//                 reject(error)
//             }


//             if(stderr){
//                 reject(stderr)
//             }

//             resolve(stdout)
//         })

//     })



// }

const executeCpp = async (filePath, inputPath) => {
    try {
        const outputFilePath = await compileCpp(filePath);
        console.log('Compilation successful.');
        
        // Optionally, run the code if you need to execute it with an input file
        const output = await runCpp(outputFilePath, inputPath);
        console.log('Execution output:', output);
        const response = {
            message : "Successful Submission",
            output  : output

        }
        return response
    } catch (error) {
        if (error.type === 'compilation') {
            console.error('Compilation Error:', error.message);
            const response={
                message : 'Compilation error',
                output : error.message
            }
            return response
        } else if (error.type === 'runtime') {
            console.error('Runtime Error:', error.message);
            const response={
                message : 'Runtime error',
                output : error.message
            }
            return response
        } else {
            console.error('Unknown Error:', error.message);
            const response={
                message : 'Unknown error',
                output : error.message
            }
            return response
        }
    }
};

module.exports=executeCpp