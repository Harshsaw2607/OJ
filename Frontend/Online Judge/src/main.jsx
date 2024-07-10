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
import MySubmissions from './Components/Problems/ProblemDetails/MySubmissions.jsx'
import AllSubmissions from './Components/Problems/ProblemDetails/AllSubmissions.jsx'
import Unauthorised from './Unauthorised.jsx'
import RequireAuthorisation from './RequireAuthorisation.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
    <Route path='main' element = {<ProblemSetterPage/>}/>
    <Route path='problemSet' element = {<ProblemSet/>}/>
    <Route path="problemDetails/:id" element={<ProblemDetails/>}/>
    <Route path='Editorial/:id' element={<Editorial/>}/>
    <Route path='MySubmission/:id' element={<MySubmissions/>}/>
    <Route path='AllSubmission/:id' element={<AllSubmissions/>}/>
    <Route path='Profile' element = {<Profile/>}/>
    <Route path='' element={<Home/>}/>
    </Route>
    <Route path='/' element={<RequireAuthorisation allowedRoles={[1984]}/>}>
    <Route path='problemForm' element = {<ProblemForm/>}/>
    </Route>
    <Route path='login' element = {<SignIn/>}/>
    <Route path='register' element = {<Register/>}/>
    <Route path='unauthorised' element={<Unauthorised/>}/>
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


      
    