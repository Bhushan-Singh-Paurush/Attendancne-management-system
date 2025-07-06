import { toast } from "react-toastify";
import { courses } from "../api";
import { apiConnection } from "../apiConnector";

export async function getAllCourses() {
    try {
        const response=await apiConnection("GET",courses.GET_ALL_COURSES)
        if(!response){
            throw new Error("Failed to get courses");
        }

        return response.data.courses
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export async function createCourse(data,accessToken){
    try {
        const response=await apiConnection("POST",courses.CREATE_COURSE,data,{
            Authorization:`Bearer ${accessToken}`
        })
        if(!response){
            throw new Error("Failed to create course");
        }
        toast.success(response.data.message)
        return response.data.course
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export async function editCourse(formdata,accessToken) {
    try {
        const response=await apiConnection("PUT",courses.EDIT_COURSE,formdata,{
            Authorization:`Bearer ${accessToken}`
        })
        if(!response){
            throw new Error("Failed to edit the course");
        }
        toast.success(response.data.message)
        return response.data.updatedCourse
    } catch (error) {
        toast.error(error.message)
    }
    
}