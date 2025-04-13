import React from 'react'
import { CommonBtn } from './CommonBtn'

export const DeleteModal = ({heading,subheading,btn1Text,btn2Text,btn1Handler,btn2Handler}) => {
  return (
    <div className='w-full h-full bg-gray-200 absolute top-0 left-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
    <div className=' absolute bg-white p-4 flex flex-col gap-4 w-[300px]'>
    <h1>{heading}</h1>
    <h3>{subheading}</h3>
    <div className=' w-full justify-between flex'>
      <CommonBtn text={btn1Text} onclick={btn1Handler}/>
      <CommonBtn text={btn2Text} onclick={btn2Handler}/>
    </div>
    </div>
    </div>
  )
}
