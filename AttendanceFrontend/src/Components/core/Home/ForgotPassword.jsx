import React, { useState } from 'react'
import { ResetPassword } from './ResetPassword'
import { CheckEmail } from './CheckEmail'


export const ForgotPassword = ({setStep}) => {
  const[internalSteps,setInternalSteps]=useState(1)
  return (
    <div className=' p-8 bg-white flex flex-col gap-4'>
        {internalSteps===1 &&  <ResetPassword setInternalSteps={setInternalSteps}/>}        
        {internalSteps===2 && <CheckEmail setInternalSteps={setInternalSteps}/>}
        <button onClick={()=>setStep(1)} className=' text-gray-200 text-xs w-fit'>Back to Login ?</button>
    </div>
  )
}
