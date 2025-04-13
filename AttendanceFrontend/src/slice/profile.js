import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null,
    userLoading:false,
    signupData:null
}
const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        deleteUser:(state)=>{
            state.user=null
        },
        setUserLoading:(state,action)=>{
            state.userLoading=action.payload
        },
        setData:(state,action)=>{
            state.signupData=action.payload
        }
    }
})
export const{setUser,deleteUser,setUserLoading,setData}=profileSlice.actions
export default profileSlice.reducer