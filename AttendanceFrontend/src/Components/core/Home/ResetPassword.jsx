import React, { useState } from "react";
import { CommonBtn } from "../../common/CommonBtn";
import { resetPasswordLink } from "../../../services/Operations/auth";

export const ResetPassword = ({ setInternalSteps }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await resetPasswordLink(email);
    if (result) setInternalSteps(2);
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-4">
      <h1>Reset your password</h1>
      <p className=" text-lightblack text-xs">
        Have no fear. We’ll email you instructions to reset your password. If
        you dont have access to your email we can try account recovery
      </p>
      <form className=" flex flex-col gap-4" onSubmit={submitHandler}>
        <label>
          <div className=" text-lightblack text-xs">email</div>
          <input
            className=" w-full text-lightblack border-2 border-gray-100 focus-within:outline-none"
            required
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            
          />
        </label>
        <CommonBtn
          disabled={loading}
          text={loading ? "Loading..." : "Reset Password"}
          type="submit"
        />
      </form>
    </div>
  );
};
