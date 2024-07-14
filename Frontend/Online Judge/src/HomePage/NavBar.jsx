import React, { useEffect, useState, useRef } from 'react'
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import axios from 'axios'
const URL = "http://15.207.47.162:3000"
// const URL = "http://localhost:3000"
function NavBar() {
  const location = useLocation()
  const [showUser, setShowUser] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate();
  const { user, setUser } = useAuth()
  const UserDetailsRef = useRef()
  const UserIconRef = useRef()

  useEffect(() => {
    const externalElement = document.querySelector('#root');
    externalElement.style.padding = 0
    return () => {
      externalElement.style.padding = ''
      // window.scrollTo(0, 0); // Scroll to top
    }

  }, [])

  useEffect(() => {
    if (user) {
      const array = user.roles
      const roles = array.includes(1984)
      if (roles) {
        setIsAdmin(true)
      }
    }
  }, [user])


  useEffect(() => {
    // Fetch user data from the server to verify authentication
    axios.get(`${URL}/api/auth/profile`, { withCredentials: true })
      .then(response => {
        setUser({ email: response.data.user.username, id: response.data.user.id, roles: response.data.user.roles })
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.post(`${URL}/api/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch(error => console.error('Error logging out:', error));
  };

  const handleUserVisibility = () => {
    setShowUser(!showUser)
  }

  const handleClickOutside = (event) => {
    if (UserDetailsRef.current && !UserIconRef.current.contains(event.target) && !UserDetailsRef.current.contains(event.target)) {
      setShowUser(false);
    }
  };

  useEffect(() => {
    if (showUser) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUser]);

  return (
    <div className='flex justify-between w-[100%] bg-slate-800 border-b-2  border-t-4 h-[3rem] items-center p-4 m-0'>
      <div className=' flex justify-between w-[60%] '>
        <p className='text-white'>CodeSmash</p>
        <ul className='flex gap-5 mb-2 font-semibold justify-center items-center'>
          <li> <NavLink to={`/`} className={({ isActive }) => ` ${isActive ? "text-orange-400  text-center" : "text-gray-500"}    cursor-pointer  `}>Home</NavLink></li>
          {/* <li> <NavLink to={`/about`} className={({ isActive }) => ` ${isActive ? "text-orange-400   p-1 text-center" : "text-gray-500"}    cursor-pointer `}>About</NavLink></li> */}
          <li> <NavLink to={'/contest'} className={({ isActive }) => ` ${isActive ? "text-orange-400   p-1 text-center" : "text-gray-500"}  cursor-pointer `}>Contest</NavLink></li>
          <li><NavLink to={'/problemSet'} className={({ isActive }) => ` ${isActive ? "text-orange-400  p-1 text-center" : "text-gray-500"}  cursor-pointer `}>Problemset</NavLink></li>
          <li><NavLink to={'/problemForm'} className={({ isActive }) => ` ${isActive ? "text-orange-400  p-1 text-center" : "text-gray-500"}  cursor-pointer ${isAdmin ? 'block' : 'hidden'}  `}>Add Problem</NavLink></li>
        </ul>
      </div>

      <ul className=' flex gap-3'>
        {user ? (<>
          <li onClick={handleUserVisibility} className='relative'><img ref={UserIconRef} src="/user.png" alt="" className='h-[25px] w-[25px] mr-10 cursor-pointer' /></li>
          {showUser && (
            <div ref={UserDetailsRef} className='h-[10rem] w-auto border-2 rounded-md bg-blue-200 absolute z-20 p-2' style={{ right: '30px', top: '20%', transform: 'translateY(-50%)' }} >
              <ul className='cursor-pointer'>
                <li className='flex m-0'><img src="/user.png" alt="" className='h-[25px] w-[25px] mr-2 cursor-pointer' />{user.email}</li>
                <li className='flex mt-3'><img src="/exit.png" alt="" className='h-[25px] w-[25px] mr-2 cursor-pointer' /><div onClick={handleLogout}>Sign Out</div></li>
              </ul>
            </div>
          )}

        </>)

          :

          (
            <>
              <li><NavLink to={`/login`} state={{ from: location }} replace className={'text-gray-500'}>Login</NavLink></li>
              <li><NavLink to={`/register`} className={'text-gray-500'}>Sign Up</NavLink></li>
            </>
          )

        }


      </ul>
    </div>
  )
}

export default NavBar