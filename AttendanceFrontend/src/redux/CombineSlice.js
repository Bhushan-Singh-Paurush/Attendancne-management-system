import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../slice/profile"
import authReducer from "../slice/authSlice"
const rootReducer=combineReducers({
    profile:profileReducer,
    auth:authReducer
})
export default rootReducer