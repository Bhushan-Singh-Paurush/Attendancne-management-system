import { toast } from "react-toastify";
import { subject } from "../api";
import { apiConnection } from "../apiConnector";


export async function removeSubject(semesterId,subjectId,userId) {
    try {
        const response=await apiConnection("DELETE",subject.DELETE_SUBJECT,{semesterId,subjectId,userId})
        
        if(!response){
            throw new Error("Failed to Delete the subject");
        }
        
        toast.success(response.data.message)
        return response.data.success
    } catch (error) {
        toast.error(error.response.data.message)
    }
    
}

export async function updateSubject(formdata) {
    try {
        const response=await apiConnection("PATCH",subject.UPDATE_SUBJECT,formdata)

        if(!response){
            throw new Error("Failed to update the subject");
        }

        toast.success(response.data.message)

        return response.data.updatedSubject
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export async function createNewSubject(data,Semester) {
    try {
        const response=await apiConnection("POST",subject.CREATE_SUBJECT,{...data,Semester})

        if(!response){
            throw new Error("Failed to create subject");
        }

        toast.success(response.data.message)
        return response.data.subjectData
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export async function  teacherSubjects(id) {
    try {
        
        const response=await apiConnection("GET",subject.GET_TEACHER_SUBJECT,null,null,{id})

        if(!response){
            throw new Error("Failed to get Teacher's Subject");
        } 

        toast.success(response.data.message)

        return response.data.subjects

    } catch (error) {
        toast.error(error.response.data.message)
    }
    
}