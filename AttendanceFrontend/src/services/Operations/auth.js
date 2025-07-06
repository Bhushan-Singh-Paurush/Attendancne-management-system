import { toast } from "react-toastify"
import { deleteUser, setUser, setUserLoading} from "../../slice/profile"
import { auth } from "../api"
import { apiConnection } from "../apiConnector"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setToken } from "../../slice/authSlice"

export function signIn(data){
    return async(dispatch)=>{
        try {
            dispatch(setUserLoading(true))

            const response = await apiConnection("POST",auth.LOGIN,data)
            
            if(!response){
                throw new Error("Failed to login");
            }
            
            const user=response.data.user
            if(!user?.image)
            {
                user.image=`https://ui-avatars.com/api/?background=random&name=${user?.firstName}+${user?.lastName}`
            }
            dispatch(setUser(user))
            dispatch(setUserLoading(false))
            toast.success(response.data.message)
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        dispatch(setUserLoading(false))
    }
}
export function getUserDetail(){
    return async(dispatch)=>{
        try {
           
            
            const response = await apiConnection("GET",auth.REFRESH)
               
            if(!response){
                throw new Error("Failed to login");
            }
            
            const user=response.data.user
            if(!user?.image)
            {
                user.image=`https://ui-avatars.com/api/?background=random&name=${user?.firstName}+${user?.lastName}`
            }
            dispatch(setUser(user))
            dispatch(setToken(response.data.accessToken))
            
            
            
        } catch (error) {
         toast.error(error.response.data.message)
        }
       
    }
}
export async function resetPasswordLink(email) {
    try {
        const response=await apiConnection("PATCH",auth.PASSWORD_LINK,{email})

        if(!response){
            throw new Error("Failed to send reset password link");
        }
        toast.success(response.data.message)
        return response.data.success
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export async function changepassword(password,token,accessToken) {
    try {
        const response=await apiConnection("PATCH",auth.CHANGE_PASSWORD,{password,token},{
            Authorization:`Bearer ${accessToken}`
        })

        if(!response){
            throw new Error("Failed to change the password");
        }

        toast.success(response.data.message)
        return response.data.success
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export async function sendOTP(email) {
         try {
            const response=await apiConnection("POST",auth.SEND_OTP,{email})

            if(!response){
                throw new Error("Failed to send otp");
            }
            toast.success(response.data.message)
            return response.data.success
         } catch (error) {
            toast.error(error.response.data.message)
         }    
}
export async function signup(signupData,otp) {
         try {
            const response=await apiConnection("POST",auth.SIGNUP,{...signupData,otp})

            if(!response){
                throw new Error("Failed to send otp");
            }
            toast.success(response.data.message)
            return response.data.success
         } catch (error) {
            toast.error(error.response.data.message)
         }    
}
export  function editProfile(formdata,setLoading,accessToken) {
    return async(dispatch)=>{
        try {
            setLoading(true)
            const response=await apiConnection("PATCH",auth.EDIT_PROFILE,formdata,{
                Authorization:`Bearer ${accessToken}`
            })
    
            if(!response){
                throw new Error("Failed to Edit Profile");
            }
    
            toast.success(response.data.message)
    
            const user=response.data.updateUser
            if(!user?.image)
            {
                user.image=`https://ui-avatars.com/api/?background=random&name=${user?.firstName}+${user?.lastName}`
            }
            dispatch(setUser(user))
            
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        setLoading(false)
    }
    
}

export async function editPassword(password,setLoading,accessToken){
        try {
            setLoading(true)
            const response=await apiConnection("PATCH",auth.EDIT_PASSWORD,{password},
                {
                    Authorization:`Bearer ${accessToken}`
                }
            )

            if(!response){
                throw new Error("Failed to Edit Password");
            }

            toast.success(response.data.message)
            

        } catch (error) {
            toast.error(error)
            
        }
    setLoading(false)
}


export async function removeUser(accessToken) {
    
    try {
        const response=await apiConnection("DELETE",auth.DELETE_ACCOUNT,{},{
            Authorization:`Bearer ${accessToken}`
        })
        
        if(!response){
            throw new Error("Failed to delete the account");
        }
        
        toast.success(response.data.message)
        return response.data.success    

    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export async function getTeachers() {
    try {
        const response=await apiConnection("GET",auth.GET_ALL_TEACHERS)

        if(!response){
            throw new Error("Failed to get Teachers");
        }

        return response.data.teachers
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export  function userLogout(navigate) {
    return async(dispatch)=>{
        try {
            const response=await apiConnection("GET",auth.LOGOUT)

            if(!response){
                throw new Error("Failed to logout");
            }
            navigate("/")
            toast.success(response.data.message)
            dispatch(deleteUser())
           

        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    }
}