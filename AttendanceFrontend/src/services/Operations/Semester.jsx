import { toast } from "react-toastify";
import { semester } from "../api";
import { apiConnection } from "../apiConnector";

export async function getSemesters(courseId,branch) {

    try {
        const response=await apiConnection("GET",semester.GET_SEMESTERS,null,null,{courseId,branch})

        if(!response){
            throw new Error("Failed to get semesters details");
        }

        toast.success(response.data.message)
        return response.data.semesters
    } catch (error) {
        toast.error(error.response.data.message)  
    } 
}
export async function deleteSem(semesterId) {
    try {
        const response=await apiConnection("DELETE",semester.DELETE_SEMESTER,{semesterId})

        if(!response){
            throw new Error("Failed to Delte the Semester");
        }

        toast.success(response.data.message)
        return response.data.success

    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export async function updateSemester(formdata) {
    try {
        const response=await apiConnection("PATCH",semester.UPDATE_SEMESTER,formdata)

        if(!response){
            throw new Error("Failed to update the Semester");
        }

        toast.success(response.data.message)
        return response.data.updatedSemester
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export async function CreateSemester(data) {
    try {
        const response=await apiConnection("POST",semester.CREATE_SEMESTER,data)

        if(!response){
            throw new Error("Failed to create semester");
        }
         toast.success(response.data.message)
         return response.data.updatedSem
    } catch (error) {
       toast.error(error.response.data.message);
       console.log(error);
       
       
    }
}
export async function getSemesterDetail(data) {

    try {
        const response=await apiConnection("POST",semester.SEMESTER_DETAILS,data)

        if(!response){
            throw new Error("Failed to get semester details");
        }

        
        return response.data.semesterDetails
    } catch (error) {
        toast.error(error.response.data.message)  
    } 
}