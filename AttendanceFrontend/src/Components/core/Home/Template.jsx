import React, { useState } from 'react'
import { Loginform } from './Loginform'
import { ForgotPassword } from './ForgotPassword'
import { CreateAccount } from './CreateAccount'

export const Template = () => {
  const[step,setStep]=useState(1)
  return (
    <div className='w-[50%] rounded-xl overflow-hidden  border-[1px] border-gray-100'>
        {step===1 && <Loginform setStep={setStep}/>}
        {step===2 && <ForgotPassword setStep={setStep}/>}
        {step===3 && <CreateAccount setStep={setStep}/>}
    </div>
  )
}
