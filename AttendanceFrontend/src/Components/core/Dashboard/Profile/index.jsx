import React, { useState } from 'react'
import { ProfileImage } from './ProfileImage'
import { ProfileInfo } from './ProfileInfo'
import { ChangePassword } from './ChangePassword'
import { DeleteAccount } from './DeleteAccount'

export const Profile = () => {
    const[loading,setLoading]=useState()
  return (
    <div className=' w-full'>
        <div className=' w-11/12 mx-auto my-10 flex gap-10 flex-col font-inter text-lightblack'>
            
            <ProfileImage loading={loading} setLoading={setLoading}/>
            <ProfileInfo loading={loading} setLoading={setLoading}/>
            <ChangePassword loading={loading} setLoading={setLoading}/>
            <DeleteAccount/>
        </div>
    </div>
  )
}
