import React from 'react'
import { useLocation } from 'react-router-dom';

import Header from './Header';
import CodeEditor from './CodeEditor';


function Editorial() {

  let state = useLocation()
  if (state.state.Editorial === null) {
    return <div>Loading Editorial...</div>;
  }

  const Editorial = state.state.Editorial.Editorial
  const id = state.state.id.id
  const problemName = state.state.ProblemName.ProblemName
  const testcases = state.state.testcases.testcases



  return (
    <div className='flex flex-row  mx-5 w-[1500px] overflow-x-hidden'>
      <div className="max-w-3xl  px-4 py-8 bg-white mr-2 max-h-[675px] overflow-auto">
        <Header id={id} Editorial={Editorial} />
        <h1 className="text-2xl font-bold mb-4">{problemName}</h1>
        <pre className=" mb-4 whitespace-pre-wrap">{Editorial}</pre>
      </div>

      {/* Code Editor + TestCases Div */}
      <div className='flex-grow'>
        <CodeEditor testcases={testcases} id={id} />
      </div>

    </div>
  )
}

export default Editorial