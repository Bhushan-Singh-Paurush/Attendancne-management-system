import axios from "axios";
import { setToken } from "../slice/authSlice";
import { setUser } from "../slice/profile";
import { auth } from "./api";
import { store } from "../main";

const axiosInstance = axios.create({
    withCredentials:true
})

export const apiConnection=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
           method:`${method}`,
           url:`${url}`,
           data:bodyData ? bodyData : null,
           headers:headers ? headers : null,
           params:params ? params : null
    })
}

axiosInstance.interceptors.response.use((res)=>res, async (err)=>{
    const originalRequest=err.config
    if(err.response?.status===403 && 
        !originalRequest?._retry && 
        !originalRequest.url.includes("/auth/refresh")){
        
        originalRequest._retry=true

        try {
            
            const response=await apiConnection("GET",auth.REFRESH)
        
            store.dispatch(setToken(response.data.accessToken))
            
             const user=response.data.user
            if(!user?.image)
            {
                user.image=`https://ui-avatars.com/api/?background=random&name=${user?.firstName}+${user?.lastName}`
            }

            store.dispatch(setUser(user))

            originalRequest.headers.Authorization=`Bearer ${response.data.accessToken}`

            return axiosInstance(originalRequest)
        
        
        } catch (error) {
            console.log('refresh failed');         
        }

    }
})