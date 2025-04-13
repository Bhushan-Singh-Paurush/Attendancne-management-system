import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../slice/profile"
const rootReducer=combineReducers({
    profile:profileReducer
})
export default rootReducer