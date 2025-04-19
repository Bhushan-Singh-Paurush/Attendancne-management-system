import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  } from 'recharts';

export const Chart = ({data}) => {
  return (
    <div className=' w-11/12 mx-auto my-4'>
          <div className="w-full h-80 bg-white p-5">
    <h2 className="text-xl font-semibold text-blue-600 mb-2">Subject-wise Attendance Overview</h2>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="subjectName" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="avgPresent" name="Avg Present" stroke="#3b82f6" strokeWidth={2} dot />
        <Line type="monotone" dataKey="todayPresent" name="Today Present" stroke="#10b981" strokeWidth={2} dot />
        <Line type="monotone" dataKey="todayAbsent" name="Today Absent" stroke="#ef4444" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  </div>
    </div>
  )
}
