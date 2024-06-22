import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignIn from './Auth/SignIn.jsx'
import Register from './Auth/Register.jsx'
import ProblemSetterPage from './Components/Problems/MainPage.jsx'
import ProblemList from './Components/Problems/ProblemList.jsx'
import ProblemForm from './Components/Problems/ProblemForm.jsx'
import { Route, Router, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/login' element = {<SignIn/>}/>
    <Route path='/register' element = {<Register/>}/>
    <Route path='/main' element = {<ProblemSetterPage/>}/>
    <Route path='/problemList' element = {<ProblemList/>}/>
    <Route path='/problemForm' element = {<ProblemForm/>}/>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
