import React, { useEffect, useState } from 'react'
import { Spinner } from '../../../common/Spinner';
import { getAllCourses } from '../../../../services/Operations/courseApi';
import { CommonBtn } from '../../../common/CommonBtn';
import { SelectCourse } from './SelectCourse';
import { SelectBranch } from './SelectBranch';
import { GetSemData } from './GetSemData';

export const Semester = () => {
   const[loading,setLoading]=useState(true)
   const[courses,setCourses]=useState([]) 
   const[course,setCourse]=useState()
   const[branch,setBranch]=useState()
   const[step,setStep]=useState(1)

   
   useEffect(() => {
        ;(async () => {
          const result = await getAllCourses();
          if (result) setCourses(result);
          setLoading(false);
        })();
      }, []);

      function nextHandler(){
        if(course===null)
            return;
        else if(branch){
            setStep(3)
        }
        else if(course?.branches==="")
        {
            setStep(3)
        }
        else
        {
            setStep(2)
        }
      }
  
      function backHandler() {
        
        if(course?.branches && step!==2){
            setStep(2)
        }else{
          setStep(1)
        }
      }
      
  return (
    <div className="w-full h-full flex items-center justify-center">
    <div className="flex flex-col gap-4 justify-between w-[80%] min-h-[80%] bg-white p-10 whiteBoxShadow">
    {loading ? <Spinner/> : courses.length===0 && <div>No data Found</div>} 
    
     {step===1 && <SelectCourse courses={courses} setCourse={setCourse}/>}
     {step===2 && <SelectBranch course={course} setBranch={setBranch}/>}
     {step===3 && <GetSemData course={course} branch={branch}/>}
    
    <div className=' flex items-center gap-4'>
    {!(step===1) && <CommonBtn text={loading ? "Loading..." : "Back"} onclick={backHandler}/> }
    {!(step===3) && <CommonBtn text={loading ? "Loading..." : "Next"} onclick={nextHandler}/> }
    </div>
    
    </div>
     
    </div>
  )
}
