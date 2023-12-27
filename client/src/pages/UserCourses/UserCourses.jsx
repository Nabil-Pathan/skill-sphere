import React, { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useUserContext } from "../../context/UserContext"
import UserCourseCard from '../../components/UserCourseCard/UserCourseCard'
import Loader from '../../components/Loader/Loader'

const UserCourses = () => {

  const { user } = useUserContext()

  const [ courses , setCourses ] = useState([])

  const [ loading , setLoading] = useState(false)

  const fetchUserCourses = async () =>{
    setLoading(true)
    try {
      const config = {
        headers:{
          Authorization : `Bearer ${user.token}`
        }
      }
       const { data } = await axios.get('/api/course/get-user-courses',config)
       setCourses(data.courses)
       setLoading(false)
    } catch (error) {
       console.log(error.message);
       setLoading(false)
    }
  }
  useEffect(()=>{
    fetchUserCourses()
  },[])
  return (
    <>
    {
      loading ? (<Loader/>) :(
        <div className="md:h-screen container mx-auto my-8">
        <h1 className="text-center text-4xl font-semibold">Your Courses</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-4 gap-5">
      { courses.map((course)=>(
         <UserCourseCard fetchUserCourses={fetchUserCourses}  key={course._id} course={course}/>
      ))}  
    </div>
  </div>
      )
    }

</>
  )
}

export default UserCourses