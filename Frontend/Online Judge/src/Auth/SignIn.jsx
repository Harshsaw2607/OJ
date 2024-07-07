import React, {useState, useRef,useEffect} from 'react'
// import Button from './Components/Button'
import {uploadDataLogIn } from '../api'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import '../Components/Problems/ProblemDetails/style.css'

function Auth() {

    const navigate= useNavigate()
    const emailRef = useRef();
    const passwordRef = useRef();
    const ButtonRef=useRef();
    const [errorMsgEmail,setErrorMsgEmail]=useState('')
    const [errorMsgPass,setErrorMsgPass]=useState('')
    const [passwordMessage, setPasswordMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage,setPopupMessage] = useState('')
    // const [clickButton,setclickButton]=useState(0)
    
   const {user,setUser}=useAuth()
   const location=useLocation()
   const from=location.state?.from?.pathname || '/'

   console.log("location = ",location)


//    setUser("Hello")
   console.log("user = ",user)
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
            console.log("responseVal ",newResponse)
            if(!newResponse.success){
                if(newResponse.data.message==="User doesn't exist"){
                    setErrorMsgEmail(newResponse.data.message)
                }

                if(newResponse.data.message==='Password is incorrect'){
                    setErrorMsgPass(newResponse.data.message)
                }
                    
            }
            else{

                console.log("New Response = ",newResponse.message)
                setUser({email : newResponse.userExists.email, id : newResponse.userExists._id})
                console.log("New USer = ",user)
                Popup('Logged in Successfully')
                setTimeout(() => {
                    navigate(from, {replace:true})
                },2000)
                

                
            }
        }).catch(error => {
            Popup("No Server Response")
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
        // console.log(value)
        // setPassword(value);

        // Check password criteria
        if ((!value.length)||(value.length >= 10 && /[0-9]/.test(value) && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value))) {
            setPasswordMessage(''); // Clear message if all criteria are met
        } else {
            setPasswordMessage('Must be 10 characters or more, needs at least one number, one UpperCase letter, one LowerCase letter and one special character');
        }
    };


    const isButtonDisabled= errorMsgEmail || errorMsgPass || passwordMessage


    useEffect(() => {
        const externalElement = document.querySelector('#root');
        document.body.style.display='flex';
        document.body.style.alignItems = 'center';
        externalElement.style.margin='auto'
        externalElement.style.textAlign='center'

        return () => {
            document.body.style.display = '';
            document.body.style.alignItems = '';
            externalElement.style.margin=''
            externalElement.style.textAlign=''
            window.scrollTo(0, 0); // Scroll to top
          }

    },[])

    const Popup = (value) => {
        setPopupMessage(value);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000); // Hide after 2 seconds
    }

    const PopupMessage = ({ message, show }) => {
        return (
          <div className={`popup ${show ? 'show' : ''}`}>
            <p>{message}</p>
          </div>
        );
      };




  return (
    <>
    <div className="h-auto w-[480px] border-black-5 shadow-xl  bg-slate-50 p-8 overflow-hidden"> 
        <div className=' text-black font-semibold m-2 text-lg '>Online Judge</div>
        
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
                    <p className='text-red-700 mb-5 relative left-12 break-normal max-w-[300px]' style={{ fontSize: '10px' }}>
                    {passwordMessage}
                    </p>
                )}

                {errorMsgPass && (
                    <p className='text-red-700 relative right-[6.4rem] bottom-[0.9rem] mb-5' style={{ fontSize: '10px' }}>
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

        {showPopup && <PopupMessage message={popupMessage} show={showPopup}/>}

    </div>
    </>
  )
}

export default Auth