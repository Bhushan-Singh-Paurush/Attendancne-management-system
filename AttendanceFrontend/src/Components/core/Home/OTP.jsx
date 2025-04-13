import React, { useState } from 'react'
import OtpInput from "react-otp-input" 
import { CommonBtn } from '../../common/CommonBtn'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLoading } from '../../../slice/profile'
import { useNavigate } from 'react-router-dom'
import { sendOTP, signup } from '../../../services/Operations/auth'
export const OTP = ({setStep}) => {
    const[otp,setOtp]=useState() 
    const{userLoading,signupData}=useSelector((state)=>state.profile) 
    const dispatch=useDispatch()
    const resendHandler=async()=>{
         dispatch(setUserLoading(true))
         await sendOTP(signupData.email)
         dispatch(setUserLoading(false))
    }
    const createAccount=async()=>{
        dispatch(setUserLoading(true))
        const result = await signup(signupData,otp)
        if(result){
            dispatch(setUserLoading(false))      
            setStep(1)
        }
        dispatch(setUserLoading(false))
    }
    return (
    <div className=' flex flex-col gap-5'>
    <h1>Verify email</h1>
    <p className=' text-xs text-lightblack'>A verification code has been sent to you. Enter the code below</p>
        <OtpInput onChange={setOtp}
            value={otp}
            numInputs={5}
            renderSeparator={<span> </span>}
      renderInput={(props) => <input {...props} className=' border-[1px] border-lightblack  text-lightblack rounded-sm text-xl ml-4' />}
        />
        <div className=' w-full flex items-center justify-between'>
            <CommonBtn onclick={createAccount} disabled={userLoading} text={userLoading ? "Loading..." : "Verify email"}/>
            <button disabled={userLoading} onClick={resendHandler} className=' text-gray-200 text-xs w-fit'>Resend OTP ?</button>
        </div>
    </div>
  )
}
