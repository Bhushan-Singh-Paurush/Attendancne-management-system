import React, {useState } from "react";
import { Spinner } from "../../../common/Spinner";
import { useForm } from "react-hook-form";
import { CommonBtn } from "../../../common/CommonBtn";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { removeSubject } from "../../../../services/Operations/Subject";
import { DeleteModal } from "../../../common/DeleteModal";
import { SubjectModal } from "./SubjectModal";
import { SemesterDetails } from "../../Hooks/SemesterDetails";

export const Subjects = () => {
  const{courses,semesterDetails,loading,submitHandler,setLoading,setSemesterDetails}=SemesterDetails() 
  const [semModal, setSemModal] = useState();
  const [isedit, setIsedit] = useState();
  const [modal, setModal] = useState();
  
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
 
  const deleteHandler = async (subjectId, userId) => {
    try {
      setLoading(true);
      const result = await removeSubject(
        semesterDetails._id,
        subjectId,
        userId
      );
      if (result) {
        setSemesterDetails((pre) => ({
          ...pre,
          subjects: pre.subjects.filter((element) => element._id !== subjectId),
        }));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
            className="  flex justify-between items-center bg-white p-4 text-lightblack text-sm"
            onSubmit={handleSubmit((data) => submitHandler(data))}
          >
            <label className=" p-2 rounded-lg border border-gray-400">
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
            <label className=" p-2  rounded-md border border-gray-400 h-[60px] w-[120px]">
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
              {errors.branch && <span>Fill this Field</span>}
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
                className=" w-[100px] border rounded-sm pl-2 border-gray-400"
                name="year"
                {...register("year", { required: true })}
              />
              {errors.year && <span>Fill this Field</span>}
            </label>
            <label className=" p-2 rounded-md  min-w-[120px] border border-gray-400">
              <div className=" text-gray-200">Sem No.</div>
              <input
                type="nubmer"
                className=" w-[100px]  border rounded-sm pl-2 border-gray-400"
                name="semNo"
                {...register("semNo", { required: true })}
              />
              {errors.semNo && <span>Fill this Field</span>}
            </label>

            <CommonBtn
              type="submit"
              text={loading ? "Loading..." : "Subjects"}
              disabled={loading}
            />
          </form>

          {semesterDetails && semesterDetails.subjects.length===0 ? <div>No Subject Found</div> : (
            <div className=" flex flex-col gap-4 text-sm">
              {semesterDetails?.subjects?.map((item, index) => (
                <div
                  key={index}
                  className=" flex gap-2 bg-white p-2 rounded-lg w-fit text-lightblack"
                >
                  <div className=" p-2 border border-gray-400 rounded-md">
                    <div className=" text-gray-200">Subject Name</div>
                    {item.subjectName}
                  </div>
                  <div className=" p-2 border border-gray-400 rounded-md">
                    <div className=" text-gray-200">Subject Code</div>
                    {item.subjectCode}
                  </div>
                  <div className="min-w-[120px] p-2 border border-gray-400 rounded-md">
                    <div className=" text-gray-200">Section</div>
                    {item.section}
                  </div>
                  <div className="min-w-[120px] p-2 border border-gray-400 rounded-md">
                    <div className=" text-gray-200">Subject Teacher</div>
                    {item?.subjectTeacher?.firstName +
                      " " +
                      item?.subjectTeacher?.lastName}
                  </div>
                  <div className=" flex gap-4 items-center pl-4 text-gray-200">
                    <div
                      className=" hover:cursor-pointer"
                      onClick={() => {
                        setSemModal({ ...item });
                        setIsedit(true);
                      }}
                    >
                      <FaPencil />
                    </div>
                    <div
                      className=" text-xl hover:cursor-pointer"
                      onClick={() =>
                        setModal({
                          heading: "Delete Subject",
                          subheading: "All data related to subject deleted",
                          btn1Text: "Cancel",
                          btn2Text: "Delete",
                          btn1Handler: () => setModal(),
                          btn2Handler: () => {
                            deleteHandler(item._id, item.subjectTeacher._id),
                              setModal();
                          },
                        })
                      }
                    >
                      <MdDeleteOutline />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {semesterDetails && (
            <CommonBtn
              text={loading ? "Loading" : "Create Subject"}
              disabled={loading}
              onclick={() =>{ setSemModal(true),setIsedit()}}
            />
          )}
           
          {semModal && (
            <SubjectModal
              semesterDetails={semesterDetails}
              setSemesterDetails={setSemesterDetails}
              isedit={isedit}
              setIsedit={setIsedit}
              setSemModal={setSemModal}
              semModal={semModal}
            />
          )}
        </div>
      )}
      {modal && <DeleteModal {...modal} />}
    </div>
  );
};
