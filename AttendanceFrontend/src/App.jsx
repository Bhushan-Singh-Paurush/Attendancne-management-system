import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./Components/common/Navbar"
import { Home } from "./pages/Home"
import {ToastContainer} from "react-toastify"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetail } from "./services/Operations/auth"
import { ChangePassword } from "./pages/Password/ChangePassword"
import { PrivateRoute } from "./Components/common/PrivateRoute"
import { Dashboard } from "./Components/core/Dashboard"
import { accountType } from "./utils/constent"
import { Course } from "./Components/core/Dashboard/Course/Course"
import { Semester } from "./Components/core/Dashboard/Semester"
import { Subjects } from "./Components/core/Dashboard/Subjects"
import { Student } from "./Components/core/Dashboard/Student"
import { Profile } from "./Components/core/Dashboard/Profile"
import { AttendanceSheet } from "./Components/core/Dashboard/AttendanceSheet"
import { Report } from "./Components/core/Dashboard/Report"
import { Slide} from 'react-toastify';
import { PageNotFound } from "./pages/PageNotFound"
import { Statistics } from "./Components/core/Dashboard/Statistics"




function App() {
  const dispatch=useDispatch()
  const{user}=useSelector((state)=>state.profile)
  
  useEffect(()=>{
         dispatch(getUserDetail())
  },[])

  return (
    <div className=" w-screen h-screen overflow-x-hidden font-nunito text-lightblack">
       <ToastContainer transition={Slide}  hideProgressBar={true} closeButton={false} position="top-center" autoClose={2000}/>
       <Navbar/>
       <Routes>
       <Route path="/" element={user ? <Navigate to="/dashboard-profile"/> : <Home/>}/>
       <Route path="/change-password/:token" element={<ChangePassword/>}/>
       <Route path="*" element={<PageNotFound/>}/>
       <Route element={<PrivateRoute>
        <Dashboard/>
       </PrivateRoute>}>
        {user?.accountType===accountType.ADMIN && <>
          <Route path="/dashboard-course" element={<Course/>}/>
          <Route path="/dashboard-semester" element={<Semester/>}/>
          <Route path="/dashboard-subject" element={<Subjects/>}/>
          <Route path="/dashboard-student" element={<Student/>}/>
        </>}

          <Route path="/dashboard-profile" element={<Profile/>}/>
        
        {
          user?.accountType===accountType.TEACHER && <>
            <Route path="/dashboard-attendance-sheet" element={<AttendanceSheet/>}/>
            <Route path="/dashboard-report" element={<Report/>}/>
            <Route path="/dashboard-statistics" element={<Statistics/>}/>
            
          </>
        }

       </Route>

       </Routes>
    </div>
  )
}

export default App
