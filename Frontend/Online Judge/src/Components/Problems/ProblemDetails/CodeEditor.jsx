import React, {useState,useEffect,useRef} from 'react'
import {useLocation} from 'react-router-dom';
import {saveCodeToDatabase,RetrieveCodeFromDatabase,SaveVerdictToDatabase} from '../../../api'
import { CompileCode,CompileCodeWithHiddenTestCases} from '../../../api';
import ScaleLoader from 'react-spinners/ScaleLoader'

import MonacoEditor from 'react-monaco-editor';


import { loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// // import jsonWorker from 'monaco-editor/esm/vs/lang/json/json.worker?worker';
// import cssWorker from 'monaco-editor/esm/vs/lang/css/css.worker?worker';
// import htmlWorker from 'monaco-editor/esm/vs/lang/html/html.worker?worker';
// import tsWorker from 'monaco-editor/esm/vs/lang/typescript/ts.worker?worker';
import useAuth from '../../../Hooks/useAuth';


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

function CodeEditor({testcases,id}) {

    const [IndexAtWhichTestCaseFailed,setIndexAtWhichTestCaseFailed] = useState(0)
    const [OutPutReceivedForFailedTestcase, setOutPutReceivedForFailedTestcase] = useState('')
    const [showTestCases, setShowTestCases] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [language,setLanguage]=useState('C++')
    const [isLanguageUpdated,setIsLanguageUpdated] = useState(false)
    const [code, setCode] = useState('');
    const [Output,setOutput] = useState('')
    const [Input,setInput]   =  useState('')
    const [Verdict,setVerdict] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showInput,setShowInput] = useState(true)
    const [showOutput,setShowOutput] = useState(false)
    const [showVerdict,setShowVerdict] = useState(false)
    const [loading,setLoading] = useState(false)
    const [hoverMessageforRun,setHoverMessageforRun] = useState(false)
    const [hoverMessageforSubmit,setHoverMessageforSubmit] = useState(false)
    const [passCount,setPassCount] = useState(0)
    const [ResultForMySubmission,setResultForMySubmission]  = useState(null)
    const testCasesRef = useRef();
    const {user} = useAuth()

    let LanguageUsedInCode='C++'
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleDropDownContent = (e) => {
      
      setLanguage(e.target.innerText)
      LanguageUsedInCode=e.target.innerText
      console.log("LanguageUsedInCode = ",LanguageUsedInCode)
      setIsLanguageUpdated(true)
      setIsOpen(!isOpen)
    }
  
    const toggleTestCases = () => {
      setShowTestCases(!showTestCases);
      setTimeout(() => {
          if (testCasesRef.current) {
              testCasesRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center'
              });
          }
      }, 100); 
      
    };
   
    
  
  
  
    useEffect(() => {
      user && RetrieveCodeFromDatabase(id,user.id).then(response => {
        console.log("Back data = ",response)
        if(response.data.success){
          setCode(response.data.data)
          console.log("code = ",code)
        }
      }).catch(error => {
        console.log("Error while getting Code From DB = ",error)
      })
  
    }, [user])
  
  
    const handleEditorChange = (newValue,LanguageReceived) => {
      setCode(newValue);
      console.log("language in Code = ",language)
      const lang=LanguageMap.get(language)
      
      saveCodeToDatabase(id,newValue,user.id,lang).then(response => {
  
      })
      console.log("newValue",newValue)
    };
  
  
    const handleRun = (e) => {
      e.preventDefault();
      if(code===''){
        Popup("Cannot provide empty code")
      }
  
      else{
        console.log("language = ",language, "code = ",code)
        console.log("Input = ",Input)
        setOutput('')
        setShowTestCases(true)
        setTimeout(() => {
          if (testCasesRef.current) {
              testCasesRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center'
              });
          }
      }, 100); 
        CompileCode(language,code,Input).then(data => {
          console.log("data = ",data)
            console.log("message = ",data.data.output.message)
            const message=data.data.output.message
            const OutputReceived=data.data.output.output
            setOutput({message,OutputReceived})
            console.log("Output = ",Output)
          
        
          
          setShowOutput(true)
          setShowInput(false)
          setShowVerdict(false)
          
  
        })
      }
  
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if(code===''){
        Popup("Cannot provide empty code")
      }
  
      else{
        setIsSubmitted(false)
        setVerdict('')
        setLoading(true)
        setShowTestCases(true)
        setShowVerdict(true)
        setShowOutput(false)
        setShowInput(false)
        setIndexAtWhichTestCaseFailed(0)
        setOutPutReceivedForFailedTestcase('')
        setPassCount(0)
        setTimeout(() => {
          if (testCasesRef.current) {
              testCasesRef.current.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center'
              });
          }
      }, 100); 
        CompileCodeWithHiddenTestCases(language,code,testcases).then(data => {
          const response=data.data.result
          setVerdict(response)
          setIsSubmitted(true)
          setLoading(false)
          let count=0;
          response.forEach(item => {
            console.log("item = ",item)
            
            
            if(item[0] === 'A'){
              count++;
              setPassCount(prev => prev+1)
            }
            else{
              setIndexAtWhichTestCaseFailed(count)
              setOutPutReceivedForFailedTestcase(item)
              setResultForMySubmission(item)

            }
          });

          if(count==response.length){
            setResultForMySubmission("Accepted")
          }
          
          // ResultForMySubmission && SaveVerdictToDatabase(id,ResultForMySubmission,user.id).then(responseBack => {
          //       console.log("ResponseBack = ",responseBack)
          // })
  
        })
      }
  
    }


    useEffect(() => {
      if (ResultForMySubmission!=null) {
        const lang=LanguageMap.get(language)
        console.log("ResultForMySubmission = ",ResultForMySubmission)
        SaveVerdictToDatabase(id, ResultForMySubmission,lang,code, user.id).then((responseBack) => {
          console.log('ResponseBack = ', responseBack);
        });

        setResultForMySubmission(null)

      }
    }, [ResultForMySubmission]);
  
  
    const handleShowInput = (e) => {
      e.preventDefault()
      setShowInput(true)
      setShowOutput(false)
      setShowVerdict(false)
    }  
    
    const handleShowOutput = (e) => {
      e.preventDefault()
      setShowInput(false)
      setShowOutput(true)
      setShowVerdict(false)
    } 
    
    const handleShowVerdict = (e) => {
      e.preventDefault()
      setShowInput(false)
      setShowOutput(false)
      setShowVerdict(true)
    }  
  
    
  
  
    console.log("userEntered = ",user)
    const isButtonDisabled = !user
    

  return (
    <div>
        <div className=' bg-white border-2 px-4 py-8 w-[800px] max-h-[675px] overflow-auto z-10'>
          <div className="relative inline-block text-left">
            {/* Dropdown button */}
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 mb-2 "
              onClick={toggleDropdown}
            >
              {language}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="origin-top-right absolute left-0 mt-2 w-44 rounded-lg shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
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
                  lang={LanguageMap.get(language)}
                  theme="vs-dark"
                  value={code}
                  onChange={(newValue) => handleEditorChange(newValue,language)}
                  options={{ // Optional: Additional editor options
                    wordWrap: 'on', // Enable word wrap
                    automaticLayout: true // Enable automatic layout
          
                  }}
                />
          </div>

          <div className='flex w-full justify-end'> 
          <button className='border-2 rounded-xl bg-slate-200 mt-3 px-8 font-bold outline-none focus:outline-none focus:border-none hover:border-transparent hover:bg-slate-300 transition-all duration-200 ease-in-out'
          onClick={toggleTestCases}>Testcases</button>
            <div className='relative' onMouseEnter={() => setHoverMessageforRun(true)}
                      onMouseLeave={() => setHoverMessageforRun(false)}><button type='submit' className={`border-2 rounded-xl bg-slate-200 mt-3 px-8 ml-3 font-bold outline-none focus:outline-none focus:border-none hover:border-transparent hover:bg-slate-300 transition-all duration-200 ease-in-out`} disabled={isButtonDisabled} onClick={handleRun}>Run</button>
              {(isButtonDisabled && hoverMessageforRun) && (
                <div className='bg-gray-200 text-black text-sm font-thin border-2 rounded-md whitespace-pre-wrap h-auto w-[14rem] px-1 transition-all duration-800 ease-in-out'style={{ position: 'absolute', right: '-50px', top: '65px' }}>
                  You need to login or sign up to Run
                </div>
              )}
            </div>

            <div className='relative' onMouseEnter={() => setHoverMessageforSubmit(true)}
                      onMouseLeave={() => setHoverMessageforSubmit(false)}>
              <button type='submit' className='border-2 rounded-xl bg-green-500 mt-3 items-end  ml-3 font-bold text-white outline-none focus:outline-none focus:border-none hover:border-transparent hover:bg-green-600 transition-all duration-200 ease-in-out' disabled={isButtonDisabled} onClick={handleSubmit}>Submit</button>
            
              {(isButtonDisabled && hoverMessageforSubmit) && (
                <div className='bg-gray-200 text-black text-sm font-thin border-2 rounded-md whitespace-pre-wrap h-auto w-[14rem] px-1 transition-all duration-800 ease-in-out'style={{ position: 'absolute', right: '0px', top: '65px' }}>
                  You need to login or sign up to Run
                </div>
              )}
            
            </div>


            

          
          </div>

          {showTestCases && (
                  <div ref={testCasesRef} className=" border-2 px-4 py-4 w-full  h-[220px] mt-4 bg-slate-500  ">
                    <div className="tab mb-4 ">
                      <button className="tablinks mr-2 bg-slate-300 outline-none focus:outline-none focus:border-none hover:border-transparent" onClick={handleShowInput} >Input</button>
                      <button className="tablinks mr-2 bg-slate-300 focus:outline-none focus:border-none hover:border-transparent" onClick={handleShowOutput} >Output</button>
                      <button className="tablinks bg-slate-300 focus:outline-none focus:border-none hover:border-transparent" onClick={handleShowVerdict}>Verdict</button>
                    </div>
                    {showInput && (<div className="tabcontent h-[65%]">
                      <textarea value={Input} name="InputTestCase" id="InputTestCase" className={`w-full h-full p-2 focus:outline-none rounded-md resize-none scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300  overflow-y-scroll `} placeholder='Write the test case'
                      onChange={(e) => setInput(e.target.value)}></textarea>
                    </div>) }

                    {showOutput && (<div  className={`w-full h-[65%] p-2 bg-white focus:outline-none rounded-md resize-none scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300  overflow-y-scroll whitespace-pre-wrap `}>
                      {Output.message!=='Successful Submission' ? (<div><p className='font-bold text-red-700'>{Output.message}</p>
                                                                        <div className='whitespace-pre-wrap'>{Output.OutputReceived}</div>
                              </div>) : (
                              <div>{Output.OutputReceived}</div>
                          )}
                        
                    </div>)}

                    {showVerdict && (<div className={`w-full h-[65%] p-2 pl-0 bg-white focus:outline-none rounded-md resize-none scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300  overflow-y-scroll flex justify-center items-center`}>
                      
                      <ScaleLoader
                        color='yellow'
                        loading={loading}
                        // cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                      
                      
                      {isSubmitted && 
                      <div className='flex h-full w-full relative'>
                        <div>
                          {Verdict && passCount===Verdict.length  && <div className='text-green-500 ml-1 '>All testcases passed</div>}
                          {Verdict && OutPutReceivedForFailedTestcase  && <div className='text-red-700  ml-1'>{OutPutReceivedForFailedTestcase}</div>}
                        </div>
                          <div className='flex items-center justify-start mt-[2rem] absolute h-[2.8rem]'>
                              {Verdict.map((item,index)=> (
                                <div key={index}  className='pl-1 pt-1 '>
                                  
                                    <span className={`font-semibold ${item[0]=='A' ? `bg-green-500` : `bg-red-500`} p-2 rounded-md`}>Test {index+1}</span>
                              </div>
                              ))}
                      </div>

                      </div>
                    
                      }
                    </div>)}

                  </div>
                )}
          
          
          
        
        </div>
      

      </div>
  )
}

export default CodeEditor