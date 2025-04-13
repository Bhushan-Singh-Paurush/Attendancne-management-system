import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const Dashboard = () => {
  return (
    <div className=' w-full min-h-[calc(100vh-4rem)] bg-gray-100 flex'>
      <Sidebar/>
      <div className=' flex-1 min-h-[calc(100vh-4rem)] relative'>
        <Outlet/>
      </div>
    </div>
  )
}
