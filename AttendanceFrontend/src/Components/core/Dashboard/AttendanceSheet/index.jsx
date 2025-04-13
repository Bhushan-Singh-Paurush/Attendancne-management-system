import React, { useState } from "react";
import { Spinner } from "../../../common/Spinner";
import { CommonBtn } from "../../../common/CommonBtn";
import { toast } from "react-toastify";
import { Students } from "../../../../services/Operations/Students";
import { StudentSheet } from "./StudentSheet";
import { getSubjects } from "../../Hooks/getSubjects";

export const AttendanceSheet = () => {
  
  const[state,setState]=useState({subjectId:"",date:new Date().toISOString().split('T')[0]})
  const[semester,setSemester]=useState()
  const{subjects,loading}=getSubjects() 


 function changeHandler(event){
  const{name,value}=event.target
  setState(pre=>({...pre,[name]:value}))
 }

  const submitHandler=async(event)=>{
         event.preventDefault()
         if(!state.subjectId){
          toast.error("Please Select a Subject")
          return ;
         }
         const selectedSemester=subjects.filter(element=>element._id===state.subjectId)
         
         const result = await Students(selectedSemester?.[0].Semester,selectedSemester?.[0].section,state.date)
         
         if(result){
           setSemester(result)
         }
  }
  
  return (
    <div className=" my-10 w-11/12 flex flex-col gap-4 mx-auto ">
      <div className=" text-blue-300 text-2xl">Attendance</div>
      {loading ? (
        <Spinner />
      ) : subjects.length === 0 ? (
        <div>No Subject Found</div>
      ) : (
           <div className=" flex flex-col gap-10">
          <form onSubmit={submitHandler} className=" whiteBoxShadow bg-white p-2 flex gap-5 items-end">
            <label className=" p-2 border border-gray-200 rounded-md flex flex-col w-fit">
            <div className=" text-gray-200">Subject</div>
            <select value={state.subjectId} name="subjectId" onChange={changeHandler}>
            <option  value="" disabled>Please choose a Subject</option>
            {subjects?.map((sub,index)=>(
              <option value={sub._id}  key={index}>{sub.subjectName + " " + sub.subjectCode}</option>
            ))}
            </select>
            </label>
            <label className=" p-2 border border-gray-200 rounded-md flex flex-col w-fit">
            <div className=" text-gray-200">Date</div>
            <input type="date" value={state.date} name="date" onChange={changeHandler}/>
            </label>
            <CommonBtn text={loading ? "Loading..." : "Generate Sheet"} type="submit" disabled={loading}/>
          </form>

        {!semester ? <></> : semester?.students.length===0 ? <div>No Student Found</div> : <StudentSheet setSemester={setSemester} subjectId={state.subjectId} date={state.date} semester={semester}/>} 
          </div>
        
      )}
    </div>
  );
};
