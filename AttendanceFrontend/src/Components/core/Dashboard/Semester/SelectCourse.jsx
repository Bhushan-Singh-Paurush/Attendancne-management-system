import React from "react";

export const SelectCourse = ({ courses, setCourse }) => {
  return (
    <div className=" flex gap-4 items-center flex-wrap">
      {courses.map((item, index) => (
        <div
          className=" flex gap-5 items-center py-5  bg-blue-5 px-10  w-fit"
          key={index}
        >
          <input
            type="radio"
            name="courseType"
            onChange={() => setCourse(item)}
          />
          <div className=" text-blue-50 font-bold ">{item.courseName}</div>
        </div>
      ))}
    </div>
  );
};
