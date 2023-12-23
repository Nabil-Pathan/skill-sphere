import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CourseDetailsPage = () => {
  const { user, setUser } = useUserContext();
  const params = useParams();
  const [course, setCourse] = useState();
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(`/api/course/get/${params.id}`, config);
      
        if(data.course.enrolledStudents.includes(user.user._id)){
          setEnrolled(true)
        }
        setCourse(data.course);
       
      } catch (error) {
        console.log(error);
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


  useEffect(()=>{
    console.log("Updated User : ",user);
  },[user])

  return (
    <div className="h-screen p-8 bg-gray-100">
      {course && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
          <img src={course.thumbnail} alt={course.title} className="w-full h-[400px] mb-4" />
          <h1 className="text-3xl font-semibold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="flex items-center justify-between">
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
               <button className="bg-green-600 px-4 py-3 rounded-md hover:bg-green-500 text-white font-bold">
               <Link to={`/course/${course._id}`}>
                 Go To Course  <i className="fas fa-arrow-right ml-2 font-extrabold" ></i>
               </Link>
               </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
