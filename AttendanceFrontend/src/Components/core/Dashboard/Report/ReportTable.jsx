import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

export const ReportTable = ({semester,setSemester}) => {
   const[student,setStudent]=useState([])
    
   useEffect(()=>{

        const updatedStudent= semester.students.map((student)=>{
            let Present=0;
            let Absent=0;
            let Leave=0;
            if(student.date.length>0){
                 
                for(let date of student.date){
                    if(date.status==="Present")
                        Present+=1;
                    else if(date.status==="Absent")
                        Absent+=1;
                    else Leave+=1;
                }
            }
            return {
                ...student,
                Present,
                Absent,
                Leave
            }
        })
        setStudent(updatedStudent)
            
    },[semester])
    
    return (
    <div className=" bg-white w-full p-2 flex flex-col gap-2 whiteBoxShadow">
        <div className=" text-blue-500 font-semibold flex justify-between items-center w-full">
                <div>Subject Report</div>
                <button onClick={() => setSemester()}>
                  <RxCross2 />
                </button>
              </div>
        <table className=" w-full border-separate border-spacing-y-2 text-sm">
            <thead className=" bg-blue-5 text-gray-600">
                <tr>
                    <th className=' text-start'>Student Name</th>
                    <th className=' text-start'>Section</th>
                    <th className=' text-start'>Roll No</th>
                    <th className=' text-start'>Total Present Day</th>
                    <th className=' text-start'>Total Absence Day</th>
                </tr>
            </thead>
            <tbody className="  text-gray-200">
            {
                student && student.sort((a,b)=>a.rollNumber-b.rollNumber).map((student,index)=>(
                    <tr key={index}>
                        <td>{student.studentName}</td>
                        <td>{student.section}</td>
                        <td>{student.rollNumber}</td>
                        <td>{student.Present}</td>
                        <td>{student.Absent}</td>
                    </tr>
                ))
            }   
            </tbody>
        </table>
    </div>
  )
}
