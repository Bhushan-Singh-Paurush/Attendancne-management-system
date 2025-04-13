import React from 'react'
import { CommonBtn } from '../../Components/common/CommonBtn'
import { FaCheckCircle } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { changepassword } from '../../services/Operations/auth'
import { toast } from 'react-toastify'

export const ChooseNewPass = ({setStep}) => {
    const{token}=useParams()
    const navigate=useNavigate()
    const{register,
        formState:{errors},
        handleSubmit
         }=useForm()
         const strongPassword=[
            "one lowercase character",
            "one special character",
            "one uppercase character",
            "8 character minimum",
            "one number"
        ]
    const  submitHandler=async(data)=>{
         if(data.password!==data.confirmPassword)
         {
            toast.error("Password and Confirm Password mismatched")
            return ;
         }
         const password=data.password
         const result=await changepassword(password,token)
         if(result){
            setStep(2)
         }
    } 
    return (
    <form className=' flex flex-col gap-4' onSubmit={handleSubmit((data)=>submitHandler(data))}>
       <h1>Choose  new password</h1>
       <p className=' text-xs text-lightblack'>Almost done. Enter your new password and your all set.</p>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Password</div>
                <input className=' text-lightblack border-2 border-gray-100 focus-within:outline-none' type='password' name="password" {...register("password",{required:true})}/>
                {errors.password && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
        <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Confirm Password</div>
                <input className=' text-lightblack border-2 border-gray-100 focus-within:outline-none' type='password' name="confirmPassword" {...register("confirmPassword",{required:true})}/>
                {errors.confirmPassword && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
            <div className=' w-full flex gap-2 flex-wrap'>{strongPassword.map((item,index)=>(
                <div key={index} className='flex gap-2 text-green-600 text-xs'><span><FaCheckCircle /></span>{item}</div>
               ))}</div>
               <CommonBtn text="Reset Password" type="submit"/>
               <button onClick={()=>navigate("/")} className=' text-gray-200 text-xs w-fit'>Back to Login ?</button>
            </form>
  )
}
