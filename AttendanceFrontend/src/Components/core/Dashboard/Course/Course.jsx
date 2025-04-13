import React, { useEffect, useState } from "react";
import { Spinner } from "../../../common/Spinner";
import { getAllCourses } from "../../../../services/Operations/courseApi";
import { FaPencil } from "react-icons/fa6";
import { CommonBtn } from "../../../common/CommonBtn";
import { CourseModal } from "./CourseModal";
export const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const[modal,setModal]=useState()
  const[showCourseModal,setShowCourseModal]=useState(false)
  useEffect(() => {
    (async () => {
      const result = await getAllCourses();
      if (result) setCourses(result);
      setLoading(false);
    })();
  }, []);
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      {loading ? (
        <Spinner />
      ) : courses.length === 0 ? (
        <div>No data Found</div>
      ) : (
        <div className="flex flex-col gap-5 w-[80%] min-h-[80%] bg-white p-10 whiteBoxShadow">
        <div className=" flex gap-4 items-center flex-wrap">{courses.map((item,index)=>(
            <div  className=" flex gap-5 items-center py-5  px-10   bg-blue-5 w-fit" key={index}>
            <div className=" text-blue-50 font-bold">{item.courseName}</div>
            <button onClick={()=>{setModal(item);setShowCourseModal(true)}} className=" text-gray-200"><FaPencil/></button>
            </div>
        ))}
        </div>
        <CommonBtn text="Create Course" type="button" onclick={()=>setShowCourseModal(true)}/>
        {showCourseModal && <CourseModal modal={modal} setShowCourseModal={setShowCourseModal} setCourses={setCourses} courses={courses}/>}
        
        </div>
      )}
      
    </div>
  );
};
