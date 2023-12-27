import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext} from "../../context/UserContext"
import EnrolledCourseCard from '../../components/EnrolledCourseCard/EnrolledCourseCard'
import Loader from "../../components/Loader/Loader"


const MyLearning = () => {
    const { user } = useUserContext()

    const [enrolledcourses , setEnrolledCourses] = useState([])

    const [loading , setLoading]= useState(false)


    const fetchEnrolledCourses = async ()=>{
      setLoading(true)
        try {
            const config = {
                headers:{
                  Authorization: `Bearer ${user.token}`
                }
              }
            const { data } = await axios.get('/api/course/get-enrolledcourses',config)
            setEnrolledCourses(data.courses)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    useEffect(()=>{
            fetchEnrolledCourses()
    },[])

  return (
    <>
    {
      loading ? (<Loader/>) :(
        <div className="md:h-screen container mx-auto my-8">
        <h1 className="text-center text-4xl font-semibold">Your Learning</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-4 gap-5">
      { enrolledcourses.map((course)=>(
         <EnrolledCourseCard fetchEnrolledCourses={fetchEnrolledCourses} key={course._id} course={course}/>
      ))}  
    </div>
  </div>
      )
    }
    
  </>
  )
}

export default MyLearning