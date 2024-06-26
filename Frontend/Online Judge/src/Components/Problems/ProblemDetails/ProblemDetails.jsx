import React, {useState,useEffect,useRef} from 'react'
import { useParams,useLocation,NavLink } from 'react-router-dom';
import { fetchDatafromDatabaseUisngID } from '../../../api'
import MonacoEditor from 'react-monaco-editor';
import Header from './Header';

import { loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

const LanguageMap = new Map([
  ['C++', 'cpp'],
  ['Java', 'java'],
  ['Python', 'python'],
  ['Javascript', 'javascript'],
]);




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


function ProblemDetails() {

const location=useLocation();
  console.log("Location = ",location)
  const { id } = useParams();
  const [problemDetails, setProblemDetails] = useState(null);
  const [Editorial, setEditorial] = useState(null);
  const [Difficulty, setDifficulty] = useState(null);
  const [problemName, setProblemName] = useState(null);
  const [showTestCases, setShowTestCases] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [Language,setLanguage]=useState('C++')

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropDownContent = (e) => {
    setLanguage(e.target.innerText)
    setIsOpen(!isOpen)
  }

  const toggleTestCases = () => {
    setShowTestCases(!showTestCases);
    
  };
  
  console.log("id = ",id)


  const divRef=useRef()
  useEffect(() => {
    if (divRef.current) {
      const height = divRef.current.clientHeight;
      console.log('Height of div:', height);
    }
  }, []);

  const testCasesRef = useRef();

  useEffect(() => {
    // Fetch ProblemStatement based on id
    fetchDatafromDatabaseUisngID(id).then((response) => {
      console.log("Data Received = ",response)
      setProblemDetails(response.data.message.ProblemStatement);
      setProblemName(response.data.message.ProblemName)
      setDifficulty(response.data.message.Difficulty)
      setEditorial(response.data.message.Editorial)

      
    });
  }, [id]);


  if (!problemDetails) {
    return <div>Loading...</div>;
  }

  let colorClass = '';
  if (Difficulty === 'Hard') {
    colorClass = 'text-red-500'; // Red color for Hard difficulty
  } else if (Difficulty === 'Medium') {
    colorClass = 'text-yellow-500'; // Yellow color for Medium difficulty
  } else {
    colorClass = 'text-green-500'; // Green color for Easy difficulty
  }


  

  return (
    <div ref={divRef} className='flex flex-row  mx-auto w-[1500px] '>
    <div className=" max-w-3xl   px-4 py-8 bg-white mr-2 max-h-[675px] overflow-auto">
      {/* <div>
        
        <ul className='flex gap-3 mb-2 font-semibold w-[28rem]  justify-around'>
          <li> <NavLink to={`/problemDetails/${id}`}  className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer `}>Description</NavLink></li>
          <li> <NavLink to={`/Editorial/${id}`} state={{Editorial:{Editorial},id:{id} }} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"} cursor-pointer `}>Editorial</NavLink></li>
          <li> <NavLink to={'/'} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"} cursor-pointer `}>My Submission</NavLink></li>
          <li><NavLink to={'/'} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"} cursor-pointer `}>All Submission</NavLink></li>
        </ul>
      </div> */}
      <Header id={id} Editorial={Editorial} ProblemName={problemName}/>
      <h1 className="text-2xl font-bold mb-4">{problemName}</h1>
      <p className={`text-sm font-semibold text-gray-600 mb-2 border-2 w-12 text-center bg-slate-300 rounded-md ${colorClass}`}>{Difficulty}</p>
      <div className=" mb-4">{problemDetails}</div>
      {Editorial && (
        <div className="text-sm font-semibold">
          Editorial: <span className="italic">{Editorial}</span>
        </div>
      )}
    </div>

    {/* Code Editor + TestCases Div */}
    <div>
    <div className=' bg-white border-2 px-4 py-8 w-[800px] max-h-[675px] overflow-auto'>

      
    
    <div className="relative inline-block text-left">
      {/* Dropdown button */}
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 mb-2 "
        onClick={toggleDropdown}
      >
        {Language}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <li href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={(e) => handleDropDownContent(e)}>C++</li>
            <li href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={(e) => handleDropDownContent(e)} >Java</li>
            <li href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={(e) => handleDropDownContent(e)}>Python</li>
            <li href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white" onClick={(e) => handleDropDownContent(e)}>Javascript</li>
          </div>
        </div>
      )}
    </div>


    <div className='relative z-0'>
    <MonacoEditor
            width="100%"
            height="500px"
            language={LanguageMap.get(Language)}
            theme="vs-dark"
            options={{ // Optional: Additional editor options
              wordWrap: 'on', // Enable word wrap
              automaticLayout: true // Enable automatic layout
    
            }}
          />
    </div>
    <div className='flex w-full justify-end'> 
     <button className='border-2 rounded-xl bg-slate-200 mt-3 px-8 font-bold outline-none focus:outline-none focus:border-none hover:border-transparent hover:bg-slate-300 transition-all duration-200 ease-in-out'
     onClick={toggleTestCases}>Testcases</button>
      <button type='submit' className='border-2 rounded-xl bg-slate-200 mt-3 px-8 ml-3 font-bold outline-none focus:outline-none focus:border-none hover:border-transparent hover:bg-slate-300 transition-all duration-200 ease-in-out'>Run</button>
      <button type='submit' className='border-2 rounded-xl bg-green-500 mt-3 items-end  ml-3 font-bold text-white outline-none focus:outline-none focus:border-none hover:border-transparent hover:bg-green-600 transition-all duration-200 ease-in-out'>Submit</button>
    
    </div>

    {showTestCases && (
            <div className="bg-white border-2 px-4 py-8 w-full mt-4">
              <div className="tab">
                <button className="tablinks active">Input</button>
                <button className="tablinks">Output</button>
                <button className="tablinks">Verdict</button>
              </div>
              <div className="tabcontent">
                <p>Test cases content goes here...</p>
              </div>
            </div>
          )}
      
      
      
    
    </div>
    

    </div>
    
    </div>
  )
}

export default ProblemDetails