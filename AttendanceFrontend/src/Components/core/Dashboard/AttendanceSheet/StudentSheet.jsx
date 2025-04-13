import React, { useState } from "react";
import { CommonBtn } from "../../../common/CommonBtn";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { makeAttendance } from "../../../../services/Operations/Date";

export const StudentSheet = ({ setSemester, semester, subjectId, date }) => {
  
  const [data, setData] = useState([]);
  function addHandler(event) {
    const status = JSON.parse(event.target.value);
    setData(data.filter((element) => element.studentId !== status.studentId));
    setData((pre) => [...pre, status]);
  }

  const submitHandler = async () => {
    if (data.length === 0) {
      toast.error("No data find");
      return;
    }
    const result = await makeAttendance(data);
    if (result) {
      setSemester();
    }
  };

  return (
    <div className=" bg-white w-full p-2 flex flex-col gap-2 whiteBoxShadow">
      <div className=" text-blue-500 font-semibold flex justify-between items-center w-full">
        <div>Attendance Sheet</div>
        <button onClick={() => setSemester()}>
          <RxCross2 />
        </button>
      </div>
      <div className=" flex flex-col gap-4">
        <table className=" w-full border-separate border-spacing-y-2 text-sm">
          <thead className=" bg-blue-5 text-gray-600">
            <tr>
              <th className=" text-start">Student Name</th>
              <th className=" text-start">Student Roll No.</th>
              <th className=" text-start">Section</th>
              <th className=" text-start">Status</th>
            </tr>
          </thead>
          <tbody className="  text-gray-200">
            {semester.students.sort((a,b)=>a.rollNumber - b.rollNumber).map((student, index) => (
              <tr key={index}>
                <td>{student.studentName}</td>
                <td>{student.rollNumber}</td>
                <td>{student.section}</td>
                <td className=" flex items-center gap-2">
                  
                  <input
                    onChange={addHandler}
                    type="radio"
                    value={JSON.stringify({
                      studentId: student._id,
                      status: "Present",
                      subjectId: subjectId,
                      date: date,
                    })}
                    className=" appearance-none w-4 aspect-square border-2 border-blue-50  rounded-full checked:bg-blue-50 "
                    name={index}
                    
                  />
                  <input
                    onChange={addHandler}
                    type="radio"
                    value={JSON.stringify({
                      studentId: student._id,
                      status: "Absent",
                      subjectId: subjectId,
                      date: date,
                    })}
                    className=" appearance-none w-4 aspect-square border-2 border-red-400 rounded-full checked:bg-red-400"
                    name={index}
                    
                  />
                  <input
                    onChange={addHandler}
                    type="radio"
                    value={JSON.stringify({
                      studentId: student._id,
                      status: "Leave",
                      subjectId: subjectId,
                      date: date,
                    })}
                    className=" appearance-none w-4 aspect-square border-2 border-gray-200 rounded-full checked:bg-gray-200"
                    name={index}
                    
                    
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CommonBtn text="submit" onclick={submitHandler} />
      </div>
    </div>
  );
};
