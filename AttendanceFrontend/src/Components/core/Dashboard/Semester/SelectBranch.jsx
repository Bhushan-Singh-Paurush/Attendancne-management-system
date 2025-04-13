import React from "react";

export const SelectBranch = ({ course, setBranch }) => {
  return (
    <div className=" flex gap-4 items-center flex-wrap">
      {JSON.parse(course.branches).map((item, index) => (
        <div
          className=" flex gap-5 items-center py-5   px-10  bg-blue-5 w-fit"
          key={index}
        >
          <input
            type="radio"
            name="courseType"
            onChange={() => setBranch(item)}
          />
          <div className=" text-blue-50 font-bold">{item}</div>
        </div>
      ))}
    </div>
  );
};
