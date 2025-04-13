import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createNewSubject, updateSubject } from "../../../../services/Operations/Subject";
import { CommonBtn } from "../../../common/CommonBtn";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { getTeachers } from "../../../../services/Operations/auth";

export const SubjectModal = ({ isedit=null, setIsedit, setSemModal, semModal,semesterDetails,setSemesterDetails }) => {
  
  
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await getTeachers()
      if (result) {
        setTeachers(result);
      }
    })();
  }, []);

  useEffect(() => {
    reset()
    if (isedit) {
      setValue("subjectName", semModal.subjectName);
      setValue("subjectCode", semModal.subjectCode);
      setValue("section", semModal.section);
      setValue("subjectTeacher", semModal.subjectTeacher._id);
    }
  }, [isedit,semModal]);

  function checkChange() {
    const currentValue = getValues();

    if (
      currentValue.subjectName !== semModal.subjectName ||
      currentValue.subjectCode !== semModal.subjectCode ||
      currentValue.section !== semModal.section ||
      currentValue.subjectTeacher !== semModal.subjectTeacher._id
    ) {
      return true;
    } else return false;
  }
  const submitHandler = async (data) => {
   
    if (isedit) {
      if (checkChange()) {
        
        const formdata = new FormData();
        formdata.append("subjectId", semModal._id);

        if (data.subjectName !== semModal.subjectName)
          formdata.append("subjectName", data.subjectName);

        if (data.subjectCode !== semModal.subjectCode)
          formdata.append("subjectCode", data.subjectCode);

        if (data.section !== semModal.section)
          formdata.append("section", data.section);

        if (data.subjectTeacher !== semModal.subjectTeacher)
          formdata.append("subjectTeacher", data.subjectTeacher);
        setLoading(true)
        const result = await updateSubject(formdata);

        if (result) {
          setSemesterDetails((pre)=>({...pre,subjects:pre.subjects.map((element)=>element._id===semModal._id ? result : element)}))
          setIsedit()
          setSemModal()
        }
      } else {
        toast.error("No change Found");
      }
      setLoading(false)
      return;
    }
    setLoading(true)
    const result =await createNewSubject(data,semesterDetails._id)
    if(result){
      setSemesterDetails((pre)=>({...pre,subjects:[...pre.subjects,result]}))
      setSemModal()
    }
    setLoading(false)
  };
  return (
    <div className=" p-4 w-fit">
    <button className=" text-gray-200 flex w-full justify-end" onClick={()=>{setSemModal(),setIsedit()}}><RxCross2/></button>
      <form
        className=" flex flex-col gap-4"
        onSubmit={handleSubmit((data) => submitHandler(data))}
      >
        <label className=" flex flex-col gap-1">
          <div className=" text-lightblack text-xs">Subject Name</div>
          <input
            className=" capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none"
            name="subjectName"
            {...register("subjectName", { required: true })}
          />
          {errors.subjectName && <span>Fill this field</span>}
        </label>
        <label className=" flex flex-col gap-1">
          <div className=" text-lightblack text-xs">Subject Code</div>
          <input
            className=" capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none"
            name="subjectCode"
            {...register("subjectCode", { required: true })}
          />
          {errors.subjectCode && <span>Fill this field</span>}
        </label>
        <label className=" flex flex-col gap-1">
          <div className=" text-lightblack text-xs">Subject Name</div>
          <select
            className=" capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none"
            name="section"
            {...register("section", { required: true })}
          >
            <option value={"A"}>A</option>
            <option value={"B"}>B</option>
          </select>
          {errors.section && <span>Fill this field</span>}
        </label>
        <label className=" flex flex-col gap-1">
          <div className=" text-lightblack text-xs">Subject Name</div>
          <select
            className=" capitalize text-lightblack border-2 border-gray-100 focus-within:outline-none"
            name="subjectTeacher" defaultValue=""
            {...register("subjectTeacher", { required: true })}
          >
          <option value="" disabled>Select Teacher</option>
            {teachers.map((item, index) => (
              <option key={index} value={item._id}>
                {item.firstName + " " + item?.lastName}
              </option>
            ))}
          </select>
          {errors.subjectTeacher && <span>Fill this field</span>}
        </label>
        <CommonBtn
          text={loading ? "Loading..." : isedit ? "Update" : "Submit"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
};
