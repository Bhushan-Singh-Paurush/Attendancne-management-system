import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { DeleteModal } from '../../../common/DeleteModal';
import { removeUser } from '../../../../services/Operations/auth';
export const DeleteAccount = () => {
   const[modal,setModal]=useState()
   const deleteHandler=async()=>{
        await removeUser()
        setModal()
   }
    return (
    <div className="w-full p-4 flex  items-center  gap-4 bg-pink-800 rounded-sm">
       <div className='w-12 aspect-square rounded-full bg-pink-700 text-pink-400 text-2xl flex items-center justify-center'><MdDeleteOutline/></div>
    <div className=' flex flex-col gap-1  text-gray-300 text-sm'>
        <div>Delete Account</div>
        <div className=' text-xs'>
            <p>Would you like to delete account ?</p>
            <p>This account contains Subject Information. Deleting your account will remove all the contain associated with it.</p>
        </div>
        <button onClick={()=>setModal({
            heading:"Delete Account ?",
            subheading:"Are you sure you want to delete the account",
            btn1Text:"Cancel",
            btn2Text:"Delete",
            btn1Handler:()=>setModal(),
            btn2Handler:deleteHandler

        })} className=' w-fit italic text-pink-400 text-xs'>I want to delete my account.</button>
    </div>
   {modal && <DeleteModal {...modal}/>}
    </div>
  )
}
