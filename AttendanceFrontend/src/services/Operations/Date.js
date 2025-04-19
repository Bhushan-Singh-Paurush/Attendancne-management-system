import { toast } from "react-toastify";
import { date } from "../api";
import { apiConnection } from "../apiConnector";

export async function makeAttendance(data) {
    try {
        const response=await apiConnection("POST",date.CREATE_DATE,data)

        if(!response){
            throw new Error("Failed to create the date");
        }

        toast.success(response.data.message)
        return response.data.success
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export async function getReport(semesterId,section,subjectId,input) {
    try {
        const response=await apiConnection("GET",date.GET_DATES,null,null,{semesterId,section,subjectId,input})
    
        if(!response){
            throw new Error("Failed to get dates");
        }

        return response.data.semester
    
    } catch (error) {
        toast.error(error.response.data.message)
    }
    
}

export async function getStatisticsData(data) {
    try {
        const response=await apiConnection("GET",date.GET_SEMESTER_DATES,null,null,data)

        if(!response){
            throw new Error("Failed to get semester date");
        }
        toast.success(response.data.message)
        return response.data.summery

    } catch (error) {
        toast.error(error.response.data.message)
    }
    
}