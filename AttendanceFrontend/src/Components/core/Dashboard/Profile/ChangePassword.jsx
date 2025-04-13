import React, { useState } from 'react'
import { CommonBtn } from '../../../common/CommonBtn'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { editPassword } from '../../../../services/Operations/auth'

export const ChangePassword = ({loading,setLoading}) => {
  const[state,setState]=useState({password:"",confirmPassword:""})  

  function changeHandler(event){
    const{name,value}=event.target
    setState((pre)=>({...pre,[name]:value}))
  }

  function submitHandler(event){
    event.preventDefault()

        if(state.password===state.confirmPassword)
            {
                editPassword(state.password,setLoading)
            }else{
                toast.error("Password and Confirm Password Mismatched")
                return ;
            }
    
  }
  return (
    <div className="w-full p-4 flex flex-col  gap-1 bg-white whiteBoxShadow">
    <div>Change Password</div>
    <form className=" flex justify-between items-center" onSubmit={submitHandler}>
           
              <label className=" flex flex-col gap-1 w-fit ">
                <div className=" text-gray-200">Password</div>
                <input
                minLength="5"
                required
                  type="password"
                  name="password"
                  value={state.password}
                  className=" border border-gray-200 rounded-md pl-2"
                  onChange={changeHandler}
                />
              </label>
              <label className=" flex flex-col gap-1 w-fit">
                <div className=" text-gray-200">Confirm Password</div>
                <input
                  type="password"
                  minLength="5"
                  required
                  name="confirmPassword"
                  value={state.confirmPassword}
                  className=" border border-gray-200 rounded-md pl-2"
                  onChange={changeHandler}
                />
              </label>
            
    
            <CommonBtn
              text={loading ? "Uploading..." : "Edit"}
              disabled={loading}
              type="submit"
            />
          </form>
    </div>
  )
}
