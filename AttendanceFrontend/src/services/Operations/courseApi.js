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
export async function createCourse(data){
    try {
        const response=await apiConnection("POST",courses.CREATE_COURSE,data)
        if(!response){
            throw new Error("Failed to create course");
        }
        toast.success(response.data.message)
        return response.data.course
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export async function editCourse(formdata) {
    try {
        const response=await apiConnection("PUT",courses.EDIT_COURSE,formdata)
        if(!response){
            throw new Error("Failed to edit course");
        }
        toast.success(response.data.message)
        return response.data.updatedCourse
    } catch (error) {
        toast.error(error.response.data.message)
    }
    
}