import React from 'react'
import { CommonBtn } from '../../common/CommonBtn'

export const CheckEmail = ({setInternalSteps}) => {
  return (
    <div className='flex flex-col gap-4'>
            <h1 >Check email</h1>
        <p className=' text-lightblack text-xs'>We have sent the reset password link to your email account</p>
        <CommonBtn text="Reset Email" onclick={()=>setInternalSteps(1)}/>
    </div>    
  )
}
