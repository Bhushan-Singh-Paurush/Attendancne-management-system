import { toast } from "react-toastify";
import { student } from "../api";
import { apiConnection } from "../apiConnector";

export async function deleteStudent(studentId) {
    try {
        const response=await apiConnection("DELETE",student.DELETE_STUDENT,{studentId})

        if(!response){
            throw new Error("Failed to delete the student");
        }
        toast.success(response.data.message)
        return response.data.success
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export async function editStudent(formdata) {
    try {
        const response=await apiConnection("PATCH",student.UPDATE_STUDENT,formdata)

        if(!response){
            throw new Error("Failed to update the student");
        }

        toast.success(response.data.message)
        return response.data.updatedStudent

    } catch (error) {
        toast.error(error.response.data.message)
    }
}
export async function AddStudent(data,semesterId) {
    try {
        const response=await apiConnection("POST",student.CREATE_STUDENT,{...data,semesterId})

        if(!response){
            throw new Error("Failed to create the Student");
        }

        toast.success(response.data.message)
        return response.data.newStudent
    } catch (error) {
     toast.error(error.response.data.message)
       
    }
    
}

export async function Students(semesterId,section,date) {
    try {
     
       
        const response=await apiConnection("GET",student.GET_STUDENT,null,null,{semesterId,section,date})
         if(!response){
            throw new Error("Failed to get Student");
         }

         toast.success(response.data.message)
         return response.data.semester
         
    } catch (error) {
        toast.error(error.response.data.message)
    }
    
}
