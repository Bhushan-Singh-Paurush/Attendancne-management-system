import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonBtn } from "../../../common/CommonBtn";
import { toast } from "react-toastify";
import { editProfile } from "../../../../services/Operations/auth";

export const ProfileInfo = ({ loading, setLoading }) => {
  const [state, setState] = useState({ firstName: "", lastName: "" });
  const { user } = useSelector((state) => state.profile);
  const dispatch=useDispatch()
  useEffect(() => {
    if (user) {
      setState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
      });
    }
  }, [user]);

  function changeHandler(event){
    const{name,value}=event.target
    setState((pre)=>({...pre,[name]:value}))
  }
  function checkChange(){
    if(state.firstName!==user.firstName || state.lastName!==user.lastName){
      return true;
    }else{
      return false
    }
  }
  function submitHandler(event){
       event.preventDefault()
       if(checkChange()){
             const formdata=new FormData()
             if(state.firstName!==user.firstName)
              formdata.append("firstName",state.firstName);

            if(state.lastName!==user.lastName)
              formdata.append("lastName",state.lastName);
            
            setLoading(true)
            dispatch(editProfile(formdata,setLoading)) 
       }else{
        toast.error("No change Found")
       }
  }
  
  return (
    <div className="w-full p-4 flex flex-col  gap-1 bg-white whiteBoxShadow">
      <div>Profile Information</div>
      <form className=" flex justify-between items-center gap-4" onSubmit={submitHandler}>
        
          <label className=" flex flex-col gap-1 w-fit ">
            <div className=" text-gray-200">First Name</div>
            <input
              type="text"
              name="firstName"
              value={state.firstName}
              className=" border border-gray-200 rounded-md pl-2"
              onChange={changeHandler}
            />
          </label>
          <label className=" flex flex-col gap-1 w-fit">
            <div className=" text-gray-200">Last Name</div>
            <input
              type="text"
              name="lastName"
              value={state.lastName}
              className=" border border-gray-200 rounded-md pl-2"
              onChange={changeHandler}
            />
          </label>
       

        <CommonBtn
          text={loading ? "Uploading..." : "Edit"}
          disabled={loading}
          type="submit"
        />
      </form>
    </div>
  );
};
