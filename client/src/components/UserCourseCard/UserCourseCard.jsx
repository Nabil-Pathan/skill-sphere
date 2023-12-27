import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import UpdateCourseModal from '../UpdateCourseModal/UpdateCourseModal'
import DeleteCourseModal from '../DeleteCourseModal/DeleteCourseModal'



const UserCourseCard = ({course , fetchUserCourses}) => {
  const { user , setUser } = useUserContext()

  const [updateModal , setUpdateModal] = useState(false)
  const [ deleteModal , setDeleteModal] = useState(false)

  return (
    <>
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

      <div className="flex gap-4 p-7 ">
         <button className="bg-green-600 text-white font-bold px-4 py-3 rounded-md hover:bg-green-500" onClick={()=> setUpdateModal(true)} >Update</button>
         <button className="bg-red-600 text-white font-bold px-4 py-3 rounded-md hover:bg-red-500" onClick={()=> setDeleteModal(true)}>Delete</button>
    </div>
     
  </div>

{
    updateModal && <UpdateCourseModal fetchUserCourses={fetchUserCourses} title={course.title} description={course.description} courseId={course._id} setUpdateModal={setUpdateModal}/>
}

{
  deleteModal && <DeleteCourseModal fetchUserCourses={fetchUserCourses} courseId={course._id} setDeleteModal={setDeleteModal} />
}
  </>
  )
}

export default UserCourseCard