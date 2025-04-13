import React, { useEffect, useState } from "react";
import { Spinner } from "../../../common/Spinner";
import { getSubjects } from "../../Hooks/getSubjects";
import { CommonBtn } from "../../../common/CommonBtn";
import { toast } from "react-toastify";
import { getReport } from "../../../../services/Operations/Date";
import { ReportTable } from "./ReportTable";

export const Report = () => {
  const { subjects, loading } = getSubjects();
  const [state, setState] = useState({ sub: "", month: "" });
  const[semester,setSemester]=useState()

  function changeHandler(event) {
    const { name, value } = event.target;
    setState((pre) => ({ ...pre, [name]: value }));
  }

   async function submitHandler(event) {
           event.preventDefault()
           if(!state.sub)
           {
            toast.error("Please choose a Subject")
            return ;
           }
           const selectedSubject=subjects.filter(element=>element._id===state.sub)
           
           const result = await getReport(selectedSubject?.[0].Semester,selectedSubject?.[0].section,state.sub,state.month)
           if(result){
            
            setSemester(result)
           }
           
  }
     
  useEffect(() => {
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const year = String(new Date().getFullYear());
    setState((pre) => ({ ...pre, month: `${year + "-" + month}` }));
  }, []);

  return (
    <div className=" my-10 w-11/12 flex flex-col gap-4 mx-auto ">
      <div className=" text-blue-300 text-2xl">Report</div>
      {loading ? (
        <Spinner />
      ) : subjects.length === 0 ? (
        <div>No Subject Found</div>
      ) : (
        <div className=" flex flex-col gap-10">
          <form className=" whiteBoxShadow bg-white p-2 flex gap-5 items-end"
           onSubmit={submitHandler}
          >
            <label className=" p-2 border border-gray-200 rounded-md flex flex-col w-fit">
              <div className=" text-gray-200">Subject</div>
              <select value={state.sub} name="sub" onChange={changeHandler} >
              <option  value="" disabled>Please choose a Subject</option>
                {subjects?.map((sub, index) => (
                  <option  value={sub._id} key={index}>
                    {sub.subjectName + " " + sub.subjectCode}
                  </option>
                ))}
              </select>
            </label>
            <label className=" p-2 border border-gray-200 rounded-md flex flex-col w-fit">
              <div className=" text-gray-200">Month</div>
              <input
                name="month"
                onChange={changeHandler}
                value={state.month}
                type="month"
                required
              />
            </label>
            <CommonBtn
              text={loading ? "Loading..." : "Generate Report"}
              type="submit"
              disabled={loading}
            />
          </form>
          {semester && <ReportTable semester={semester} setSemester={setSemester}/>}
        </div>
      )}
    </div>
  );
};
