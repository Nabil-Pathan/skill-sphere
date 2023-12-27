import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader/Loader"

const CourseDetailsPage = () => {
  const { user, setUser } = useUserContext();
  const params = useParams();
  const [course, setCourse] = useState();
  const [enrolled, setEnrolled] = useState(false);
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      try {
        console.log(user.user._id);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(`/api/course/get/${params.id}`, config);
        console.log(data.course.enrolledStudents);      
        if(data.course.enrolledStudents.includes(user.user._id)){
          setEnrolled(true)
        }else{
          setEnrolled(false)
        }
        setCourse(data.course);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };

    if (user) {
      fetchCourse();
    }
  }, [params.id, user]);

  const handleEnrollCourse = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/course/${course._id}/enroll`, {}, config);
      setUser((prevUser) => {
        return {
          ...prevUser,
          user: {
            ...prevUser.user,
            enrolledCourses: [...prevUser.user.enrolledCourses, course._id],
          },
        };
      });
      console.log(user);
      toast.success('Enrolled to Course');
    } catch (error) {
      console.log(error.message);
    }
  };




  return (
    <>
    {
      loading ? (<Loader/>) : (
        <div className="md:min-h-screen p-4 bg-gray-100">
      {course && (
        <div className="md:max-w-xl w-full mx-auto bg-white p-3 custom-shadow-1  rounded-md ">
          <img src={course.thumbnail} alt={course.title} className="md:w-full md:h-[400px] h-300px mb-4" />
          <h1 className="text-3xl font-semibold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="flex items-center justify-between p-3">
            <p className="text-lg font-semibold text-green-600">Free</p>
            {!enrolled ? (
              <button
                onClick={handleEnrollCourse}
                className="bg-green-600 text-white font-bold px-4 py-2 rounded-md hover:bg-green-500"
              >
                Enroll
              </button>
            ): (
              <>
           <div className='flex items-center justify-end p-3'>
        <Link to={`/course/${course._id}`}>
          <button className='bg-green-600 flex items-center px-4 py-3 rounded-md text-white font-bold hover:bg-green-500'>
            Continue Learning
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7  ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

          </button>
        </Link>
      </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
      )
    }
    

    </>
  );
};

export default CourseDetailsPage;
