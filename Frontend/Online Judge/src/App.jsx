import { useState } from 'react'
import './App.css'
// import Cards from './Components/Cards'
import SignIn from './Auth/SignIn'

function App() {
  const [count, setCount] = useState(0)
  const Obj = {
    name:"Harsh",
    age:22
    
  }
  return (
    <>
      {/* <h1 className='bg-green-400 text-black rounded-xl p-20'>Hello</h1>
      <Cards channel="Harsh" Obj={Obj}/> */}
      <SignIn/>


    </>
  )
}

export default App
