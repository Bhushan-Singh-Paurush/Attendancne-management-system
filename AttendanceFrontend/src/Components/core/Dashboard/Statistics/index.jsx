import React, { useState } from "react";
import { SemesterDetails } from "../../Hooks/SemesterDetails";
import { Spinner } from "../../../common/Spinner";
import { SemDetailForm } from "../../../common/SemDetailForm";
import { CommonBtn } from "../../../common/CommonBtn";
import { useForm } from "react-hook-form";
import { getStatisticsData } from "../../../../services/Operations/Date";
import { Chart } from "./Chart";

export const Statistics = () => {
  const { courses, loading } = SemesterDetails();
  const[data,setData]=useState()
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

  async function submitHandler(data) {
    const result = await getStatisticsData(data);
    if (result) {
      setData(result)
    }
  }
  
  return (
    <div className=" w-full">
      {loading ? (
        <div className=" w-full flex justify-center mt-40">
          <Spinner />
        </div>
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
        </div>
      )}
      {data && <Chart data={data}/>}
    </div>
  );
};
