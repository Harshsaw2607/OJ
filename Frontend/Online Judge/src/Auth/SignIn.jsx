import React, {useState, useRef,useEffect } from 'react'
// import Button from './Components/Button'
import {uploadDataLogIn } from '../api'
import {Link} from 'react-router-dom'

function Auth() {

    
    const emailRef = useRef();
    const passwordRef = useRef();
    const ButtonRef=useRef();
    const [errorMsgEmail,setErrorMsgEmail]=useState('')
    const [errorMsgPass,setErrorMsgPass]=useState('')
    const [passwordMessage, setPasswordMessage] = useState('');
    // const [clickButton,setclickButton]=useState(0)
    
   
    const handleSubmit = (e) => {
       e.preventDefault();

        if(emailRef.current.value==""){
            setErrorMsgEmail("This field is required")
        }
        if(passwordRef.current.value==""){
            setErrorMsgPass("This field is required")
        }
        const Data ={
        email: emailRef.current.value,
        password: passwordRef.current.value,
        };

        console.log("Data = ",Data);
        
        uploadDataLogIn(Data).then(newResponse =>{
            if(!newResponse.success){
                console.log("responseVal ",newResponse)
                if(newResponse.data==="User doesn't exist"){
                    setErrorMsgEmail(newResponse.data)
                }
                    
            }
            else{
    
            }
        })
        
        

        
    };



    const [showPassword, setShowPassword] = useState(false);
    const [eyeIcon, setEyeIcon] = useState('./public/hide.png'); // Initial image path

    const togglePasswordVisibility = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
        if (showPassword) {
            setEyeIcon('./public/hide.png'); // Image when password is hidden
        } else {
            setEyeIcon('./public/show.png'); // Image when password is shown
        }
    };



    const handlePasswordChange = (e) => {
        const value = e.target.value;
        console.log(value)
        // setPassword(value);

        // Check password criteria
        if ((!value.length)||(value.length >= 10 && /[0-9]/.test(value) && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value))) {
            setPasswordMessage(''); // Clear message if all criteria are met
        } else {
            setPasswordMessage('Must be 10 characters or more, needs at least one number, one UpperCase letter, one LowerCase letter and one special character');
        }
    };


    const isButtonDisabled= errorMsgEmail || errorMsgPass || passwordMessage




  return (
    <>
    <div className="h-auto w-[480px] border-black-5 shadow-xl  bg-slate-50 p-8 overflow-hidden"> 
        <div className=' text-black font-semibold m-2 text-lg'>Online Judge</div>
        
        <form onSubmit={handleSubmit} className='flex-col items-center'>
            <div>
                <label htmlFor="email"></label>
                <input type="email" ref={emailRef} name="email" id="email"  placeholder='Email' 
                className=" outline-none border-[1px] border-slate-200 rounded-md m-4 p-2" style={{ width: '300px' }}
                onFocus={() => setErrorMsgEmail('')}/>
            </div>
            <p className='text-red-700 relative right-[6.4rem] bottom-3' style={{ fontSize: '10px' }}>{errorMsgEmail}</p>


            <div>
                <label htmlFor="password"></label>
                <input type={showPassword ? "text" : "password"} ref={passwordRef} name="password" id="password"  placeholder='Password' 
                className=" outline-none border-[1px] border-slate-200 rounded-md m-4  p-2 relative left-7" style={{ width: '300px' }}
                onFocus={() => setErrorMsgPass('')} onChange={handlePasswordChange}/>

                <button className='inline relative top-1 outline-none border-none focus:outline-none focus:border-none
                m-0 right-12 bg-white' onClick={togglePasswordVisibility}><img src={eyeIcon} alt="Icon" className=' m-0 w-5 h-5 p-0 bg-white'/></button>

                {passwordMessage && (
                    <p className='text-red-700 mb-20 relative left-12 break-normal max-w-[300px]' style={{ fontSize: '10px' }}>
                    {passwordMessage}
                    </p>
                )}

                {errorMsgPass && (
                    <p className='text-red-700 relative right-[6.4rem] bottom-[0.9rem] mb-20' style={{ fontSize: '10px' }}>
                    {errorMsgPass}
                    </p>
                )}

            </div>
            
        


            <div>
                {/* <Button name="Register" colour="#70c7ff"/> */}
                <button type='submit' className={`border-2 rounded-md text-black font-medium text-center mb-2 mt-6 bg-blue-400 hover:bg-blue-500 transition-colors duration-300 ease-in-out outline-none  ` }
                disabled={isButtonDisabled} style={{ width: '300px' }} >Sign In</button>
            </div>


            <div>
                <p>Don't have an account? <Link to="/register" className="text-black hover:text-black mt-5">Register</Link></p>
            </div>

        </form>

    </div>
    </>
  )
}

export default Auth