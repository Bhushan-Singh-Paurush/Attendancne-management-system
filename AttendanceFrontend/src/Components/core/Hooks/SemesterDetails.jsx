import React, { useEffect, useState } from 'react'
import { getAllCourses } from '../../../services/Operations/courseApi';
import { getSemesterDetail } from '../../../services/Operations/Semester';
import { toast } from 'react-toastify';

export const SemesterDetails = () => {
     const [loading, setLoading] = useState(true);
      const [courses, setCourses] = useState([]);
      const [semesterDetails, setSemesterDetails] = useState(); 
      useEffect(() => {
        (async () => {
          const result = await getAllCourses();
          if (result) {
            setCourses(result);
          }
          setLoading(false);
        })();
      }, []); 
       const submitHandler = async (data) => {
          setSemesterDetails();
          try {
            setLoading(true);
            const result = await getSemesterDetail(data);
            if (result) {
              setSemesterDetails(result);
            }else{
              toast.error("No semester found")
            }
          } catch (error) {
            console.log(error.message);
          }
          setLoading(false);
        };
    return {courses,semesterDetails,loading,submitHandler,setLoading,setSemesterDetails}
}
