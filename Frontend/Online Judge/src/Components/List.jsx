import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

function List({ ProblemName, Difficulty, id, ProblemStatement, last }) {

  return (
    <li className=''>
      <div className={`w-[50rem] h-[3rem] border-[1px] border-gray-500 flex flex-row justify-between px-4 items-center ${last ? 'border-b-[1px]' : 'border-b-0'} `}>
        <p><Link to={`/problemDetails/${id}`}>{ProblemName}</Link></p>  
        <p>{Difficulty}</p>
      </div>
    </li>
  )
}

export default List