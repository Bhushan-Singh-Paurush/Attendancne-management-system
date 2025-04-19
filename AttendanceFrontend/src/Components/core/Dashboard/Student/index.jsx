import { Spinner } from "../../../common/Spinner";
import { useForm } from "react-hook-form";
import { CommonBtn } from "../../../common/CommonBtn";
import { SemesterDetails } from "../../Hooks/SemesterDetails";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { DeleteModal } from "../../../common/DeleteModal";
import { deleteStudent } from "../../../../services/Operations/Students";
import { StudentModal } from "./StudentModal";
import { SemDetailForm } from "../../../common/SemDetailForm";

export const Student = () => {
  const {
    courses,
    semesterDetails,
    loading,
    submitHandler,
    setSemesterDetails,
  } = SemesterDetails();
  const [modal, setModal] = useState();
  const [studentModal, setStudentModal] = useState();
  const [isedit, setIsedit] = useState();


  const deleteHandler = async (studentId) => {
    try {
      const result = await deleteStudent(studentId);
      if (result) {
        setSemesterDetails((pre) => ({
          ...pre,
          students: pre.students.filter((element) => element._id !== studentId),
        }));
      }
    } catch (error) {
      console.log(error);
    }
    setModal();
  };

  return (
    <div className=" w-full">
      {loading ? (
        <div className=" w-full flex justify-center mt-40"><Spinner /></div>
      ) : courses.length === 0 ? (
        <div>No data Found</div>
      ) : (
        <div className=" my-10 w-11/12 mx-auto flex flex-col gap-4">
           <SemDetailForm courses={courses} loading={loading} submitHandler={submitHandler}/>
        </div>
      )}
      {!semesterDetails ? (
        <div className=" my-10 w-11/12 mx-auto">No Student Found</div>
      ) : (
        <div className="p-2  w-11/12 mx-auto flex flex-col gap-4 bg-white text-sm">
          <table className=" border-separate border-spacing-y-2">
            <thead className=" text-gray-200">
              <tr>
                <th className=" text-start">Student Name</th>
                <th className=" text-start">Student Roll No.</th>
                <th className=" text-start">Section</th>
                <th className=" text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {semesterDetails?.students.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentName}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.section}</td>
                  <td className=" flex items-center gap-4 text-gray-200">
                    <button
                      onClick={() => {
                        setStudentModal({ ...student });
                        setIsedit(true);
                      }}
                    >
                      <FaPencil />
                    </button>
                    <button
                      className=" text-lg"
                      onClick={() =>
                        setModal({
                          heading: "Delete Student",
                          subheading: "All Student Related data deleted ?",
                          btn1Text: "Cancel",
                          btn2Text: "Delete",
                          btn1Handler: () => setModal(),
                          btn2Handler: () => deleteHandler(student._id),
                        })
                      }
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className=" w-11/12 mx-auto my-5">
        {semesterDetails && (
          <CommonBtn
            onclick={() =>{setStudentModal({ semester: semesterDetails._id });setIsedit()}}
            text={"Create Student"}
          />
        )}
      </div>
      {studentModal && <StudentModal
        setStudentModal={setStudentModal}
        semesterDetails={semesterDetails}
        setSemesterDetails={setSemesterDetails}
        studentModal={studentModal}
        isedit={isedit}
        setIsedit={setIsedit}
      />}

      {modal && <DeleteModal {...modal} />}
    </div>
  );
};
