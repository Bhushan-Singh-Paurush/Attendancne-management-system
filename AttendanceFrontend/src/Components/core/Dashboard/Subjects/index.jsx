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
import { SemDetailForm } from "../../../common/SemDetailForm";

export const Subjects = () => {
  const{courses,semesterDetails,loading,submitHandler,setLoading,setSemesterDetails}=SemesterDetails() 
  const [semModal, setSemModal] = useState();
  const [isedit, setIsedit] = useState();
  const [modal, setModal] = useState();
  

 
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
          <SemDetailForm courses={courses} loading={loading} submitHandler={submitHandler}/>

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
