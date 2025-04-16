import React from "react";
import { useForm } from "react-hook-form";
import { CommonBtn } from "../../common/CommonBtn";
import { useDispatch, useSelector } from "react-redux";
import { setData, setUserLoading } from "../../../slice/profile";
import { sendOTP } from "../../../services/Operations/auth";
import { toast } from "react-toastify";

export const Signupdata = ({ setInternalStep }) => {
  const { userLoading } = useSelector((state) => state.profile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm password mismatched");
      return;
    }
    dispatch(setUserLoading(true));
    dispatch(setData(data));
    const result = await sendOTP(data.email);
    if (result) {
      setInternalStep(2);
    }
    dispatch(setUserLoading(false));
  };
  return (
    <form
      className=" flex flex-col gap-4"
      onSubmit={handleSubmit((data) => submitHandler(data))}
    >
      <div className=" w-full flex items-center gap-8">
        <label className="py-1 px-2 border-[1px] border-blue-50 rounded-md w-fit flex gap-2 items-center  bg-blue-5 text-blue-50">
          <input
            type="radio"
            value={"Teacher"}
            name="accountType"
            {...register("accountType", { required: true })}
          />
          <div>Teacher</div>
        </label>
        <label className="py-1 px-2 border-[1px] border-blue-50 rounded-md w-fit flex gap-2 items-center  bg-blue-5 text-blue-50">
          <input
            type="radio"
            value={"Admin"}
            name="accountType"
            {...register("accountType", { required: true })}
          />
          <div>Admin</div>
        </label>
      </div>
      <div className=" w-full flex items-center justify-between">
        <label className="w-[45%] flex flex-col gap-1">
          <div className=" text-lightblack text-xs">First Name</div>
          <input
            className=" text-lightblack border-2 border-gray-100 focus-within:outline-none"
            type="text"
            name="firstName"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className=" text-lightblack text-xs">Fill this field</span>
          )}
        </label>
        <label className="w-[45%] flex flex-col gap-1">
          <div className=" text-lightblack text-xs">Last Name</div>
          <input
            className=" text-lightblack border-2 border-gray-100 focus-within:outline-none"
            type="text"
            name="lastName"
            {...register("lastName")}
          />
          
        </label>
      </div>
      <label className=" flex flex-col gap-1">
        <div className=" text-lightblack text-xs">Email</div>
        <input
          className=" text-lightblack border-2 border-gray-100 focus-within:outline-none"
          type="email"
          name="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className=" text-lightblack text-xs">Fill this field</span>
        )}
      </label>
      <div className=" w-full flex items-center justify-between">
        <label className="w-[45%] flex flex-col gap-1">
          <div className=" text-lightblack text-xs">Password</div>
          <input
            minLength="5"
            className=" text-lightblack border-2 border-gray-100 focus-within:outline-none"
            type="password"
            name="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className=" text-lightblack text-xs">Fill this field</span>
          )}
        </label>
        <label className="w-[45%] flex flex-col gap-1">
          <div className=" text-lightblack text-xs">Confirm Password</div>
          <input
            minLength="5"
            className=" text-lightblack border-2 border-gray-100 focus-within:outline-none"
            type="password"
            name="confirmPassword"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <span className=" text-lightblack text-xs">Fill this field</span>
          )}
        </label>
      </div>
      <label className="w-[45%] flex flex-col gap-1">
        <div className=" text-lightblack text-xs">Secret Pin</div>
        <input
          className=" text-lightblack border-2 border-gray-100 focus-within:outline-none"
          type="password"
          name="pin"
          {...register("pin", { required: true })}
        />
        {errors.pin && (
          <span className=" text-lightblack text-xs">Fill this field</span>
        )}
      </label>
      <CommonBtn
        text={userLoading ? "Loading..." : "Create Account"}
        disabled={userLoading}
        type="submit"
      />
    </form>
  );
};
