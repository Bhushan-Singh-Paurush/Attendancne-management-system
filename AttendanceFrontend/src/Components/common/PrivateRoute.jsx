import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({children}) => {
    const{user}=useSelector((state)=>state.profile)

    
    if(!user){
      return  <Navigate to="/"/>  
        
    }else{
        return children
    }
  
}
