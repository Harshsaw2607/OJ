import React, {useState,useEffect,useRef} from 'react'
import {useLocation} from 'react-router-dom';
import {saveCodeToDatabase,RetrieveCodeFromDatabase} from '../../../api'
import { CompileCode,CompileCodeWithHiddenTestCases} from '../../../api';
import ScaleLoader from 'react-spinners/ScaleLoader'

import MonacoEditor from 'react-monaco-editor';
import Header from './Header';

import { loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import useAuth from '../../../Hooks/useAuth';
import CodeEditor from './CodeEditor';


const LanguageMap = new Map([
  ['C++', 'cpp'],
  ['Java', 'java'],
  ['Python', 'python'],
  ['Javascript', 'javascript'],
]);

const LanguageExtensionMap =new Map([
  ['C++', 'cpp'],
  ['Java', 'java'],
  ['Python', 'py'],
  ['Javascript', 'js'],
])




self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

loader.init().then(/* ... */);


function Editorial() {

  let state=useLocation()
  console.log("state = ",state)
  console.log("state Val = ",state.state);
  if(state.state.Editorial===null){
    return <div>Loading Editorial...</div>;
  }

  const Editorial=state.state.Editorial.Editorial
  const id=state.state.id.id
  const problemName=state.state.ProblemName.ProblemName
  const testcases = state.state.testcases.testcases
 
  

  return (
    <div  className='flex flex-row  mx-5 w-[1500px] overflow-x-hidden'>
      <div className="max-w-3xl  px-4 py-8 bg-white mr-2 max-h-[675px] overflow-auto">
        <Header id={id} Editorial={Editorial}/>
        <h1 className="text-2xl font-bold mb-4">{problemName}</h1>
          
            <pre className=" mb-4 whitespace-pre-wrap">{Editorial}</pre>
          
      
    </div>

      {/* Code Editor + TestCases Div */}
        <CodeEditor testcases={testcases} id = {id}/>

      
      
    </div>
  )
}

export default Editorial


























// import React from 'react'
// import { useLocation } from 'react-router-dom'
// import Header from './Header'

// function Editorial() {
//   let state=useLocation()
//   console.log("state = ",state)
//   console.log("state Val = ",state.state);
//   if(state.state.Editorial===null){
//     return <div>Loading Editorial...</div>;
//   }

//   const Editorial=state.state.Editorial.Editorial
//   const id=state.state.id.id
//   const problemName=state.state.ProblemName.problemName
//   // const { Editorial } = props.location.state;

//   // if (Editorial === null) {
//   //   return <div>Loading Editorial...</div>;
//   // }
//   return (
//     <>
    
//     <div className="max-w-3xl  px-4 py-8 bg-white max-h-[675px]">
//     <Header id={id} Editorial={Editorial}/>
//     <h1 className="text-2xl font-bold mb-4">{problemName}</h1>
      
//         <div className=" mb-4">{Editorial}</div>
      
      
//     </div>
//     </>
//   )
  
// }

// export default Editorial