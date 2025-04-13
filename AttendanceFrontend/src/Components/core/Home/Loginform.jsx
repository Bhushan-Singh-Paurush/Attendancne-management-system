import React from 'react'
import {useForm} from "react-hook-form"
import { CommonBtn } from '../../common/CommonBtn'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../../services/Operations/auth'
export const Loginform = ({setStep}) => {
    const{
        register,
        formState:{errors},
        handleSubmit,
    }=useForm()
    const dispatch=useDispatch()
    const{userLoading}=useSelector((state)=>state.profile)
    function submitHandler(data){
        dispatch(signIn(data))
    }
    return (
    <div className=' p-8 bg-white flex flex-col gap-4'>
        <form className=' flex flex-col gap-4' onSubmit={handleSubmit((data)=>submitHandler(data))}>
            <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Email</div>
                <input className=' text-lightblack border-2 border-gray-100 focus-within:outline-none' type='email' name="email" {...register("email",{required:true})}/>
                {errors.email && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
            <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Password</div>
                <input className='text-lightblack border-2 border-gray-100 focus-within:outline-none' type='password' name="password" {...register("password",{required:true})}/>
                {errors.password && <span className=' text-lightblack text-xs'>Fill this field</span>}
            </label>
            <CommonBtn disabled={userLoading} text={userLoading ? "Loading..." : "Sign Up"} type="submit"/>
        </form>
      <button onClick={()=>setStep(2)} className=' text-gray-200 text-xs w-fit'>Forgot Password ?</button>
      <div className=' flex items-center gap-2 text-lightblack text-xs'>Don't have an account?<button onClick={()=>setStep(3)} className=' text-blue-25'>Register here</button></div>
    </div>
  )
}
