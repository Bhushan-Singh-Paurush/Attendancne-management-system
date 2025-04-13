import React from 'react'
import { CommonBtn } from '../../Components/common/CommonBtn'
import { useNavigate } from 'react-router-dom'

export const ResetComplete = () => {
  const navigate=useNavigate()
    return (
    <div className=' flex flex-col gap-4'>
        <h1>Reset complete!</h1>
        <p className=' text-xs text-lightblack'>All done! We have sent an email to m***********@gmail.com to confirm</p>
        <CommonBtn text="Return to login" onclick={()=>navigate("/")}/> 
    </div>
  )
}
