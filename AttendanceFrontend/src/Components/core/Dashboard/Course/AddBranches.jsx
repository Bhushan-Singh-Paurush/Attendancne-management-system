import React, { useEffect, useState } from 'react'
import { CommonBtn } from '../../../common/CommonBtn'
import { RxCross2 } from "react-icons/rx";
export const AddBranches = ({setValue,register,modal=null}) => {
    const[branches,setBranches]=useState([])
    const[data,setData]=useState("")
    useEffect(()=>{
       register("branches",{requried:false})
    },[])  
    
    useEffect(()=>{
        setValue("branches",branches.length===0  ? ""  : JSON.stringify(branches))
    },[branches])

    useEffect(()=>{
        setBranches([])
        if(modal?.branches)
        setBranches(JSON.parse(modal?.branches));
    },[modal])
    function submitHandler(){
        if(!branches.includes(data) && data!=="")
        setBranches([...branches,data.toUpperCase()]);
    }
 
    return (
    <div className=' flex flex-col gap-2'>
    <div className=' flex items-center gap-2 flex-wrap'>{branches.map((item,index)=>(
        <div className=' flex gap-2 items-center text-sm py-[2px]  px-2 w-fit bg-blue-300 text-white rounded-md' key={index}>
            <div>{item}</div>
            <button className=' text-gray-100' onClick={()=>setBranches(branches.filter(element=>element!==item))}><RxCross2/></button>
        </div>
    ))}</div>
   
   <label className=' flex flex-col gap-1'>
                <div className=' text-lightblack text-xs'>Add Branch</div>
                <input  value={data} className=' uppercase text-lightblack border-2 border-gray-100 focus-within:outline-none' type='text' onChange={(event)=>setData(event.target.value)}/>
   </label>
   <CommonBtn text="Add" type="button" onclick={submitHandler}/>
   
    </div>
  )
}
