// import React, {useEffect} from 'react'
// import { Link } from 'react-router-dom'

// function List({ ProblemName, Difficulty, id, ProblemStatement, last }) {

//   return (
//     <li className=''>
//       <div className={`w-[50rem] h-[3rem] border-[1px] border-gray-500 flex flex-row justify-between px-4 items-center ${last ? 'border-b-[1px]' : 'border-b-0'} `}>
//         <p><Link to={`/problemDetails/${id}`}>{ProblemName}</Link></p>  
//         <p>{Difficulty}</p>
//       </div>
//     </li>
//   )
// }

// export default List

// List.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function List({ ProblemName, Difficulty, id }) {
  return (
    <tr className="border-b border-gray-300">
      <td className="px-6 py-3 whitespace-nowrap">
        <Link to={`/problemDetails/${id}`} className="text-blue-500 hover:text-blue-700">
          {ProblemName}
        </Link>
      </td>
      <td className={`px-6 py-3 whitespace-nowrap ${Difficulty==='Hard' ? 'text-red-600' : Difficulty==='Easy' ? 'text-green-600' 
        : Difficulty==='Medium' ? 'bg-yellow-600' : '' } `}>{Difficulty}</td>
    </tr>
    
  );
}

export default List;

