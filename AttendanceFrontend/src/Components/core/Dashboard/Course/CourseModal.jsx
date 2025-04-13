import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { AddBranches } from './AddBranches'
import { CommonBtn } from '../../../common/CommonBtn'
import { createCourse, editCourse } from '../../../../services/Operations/courseApi'
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify'

export const CourseModal = ({modal=null,setCourses,courses,setShowCourseModal}) => {
   
    const{register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors}}=useForm()
        
        const[loading,setLoading]=useState(false)
        
        function isEdit(){
            const currentValue=getValues()
            if(currentValue.courseName !==modal.courseName ||
               currentValue.courseDesp !==modal.courseDesp ||
               currentValue.years !==modal.years           ||
               currentValue.branches!==modal.branches 
            )
            return true;
            else
            return false;
        }

        const  submitHandler=async(data)=> {
            
            if(modal)
            {
                if(isEdit()){
                  const formdata=new FormData()
                  formdata.append("courseId",modal._id)
                  if(data.courseName !==modal.courseName)
                    formdata.append("courseName",data.courseName);
                  
                  if(data.courseDesp !==modal.courseDesp)
                    formdata.append("courseDesp",data.courseDesp);
                  
                  if(data.years !==modal.years)
                    formdata.append("years",data.years);
                  
                  if(data.branches !==modal.branches)
                    formdata.append("branches",data.branches);
                setLoading(true)
                const result=await editCourse(formdata)
                
                if(result){   
                    setCourses(courses.map((course=>course._id===result._id ? result : course)))
                    setShowCourseModal(false)
                }
                setLoading(false)
                  return ;
                  
                }else{
                    toast.error("Nothing is change")
                    setLoading(false)
                    return ;
                }
                
            }
            const result=await createCourse(data)
            if(result)
            {
                setCourses([...courses,result]);
                setShowCourseModal(false)
            }
                
            setLoading(false)
        }
        useEffect(()=>{
            if(modal){
                setValue("courseName",modal.courseName)
                setValue("courseDesp",modal.courseDesp)
                setValue("years",modal.years)
                setValue("branches",modal.branches)
            }
        },[modal])
    return (
    <div className=' bg-blue-5 w-[80%] p-5'>
    <div onClick={()=>setShowCourseModal(false)} className='flex justify-end text-gray-200 hover:cursor-pointer'><RxCross2/></div>
        <form className=' flex flex-col gap-4' onSubmit={handleSubmit((data)=>submitHandler(data))}>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Course Title</div>
                <input  className=' capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none' type='text' name="courseName" {...register("courseName",{required:true})}/>
                {errors.courseName && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Course Description</div>
                <textarea rows={3} className=' text-lightblack border-2 border-gray-100 focus-within:outline-none'  name="courseDesp" {...register("courseDesp",{required:true})}/>
                {errors.courseDesp && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Course Years</div>
                <input className=' text-lightblack border-2 border-gray-100 focus-within:outline-none' type='number' name="years" {...register("years",{required:true})}/>
                {errors.years && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
            <AddBranches modal={modal} setValue={setValue} register={register}/>
            <CommonBtn disabled={loading} text={loading ? "Loading..." : modal ? "Update" : "Submit"} />
        </form>
    </div>
  )
}
