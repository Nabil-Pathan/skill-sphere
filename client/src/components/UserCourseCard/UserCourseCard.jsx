import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
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
        <Link to={`/edit-course/${course._id}`}>
         <button className="bg-green-600 flex gap-2 items-center justify-center text-white font-bold px-4 py-3 rounded-md hover:bg-green-500"  >
          Edit 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

         </button>

         </Link>
         <button className="bg-red-600 text-white font-bold px-4 py-2 flex gap-3 items-center justify-center rounded-md hover:bg-red-500" onClick={()=> setDeleteModal(true)}>
          Delete
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

          </button>
    </div>
     
  </div>


{
  deleteModal && <DeleteCourseModal fetchUserCourses={fetchUserCourses} courseId={course._id} setDeleteModal={setDeleteModal} />
}
  </>
  )
}

export default UserCourseCard