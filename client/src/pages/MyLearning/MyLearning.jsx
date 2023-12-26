import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext} from "../../context/UserContext"
import EnrolledCourseCard from '../../components/EnrolledCourseCard/EnrolledCourseCard'

const MyLearning = () => {
    const { user } = useUserContext()

    const [enrolledcourses , setEnrolledCourses] = useState([])

    const fetchEnrolledCourses = async ()=>{
        try {
            const config = {
                headers:{
                  Authorization: `Bearer ${user.token}`
                }
              }
            const { data } = await axios.get('/api/course/get-enrolledcourses',config)
            setEnrolledCourses(data.courses)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
            fetchEnrolledCourses()
    },[])

  return (
    <div className="md:h-screen container mx-auto my-8">
        <h1 className="text-center text-4xl font-semibold">Your Learning</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-4 gap-5">
      { enrolledcourses.map((course)=>(
         <EnrolledCourseCard key={course._id} course={course}/>
      ))}  
    </div>
  </div>
  )
}

export default MyLearning