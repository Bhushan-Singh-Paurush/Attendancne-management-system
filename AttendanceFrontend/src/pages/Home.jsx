import React from 'react'
import { Template } from '../Components/core/Home/Template'

export const Home = () => {
  return (
    <div className=' w-full h-[calc(100vh-4rem)] bg-gray-100'>
    <div className=' mx-auto w-11/12 max-w-maxContent h-full flex items-center justify-between'>
        {/* left section */}
        <div className=' flex flex-col gap-4'>
            <h1 className=' text-3xl'>Attendance <span className=' text-blue-500'>for your College</span></h1>
            <p className=' text-gray-500'>An efficient and user-friendly platform for managing student attendance in colleges, providing real-time tracking and insightful analytics.</p>
        </div>
        <Template/>
    </div>
    </div>
  )
}
