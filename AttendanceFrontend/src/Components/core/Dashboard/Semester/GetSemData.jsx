import React, { useEffect, useState } from 'react'
import { deleteSem, getSemesters } from '../../../../services/Operations/Semester'
import { Spinner } from '../../../common/Spinner'
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { CommonBtn } from '../../../common/CommonBtn';
import { DeleteModal } from '../../../common/DeleteModal';
import { SemesterModal } from './SemesterModal';
export const GetSemData = ({course,branch=null}) => {
   
  const[loading,setLoading]=useState(true) 
    const[semesters,setSemesters]=useState([])
    const[modal,setModal]=useState()
    const[showSemModal,setShowSemModal]=useState(false)
    const[isedit,setIsEdit]=useState(false)
    useEffect(()=>{
       ;(async()=>{
        const result=await getSemesters(course._id,branch)
        if(result){
           setSemesters(result)
        }
        setLoading(false)
       })()
  },[course,branch])

  
  const  removeSemester=async(semesterId)=>{
       setLoading(true)
       const result = await deleteSem(semesterId)
       if(result){
        setSemesters(semesters.filter(element=>element._id!==semesterId))
        setModal(null)
       }
       setLoading(false)
  }
  
    return (
    <div className=' flex flex-col gap-4'>
    {loading ? <Spinner/> : semesters.length===0 ? <div>No data found</div> : 
    <div>
    <div className=' flex flex-col gap-4'>{semesters.map((sem,index)=>(
      <div key={index} className=' flex w-full justify-between bg-blue-5 py-2 px-4 '>
        <table className=' w-full'>
          <thead className=' text-gray-400 text-sm'>
            <tr>
              <th className=' text-start'>Course Name</th>
              <th className=' text-start'>Branch</th>
              <th className=' text-start'>Year</th>
              <th className=' text-start'>Sem No.</th>
              <th className=' text-start'>Actions</th>
            </tr>
          </thead>
          <tbody className=' text-lightblack'>
            <tr>
            <td>{sem.course.courseName}</td>
            <td>{sem?.branch}</td>
            <td>{sem.year}</td>
            <td>{sem.semNo}</td>
            <td className=' flex gap-4'>
             <button onClick={()=>{setShowSemModal(sem);setIsEdit(true)}}><FaPencil/></button>
             <button 
             className=' text-xl'
             onClick={()=>setModal({
              heading:"Delete Semester",
              subheading:"All Semester related date deleted Parmanently", 
              btn1Text:"Cancel",
               btn2Text:"Delete",
                btn1Handler:()=>setModal(false),
                 btn2Handler:()=>removeSemester(sem._id)
             })}
             ><MdDeleteOutline/></button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    ))}
    
    </div>
   
    </div>}
    {!showSemModal &&  <CommonBtn onclick={()=>setShowSemModal({course:{courseName:course.courseName},courseId:course._id,branch})} disabled={loading} text={"Create Semester"}/> }
   {showSemModal && <SemesterModal isedit={isedit} setIsEdit={setIsEdit} setShowSemModal={setShowSemModal} showSemModal={showSemModal} setSemesters={setSemesters} semesters={semesters}/>}
   {modal && <DeleteModal {...modal}/>}
    </div>
  )
}
