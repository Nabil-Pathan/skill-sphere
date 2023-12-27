import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'




const CourseCard = ({course}) => {
  const { user , setUser } = useUserContext()

  return (
    <div className='bg-white flex flex-col items-center justify-center custom-shadow hover:shadow-lg hover:cursor-pointer transition-shadow overflow-hidden rounded-lg md:w-full w-[350px] mx-auto'>
      <img
        src={
          course.thumbnail 
        }
        alt='course cover'
        className='w-full  h-[300px] object-cover hover:scale-105 transition-scale duration-300 block'
      />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>
          {course.title}
        </p>
        <p className='text-sm text-gray-600 line-clamp-2'>
          {course.description}
        </p>
      </div>

      <div className="flex items-center justify-end p-3">
      <Link to={`/course-details/${course._id}`}>
      <button className="bg-gray-300 px-4 py-3 rounded-md hover:bg-gray-400">
      Course Details
    </button>
    </Link>
    </div>

     
  </div>
  )
}

export default CourseCard