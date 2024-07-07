import React, {useState,useEffect,useRef} from 'react'
import { useParams,useLocation,NavLink,useNavigate } from 'react-router-dom';
import { fetchDatafromDatabaseUisngID,saveCodeToDatabase,RetrieveCodeFromDatabase} from '../../../api'
import { updateProblemInDatabase,deleteDatafromDatabase ,CompileCode,CompileCodeWithHiddenTestCases} from '../../../api';
import './style.css'
import ScaleLoader from 'react-spinners/ScaleLoader'

import MonacoEditor from 'react-monaco-editor';
import { diffWords } from 'diff';
import Header from './Header';

import { loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
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


function ProblemDetails() {

// const location=useLocation();
//   console.log("Location = ",location)
  const { id } = useParams();
  const [problemDetails, setProblemDetails] = useState(null);
  const [Editorial, setEditorial] = useState(null);
  const [Difficulty, setDifficulty] = useState(null);
  const [problemName, setProblemName] = useState(null);
  const [showTestCases, setShowTestCases] = useState(false);
  const [Edit, setShowEdit] = useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const [Language,setLanguage]=useState('C++')
  const [code, setCode] = useState('');
  const [updatedProblemDetails,setUpdatedProblemDetails] = useState({problemDetails})
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage,setPopupMessage] = useState('')
  const [isUpdateSuccessful,setIsUpdateSuccessful] = useState(false)
  const [Output,setOutput] = useState('')
  const [Input,setInput]   =  useState('')
  const [Verdict,setVerdict] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showInput,setShowInput] = useState(true)
  const [showOutput,setShowOutput] = useState(false)
  const [showVerdict,setShowVerdict] = useState(false)
  const [loading,setLoading] = useState(false)
  const [Delete,setDelete]           = useState('../../../../public/delete.png')
  const [hoverMessageforRun,setHoverMessageforRun] = useState(false)
  const [hoverMessageforSubmit,setHoverMessageforSubmit] = useState(false)
  const divRef=useRef()
  const testCasesRef = useRef();
  const {user} = useAuth()

  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropDownContent = (e) => {
    setLanguage(e.target.innerText)
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
    if (divRef.current) {
      const height = divRef.current.clientHeight;
      console.log('Height of div:', height);
    }

    setIsUpdateSuccessful(false)
  }, []);

  

  useEffect(() => {
    // Fetch ProblemStatement based on id
    fetchDatafromDatabaseUisngID(id).then((response) => {
      console.log("Data Received = ",response)
      setProblemDetails(response.data.message.ProblemStatement);
      setProblemName(response.data.message.ProblemName)
      setDifficulty(response.data.message.Difficulty)
      setEditorial(response.data.message.Editorial)
      setUpdatedProblemDetails(response.data.message.ProblemStatement)

      
    });

  }, [id]);


  useEffect(() => {
    console.log("User in useEffect = ",user)
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

  
  const Popup = (value) => {
    setPopupMessage(value);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide after 2 seconds
  }
  

  // useEffect(() => {
  //   // Load code from local storage on mount
  //   const savedCode = localStorage.getItem('editorCode');
  //   if (savedCode) {
  //     setCode(savedCode);
  //   }
  // }, []);


  const handleEditorChange = (newValue) => {
    setCode(newValue);
    saveCodeToDatabase(id,newValue,user.id).then(response => {

    })
    console.log("newValue",newValue)
  };


  const handleEdit = () => {
    setShowEdit(!Edit)
  }

 const handleUpdate = (e) => {
  setShowEdit(!Edit)
  if(updatedProblemDetails!==problemDetails){
    // const diff=diffWords(problemDetails,updatedProblemDetails)
    // console.log("diff = ",diff)
    // console.log("diff value = ",diff[1].value);
    // const diffValue=diff[1].value
    // diff.forEach((part) => {
    //   // green for additions, red for deletions
    //   let text = part.added ? part.value.bgGreen :
    //              part.removed ? part.value.bgRed :
    //                             part.value;
    //   if(part.added){
    //     console.log(part.value)
    //   }
    //   else if(part.removed){
    //     console.log(part.value)
    //   }

    //   else{
        
    //       console.log(part.value)
        
    //   }

    // });
    const response = updateProblemInDatabase(id,{updatedProblemDetails :updatedProblemDetails })
    // console.log("response  == ",response)
    response.then(data => {
      // console.log("Daaataa = ",data)
      // console.log("data.success =",data.data)
      if(data.data.success){
        // setProblemDetails(updatedProblemDetails)
        Popup("Updated Successfully")
        setIsUpdateSuccessful(true)

      }
      else{
        Popup("An error occurred")
      }

    }).catch(error => {
      console.log("error" , error)
    })

  }
 }


  const PopupMessage = ({ message, show }) => {
    return (
      <div className={`popup ${show ? 'show' : ''}`}>
        <p>{message}</p>
      </div>
    );
  };

  const handleDelete = () => {
    const response = deleteDatafromDatabase(id)
    console.log("reponse gott = ",response)
    response.then(data => {
      console.log("data = ",data)
      if(data.data.success){
        navigate("/problemSet")
      }
    })
  }


  const handleRun = (e) => {
    e.preventDefault();
    if(code===''){
      Popup("Cannot provide empty code")
    }

    else{
      console.log("Language = ",Language, "code = ",code)
      console.log("Input = ",Input)
      setOutput('')
      CompileCode(Language,code,Input).then(data => {
        console.log("data = ",data)
          console.log("message = ",data.data.output.message)
          const message=data.data.output.message
          const OutputReceived=data.data.output.output
          setOutput({message,OutputReceived})
          console.log("Output = ",Output)
        
      
        setShowTestCases(true)
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
      CompileCodeWithHiddenTestCases(Language,code,id).then(data => {
        const response=data.data.result
        setVerdict(response)
        setIsSubmitted(true)
        setLoading(false)

      })
    }

  }


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
    <div ref={divRef} className='flex flex-row  mx-5 w-[1500px] overflow-x-hidden'>
      <div className="max-w-3xl px-4 py-8 bg-white mr-2 max-h-[675px] overflow-auto">

        {isUpdateSuccessful && (
          <div className='w-[90%] bg-yellow-100 rounded-md mb-3 p-2 font-mono opacity-90'>
          Problem has been updated, refresh the page to view the changes
          </div>
        )
        

        }
        
        <Header id={id} Editorial={Editorial} ProblemName={problemName}/>
        
        <div>
        <ul className={`flex justify-between p-2`}>
          <li className='font-semibold cursor-pointer' onClick={handleEdit}>Edit</li>
          <li className='cursor-pointer'onClick={handleDelete}><img src={Delete} alt="" className='h-6 w-6'/></li>
        </ul>

        {Edit && (
          <div className='h-[22rem] w-[30rem] bg-slate-50 border-2 rounded-md z-10 absolute shadow-2xl pb-5 '>
            <textarea value={updatedProblemDetails} onChange={(e) => setUpdatedProblemDetails(e.target.value)} name="" id="" className='h-[17.5rem] w-[29.8rem] bg-slate-50  p-2 focus:outline-none resize-none overflow-auto'></textarea>
            <button className='hover:outline-none focus:outline-none bg-blue-500 rounded-md mt-2 float-end mr-2' onClick={handleUpdate}>Done</button>

          </div>
        )}

        </div>

  {/* scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-y-scroll">
      <div class="h-64 bg-slate-400"></div>
  </div>


  */}
        <h1 className="text-2xl font-bold mb-4">{problemName}</h1>
        <p className={`text-sm font-semibold text-gray-600 mb-2 border-2 w-12 text-center bg-slate-300 rounded-md ${colorClass}`}>{Difficulty}</p>
        <div className=" mb-4 whitespace-pre-wrap">{problemDetails}</div>
        {/* {Editorial && (
          <div className="text-sm font-semibold">
            Editorial: <span className="italic">{Editorial}</span>
          </div>
        )} */}
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
                  value={code}
                  onChange={handleEditorChange}
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
                      <div className='flex h-full w-full'>
                      {Verdict.map((item,index)=> (
                        <div key={index}  className='pl-1 pt-1'>
                          <span className={`font-semibold ${item[0]=='T' ? `bg-green-500` : `bg-red-500`} p-2 rounded-md`}>{item}</span>
                      </div>
                      ))}

                      </div>
                    
                      }
                    </div>)}

                  </div>
                )}
          
          
          
        
        </div>
      

      </div>

      {showPopup && <PopupMessage message={popupMessage} show={showPopup}/>

      }
      
    </div>
  )
}

export default ProblemDetails