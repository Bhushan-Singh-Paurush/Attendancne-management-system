import React from 'react'

export const CommonBtn = ({text,type=null,disabled=null,onclick=null}) => {
  return (
    <button disabled={disabled}  type={type} onClick={onclick} className=' py-2 px-4 bg-blue-300 text-white w-fit rounded-sm  transition-all duration-100 hover:scale-95 text-xs'>{text}</button>
  )
}
