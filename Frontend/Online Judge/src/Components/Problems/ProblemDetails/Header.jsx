import React from 'react'
import { NavLink } from 'react-router-dom'


function Header({id,Editorial,ProblemName}) {
    
  return (
    <div>
        
        <ul className='flex gap-3 mb-2 font-semibold w-[28rem]  justify-around'>
          <li> <NavLink to={`/problemDetails/${id}`}  className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer  `}>Description</NavLink></li>
          
          <li> <NavLink to={`/Editorial/${id}`} state={{Editorial:{Editorial},id:{id},ProblemName:{ProblemName} }} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer `}>Editorial</NavLink></li>
          <li> <NavLink to={'/'} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer `}>My Submission</NavLink></li>
          <li><NavLink to={'/'} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer `}>All Submission</NavLink></li>
        </ul>
      </div>
  )
}

export default Header