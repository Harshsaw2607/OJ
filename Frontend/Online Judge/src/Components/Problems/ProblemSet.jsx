import React from 'react'
import { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchDatafromDatabase } from '../../api'
import List from '../List'
import NavBar from '../../HomePage/NavBar'
function ProblemSet(Data) {
  
  const [problems,setProblems]=useState([])
  const [updateUI,setUpdateUI]=useState(0)
  

  useEffect(() => {
    fetchDatafromDatabase().then(response =>{
      console.log("responseGot = ",response);
      setProblems(response)
      // setUpdateUI(!updateUI)
    }).catch(error =>{
      console.log("Error while fetching data",error)
    })
  },[updateUI])
  

  return (
    <div>
      {/* <NavBar/> */}
       
      <ul className='ml-10 mt-10'>
      <div className='flex justify-center w-[50rem]'><h2>Problems</h2></div>
        <div className='flex flex-row w-[50rem] justify-between  px-4 pl-6'>
        <p>Name</p>
        <p>Difficulty</p>
        </div>
      {problems.map((problem,index) =>{
        console.log("problem = ",problem)
          return (<List ProblemName={problem.ProblemName} Difficulty={problem.Difficulty} id={problem._id} ProblemStatement={problem.ProblemStatement} last={index === problems.length - 1}/>)
      })}
      </ul>
    
    </div>
  )
}

export default ProblemSet