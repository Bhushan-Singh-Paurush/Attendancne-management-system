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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const currentCourseId = watch("course");
  const currentCourse = courses.filter(
    (element) => element._id === currentCourseId
  );
  setValue("branch", "");

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
          <form
            className="  flex justify-between items-center bg-white p-4 text-sm"
            onSubmit={handleSubmit((data) => submitHandler(data))}
          >
            <label className=" p-2 rounded-md border border-gray-400">
              <div className=" text-gray-200">Course</div>
              <select
                
                name="course"
                defaultValue=""
                {...register("course", { required: true })}
              >
                <option value="" disabled>
                  Select Course
                </option>
                {courses.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.courseName}
                  </option>
                ))}
                {errors.course && <span>Fill this Field</span>}
              </select>
            </label>
            <label className=" h-[60px] p-2 rounded-md border border-gray-400 min-w-[120px]">
              <div className=" text-gray-200">Branch</div>
              {currentCourse?.[0]?.branches && (
                <select
                  className=" w-[100px]"
                  name="branch"
                  {...register("branch", { required: true })}
                >
                  <option value="" disabled>
                    Select Branch
                  </option>
                  {JSON.parse(currentCourse?.[0]?.branches).map(
                    (item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              )}
              {errors.branch && <div>Fill this Field</div>}
            </label>

            <label className=" p-2 rounded-md border border-gray-400 min-w-[120px]">
              <div className=" text-gray-200">Section</div>
              <select
                className=" w-[120px]"
                name="section"
                {...register("section", { required: true })}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                {errors.section && <span>Fill this Field</span>}
              </select>
            </label>
            <label className=" p-2 rounded-md  min-w-[120px] border border-gray-400">
              <div className=" text-gray-200">Year</div>
              <input
                type="nubmer"
                className=" w-[100px] border border-gray-400 rounded-sm pl-2"
                name="year"
                {...register("year", { required: true })}
              />
              {errors.year && <span>Fill this Field</span>}
            </label>
            <label className=" p-2 rounded-md  min-w-[120px] border border-gray-400">
              <div className=" text-gray-200">Sem No.</div>
              <input
                type="nubmer"
                className=" w-[100px]  border border-gray-400 rounded-sm pl-2"
                name="semNo"
                {...register("semNo", { required: true })}
              />
              {errors.semNo && <span>Fill this Field</span>}
            </label>

            <CommonBtn
              type="submit"
              text={loading ? "Loading..." : "Students"}
              disabled={loading}
            />
          </form>
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
