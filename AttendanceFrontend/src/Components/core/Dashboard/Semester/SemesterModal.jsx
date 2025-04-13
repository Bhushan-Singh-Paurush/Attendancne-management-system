import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { CommonBtn } from '../../../common/CommonBtn'
import { RxCross2 } from "react-icons/rx";
import {toast} from "react-toastify"
import { CreateSemester, updateSemester } from '../../../../services/Operations/Semester';

export const SemesterModal = ({isedit=null,setIsEdit,showSemModal,setShowSemModal,setSemesters,semesters}) => {

   
    const[loading,setLoading]=useState(false)
    const{register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors}}=useForm()
        
        useEffect(()=>{
           setValue("courseId",showSemModal.course._id)
           if(isedit){
            setValue("year",showSemModal.year)
            setValue("semNo",showSemModal.semNo)
           }
        },[showSemModal])

        function checkChange(){
            const currentValue=getValues()

            if(currentValue.year!==showSemModal.year || currentValue.semNo!==showSemModal.semNo){
                return true
            }else{
                return false
            }
        }
       const submitHandler=async(data)=>{
               if(isedit)
               {
                   if(checkChange())
                   {
                       const formdata=new FormData()
                       formdata.append("semesterId",showSemModal._id)
                       
                       if(data.year!==showSemModal.year)
                       formdata.append("year",data.year);
                    
                       if(data.semNo!==showSemModal.semNo)
                        formdata.append("semNo",data.semNo); 
                       
                       setLoading(true)
                       const result=await updateSemester(formdata)
                       if(result){
                        
                        setSemesters(semesters.map(element=>element._id===result._id ? result : element))   
                    }
                    
                    setLoading(false)
                     setIsEdit(false)
                    setShowSemModal(null) 

                   }else{
                    toast.error("No change found")
                   }
                   return ;
               }
               setLoading(true)
               const result=await CreateSemester({...data,courseId:showSemModal.courseId})
               if(result){
                
                setSemesters([...semesters,result])
               }
               setLoading(false)
               setShowSemModal(false)
       }

        
    return (
    <div className=' bg-blue-5 w-[50%] p-5'>
         <form className=' flex flex-col gap-4' onSubmit={handleSubmit((data)=>submitHandler(data))}>
         <div className=' w-full flex justify-end hover:cursor-pointer' onClick={()=>{setShowSemModal(null),setIsEdit(false)}}><RxCross2/></div>
         <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Course</div>
                <input disabled  className=' capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none' value={showSemModal.course.courseName} {...register("courseName",{required:true})}/>
            </label>
        {showSemModal?.branch && <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Branch</div>
                <input disabled  className=' capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none' value={showSemModal.branch} type='text' name="branch" {...register("branch",{required:true})}/>
            </label>}
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Year</div>
                <input  className=' capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none' type='text' name="year" {...register("year",{required:true})}/>
                {errors.year && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Semester No</div>
                <input  className=' capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none' type='text' name="semNo" {...register("semNo",{required:true})}/>
                {errors.semNo && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
            <CommonBtn type="submit" text={loading ? "Loading..." : "Submit"} disabled={loading}/>
        </form>    
    </div>
  )
}
