import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dashBoardLinks from "../../../data/dashboardLinks"
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom'
import * as Icon from "react-icons/fi";
import {FiLogOut} from "react-icons/fi"
import { userLogout } from '../../../services/Operations/auth'
export const Sidebar = () => {
    const{user}=useSelector((state)=>state.profile)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const location=useLocation()
    
    function matchRoute(path){
        return matchPath(path,location.pathname)
    } 

    function logoutHandler(){
        dispatch(userLogout(navigate))

    }
   
    return (
    <div className=' w-[20%] bg-white flex flex-col gap-4 relative z-10  shadow-md'>
            {dashBoardLinks.map((item,index)=>{
                
                if(item.accountType===user.accountType || item.allowedAccountType?.includes(user.accountType))
                {
                    let IconComponent=Icon[item.icon]
                    return <NavLink className={`${matchRoute(item.path) ? " bg-gray-100 text-blue-300" : " text-blue-500"} pl-4 py-1 font-semibold flex items-center gap-2`} key={index} to={`${item.path}`}>
                    <IconComponent className=" text-blue-500 text-lg"/>
                    
                    <div>{item.title}</div>
                    </NavLink>
                }
                
            }) }
            <button className=" w-fit pl-4 text-blue-500 font-semibold flex items-center gap-2" onClick={logoutHandler}><FiLogOut className=" text-blue-500 text-lg"/>Logout</button>
    </div>
  )
}
