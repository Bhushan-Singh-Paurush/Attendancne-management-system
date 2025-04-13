import React, { useState } from 'react'
import { ChooseNewPass } from './ChooseNewPass';
import { ResetComplete } from './ResetComplete';
export const ChangePassword = () => {
     const[step,setStep]=useState(1)  
    return (
    <>
<div className=' w-full h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center'>
<div className=' p-8 bg-white flex flex-col gap-4 w-11/12 max-w-[400px]'>
{step===1 && <ChooseNewPass setStep={setStep}/>}  
{step===2 && <ResetComplete/>}      
</div>
</div>
    </>
    
  )
}
