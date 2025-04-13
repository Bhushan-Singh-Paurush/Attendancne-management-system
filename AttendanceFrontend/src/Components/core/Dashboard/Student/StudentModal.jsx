import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import { toast } from 'react-toastify';
import { RxCross2 } from "react-icons/rx";
import { AddStudent, editStudent } from '../../../../services/Operations/Students';
import { CommonBtn } from '../../../common/CommonBtn';
export const StudentModal = ({studentModal,isedit=null,semesterDetails,setSemesterDetails,setStudentModal,setIsedit}) => {
    const{register,setValue,getValues,handleSubmit,formState:{errors},reset}=useForm()
    
    useEffect(()=>{
          reset()
          if(isedit){ 
            setValue("studentName",studentModal.studentName)
            setValue("rollNumber",studentModal.rollNumber)
            setValue("section",studentModal.section)
          }
    },[studentModal])

    function checkChange(){
        const currentValue=getValues()
        if(currentValue.studentName!==studentModal.studentName ||
           currentValue.rollNumber!==studentModal.rollNumber   ||
           currentValue.section!==studentModal.section 
        )return true;
        else return false;
    }
    
    const submitHandler=async(data)=>{
             if(isedit){
                if(checkChange()){
                    const formdata=new FormData()
                    formdata.append("studentId",studentModal._id)
                    
                    if(data.studentName!==studentModal.studentName)
                       formdata.append("studentName",data.studentName);
                    
                    if(data.rollNumber!==studentModal.rollNumber)
                       formdata.append("rollNumber",data.rollNumber);
                    
                    if(data.section!==studentModal.section)
                       formdata.append("studentName",data.section);


                  const result=await editStudent(formdata)

                  if(result){
                       setSemesterDetails((pre)=>({...pre,students:pre.students.map(element=>element._id==studentModal._id ? result : element)}))
                       setStudentModal()
                    }
                }else{
                    toast.error("No change found")
                }
                return
             }
             const result=await AddStudent(data,semesterDetails._id)
             if(result){
               setSemesterDetails((pre)=>({...pre,students:[...pre.students,result]}))
               reset()
            }
    }
    
    return (
    <div className=' mx-auto mb-10 w-11/12'>
        
         <form className='w-fit flex flex-col gap-4' onSubmit={handleSubmit((data)=>submitHandler(data))}>
         <button className="w-full text-gray-200 flex justify-end" onClick={()=>{setStudentModal(),setIsedit()}}><RxCross2/></button>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Student Name</div>
                <input  className=' capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none' type='text' name="studentName" {...register("studentName",{required:true})}/>
                {errors.studentName && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Student Roll No.</div>
                <input  className=' capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none' type='number' name="rollNumber" {...register("rollNumber",{required:true})}/>
                {errors.rollNumber && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Section</div>
                <select
            className=" capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none"
            name="section"
            {...register("section", { required: true })}
          >
            <option value={"A"}>A</option>
            <option value={"B"}>B</option>
          </select>
                {errors.section && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
            <CommonBtn text={isedit ? "Update" : "Submit"} type="submit"/>
         </form>   
    </div>
  )
}
