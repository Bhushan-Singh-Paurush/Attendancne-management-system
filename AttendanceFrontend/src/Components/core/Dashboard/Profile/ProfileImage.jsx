import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CommonBtn } from '../../../common/CommonBtn'
import { toast } from 'react-toastify'
import { setUser } from '../../../../slice/profile'
import { editProfile} from '../../../../services/Operations/auth'

export const ProfileImage = ({loading,setLoading}) => {
    const{user}=useSelector((state)=>state.profile)
    const dispatch=useDispatch()
    const[file,setFile]=useState()
    function submitHandler(event){
         event.preventDefault()
        if(!file){
            toast.error("No Image Found")
            return ;
        }
        const formdata=new FormData()
        formdata.append("file",file)
        setLoading(true)
        dispatch(editProfile(formdata,setLoading)) 
    }
    
    return (
    <div className='w-full p-4 flex items-center gap-2 bg-white whiteBoxShadow'>
    <img src={file ? URL.createObjectURL(file) : user.image} className=' w-14 rounded-full'/>
    <div className=' flex flex-col gap-4 w-full'>
        <div>Change Profile Picture</div>
        <form  className=' flex items-center justify-between w-full' onSubmit={submitHandler}>
              <div className=' flex gap-3'>
              <label>
              <div className=' hover:cursor-pointer py-[2px] px-4 border border-blue-50 w-fit rounded-md text-blue-50'>Select</div>
              <input onChange={(event)=>setFile(event.target.files[0])} className=' hidden' type='file' accept='image/*'/>
              </label>
              <button className=' py-[2px] px-4 border border-blue-50 w-fit rounded-md text-blue-50' type='button' onClick={()=>setFile()}>Clear</button>
              </div>
        <CommonBtn type="submit" text={loading ? "Uploading..." : "Edit"} disabled={loading}/>
        </form>
    </div>
    </div>
  )
}
