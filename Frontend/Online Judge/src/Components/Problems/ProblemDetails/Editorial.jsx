import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'

function Editorial() {
  let state=useLocation()
  console.log("state = ",state)
  console.log("state Val = ",state.state);
  if(state.state.Editorial===null){
    return <div>Loading Editorial...</div>;
  }

  const Editorial=state.state.Editorial.Editorial
  const id=state.state.id.id
  const problemName=state.state.ProblemName.problemName
  // const { Editorial } = props.location.state;

  // if (Editorial === null) {
  //   return <div>Loading Editorial...</div>;
  // }
  return (
    <>
    
    <div className="max-w-3xl  px-4 py-8 bg-white min-h-[480px]">
    <Header id={id} Editorial={Editorial}/>
    <h1 className="text-2xl font-bold mb-4">{problemName}</h1>
      
        <div className=" mb-4">{Editorial}</div>
      
      
    </div>
    </>
  )
  
}

export default Editorial