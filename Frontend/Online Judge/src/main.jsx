import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignIn from './Auth/SignIn.jsx'
import Register from './Auth/Register.jsx'
import ProblemSetterPage from './Components/Problems/MainPage.jsx'
import ProblemSet from './Components/Problems/ProblemSet.jsx'
import ProblemForm from './Components/Problems/ProblemForm.jsx'
import ProblemDetails from './Components/Problems/ProblemDetails/ProblemDetails.jsx'
import Editorial from './Components/Problems/ProblemDetails/Editorial.jsx'
import UserContextProvider from './Context/UserContextProvider.jsx'
import Profile from './Profile/Profile.jsx'
import Home from './HomePage/Home.jsx'
import { Route, Router, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Components/Layout.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
    <Route path='main' element = {<ProblemSetterPage/>}/>
    <Route path='problemSet' element = {<ProblemSet/>}/>
    <Route path='problemForm' element = {<ProblemForm/>}/>'
    <Route path="problemDetails/:id" element={<ProblemDetails/>}/>
    <Route path='Editorial/:id' element={<Editorial/>}/>
    <Route path='Profile' element = {<Profile/>}/>
    <Route path='' element={<Home/>}/>
    </Route>
    <Route path='login' element = {<SignIn/>}/>
    <Route path='register' element = {<Register/>}/>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>,
)


      
    