import { useRef } from 'react';
import React, { useState} from 'react';
import SampleTestCases from '../SampleTestCases'
import { uploadDataProblem } from '../../api';


function ProblemForm(){
const ProblemNameRef=useRef()
const ProblemStatementRef=useRef()
const EditorialRef=useRef()
const DifficultyRef=useRef()

const handleSubmit = (e) =>{
    e.preventDefault();
    const Data={
        ProblemName:ProblemNameRef.current.value,
        ProblemStatement:ProblemStatementRef.current.value,
        Editorial:EditorialRef.current.value,
        Difficulty:DifficultyRef.current.value
    }

    uploadDataProblem(Data).then(response=>{
        // console.log("New Response ",response)
        if(response.success){
            console.log("New Problem data ",response.message)
        }
    }).catch(error=>{
        console.log("Error while receiving Problem data ",error)
    })



}
 
  return (
        
        <div className='h-auto w-[650px] border-slate-200 shadow-md bg-yellow-100 pt-5 pb-0 pl-0 pr-0 flex flex-col'>

            <div className='mb-5'><p className='text-black font-semibold m-2 text-lg font-serif'>Add a Problem</p></div>

        <form action="" onSubmit={handleSubmit} className='flex flex-col justify-start'>

                <div className='flex mb-3 items-center'>
                    <label htmlFor="ProblemName" className="mr-2 ml-5 text-lg" style={{fontFamily: 'Lato',fontWeight: 800,fontStyle: 'bold'}}
                    > Problem Name : </label>
                    <input type="text" ref={ProblemNameRef}  name='ProblemName' id='ProblemName' placeholder='Enter Problem Name' className=' border-none outline-none focus:border-none focus:outline-none rounded-md relative left-[14rem] p-2 bg-slate-100 shadow-md text-sm' style={{width:'250px',height:'28px'}} 
                    />
                </div>

                <div className='flex mb-3 flex-col'>
                    <label htmlFor="ProblemStatement" className="mr-2  text-lg relative left-[-13.9rem]" style={{fontFamily: 'Lato',fontWeight: 800,fontStyle: 'bold'}}> Problem Statement : </label>
                    <br />
                    <textarea name="ProblemStatement" ref={ProblemStatementRef} id="ProblemStatement" rows={10} cols={5} className='mx-5 mb-5 w-[30rem] p-2 outline-none focus:outline-none resize-none overflow-auto'></textarea>
                </div>
                
                <SampleTestCases EditorialRef={EditorialRef} DifficultyRef={DifficultyRef}/>
                {/* <SampleTestCases/> <br /><br />
                <SampleTestCases/> */}

                <div>
                    <button type='submit' className={`border-2 rounded-md text-black font-medium text-center mb-2 bg-blue-400 hover:bg-blue-500 transition-colors duration-300 ease-in-out outline-none`}>Create</button>
                </div>

                
            </form>

        
            

        </div>
  )
};

export default ProblemForm;



{/* <form onSubmit={handleSubmit}>
      <h2>Create New Problem</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      {/* Add more fields for other problem details */}
    //   <button type="submit">Submit</button>
    // </form>}