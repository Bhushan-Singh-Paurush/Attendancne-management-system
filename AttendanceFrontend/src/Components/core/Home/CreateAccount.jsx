import React, { useState } from 'react'
import { Signupdata } from './Signupdata'
import { OTP } from './OTP'
export const CreateAccount = ({setStep}) => {
   const[internalStep,setInternalStep]=useState(1)

    return (
    <div className=' p-8 bg-white flex flex-col gap-2'>
        { internalStep===1 &&<Signupdata setInternalStep={setInternalStep}/>}
        { internalStep===2 && <OTP setStep={setStep}/>}
        <button onClick={()=>setStep(1)} className=' text-gray-200 text-xs w-fit'>Back to Login ?</button>
    </div>
  )
}
