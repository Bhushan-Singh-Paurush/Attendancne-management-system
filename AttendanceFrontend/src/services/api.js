const baseUrl = import.meta.env.VITE_BASE_URL

export const auth={
    LOGIN:baseUrl+"/auth/login",
    GET_USER_DETAILS:baseUrl+"/auth/getUserDetail",
    PASSWORD_LINK:baseUrl+"/resetpass/sendRestLink",
    CHANGE_PASSWORD:baseUrl+"/resetpass/resetPassword",
    SEND_OTP:baseUrl+"/auth/sendOTP",
    SIGNUP:baseUrl+"/auth/signup",
    EDIT_PROFILE:baseUrl+"/auth/editProfile",
    EDIT_PASSWORD:baseUrl+"/auth/changePassword",
    DELETE_ACCOUNT:baseUrl+"/auth/deleteUser",
    GET_ALL_TEACHERS:baseUrl+"/auth/allTeachers",
    LOGOUT:baseUrl+"/auth/logout"
}
export const courses={
    GET_ALL_COURSES:baseUrl+"/course/getAllCourses",
    CREATE_COURSE:baseUrl+"/course/createCourse",
    EDIT_COURSE:baseUrl+"/course/editCourse"
}
export const semester={
    GET_SEMESTERS:baseUrl+"/semester/getAllSemester",
    DELETE_SEMESTER:baseUrl+"/semester/deleteSemester",
    UPDATE_SEMESTER:baseUrl+"/semester/editSemester",
    CREATE_SEMESTER:baseUrl+"/semester/createSemester",
    SEMESTER_DETAILS:baseUrl+"/semester/semesterDetails"
}

export const subject={
    DELETE_SUBJECT:baseUrl+"/subject/deleteSubject",
    UPDATE_SUBJECT:baseUrl+"/subject/editSubject",
    CREATE_SUBJECT:baseUrl+"/subject/createSubject",
    GET_TEACHER_SUBJECT:baseUrl+"/subject/getAllSubjects"
}

export const student={
    DELETE_STUDENT:baseUrl+"/student/deleteStudent",
    UPDATE_STUDENT:baseUrl+"/student/updateStudent",
    CREATE_STUDENT:baseUrl+"/student/createStudent",
    GET_STUDENT:baseUrl+"/student/getStudents"
}

export const date={
    CREATE_DATE:baseUrl+"/date/createDate",
    GET_DATES:baseUrl+"/date/getDates" 
}