import { useState } from 'react'
import './App.css'
// import Cards from './Components/Cards'
import SignIn from './Auth/SignIn'
import UserContextProvider from './Context/UserContextProvider'
import Profile from './Profile/Profile'

function App() {
  const [count, setCount] = useState(0)
  const Obj = {
    name:"Harsh",
    age:22
    
  }
  return (
    <UserContextProvider>
      <SignIn/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App
