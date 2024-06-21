import React from 'react'
// const [clickButton,setclickButton]=useState(0)

function Button({name,colour}) {
  return (
    <button type='submit' className={`border-2 rounded-md text-black font-medium text-center mb-2 bg-blue-400 hover:bg-blue-500 transition-colors duration-300 ease-in-out outline-none  w-full`}>{name}</button>
  )
}

export default Button