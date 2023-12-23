import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import CourseCard from '../../components/CourseCard/CourseCard';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const { user } = useUserContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('/api/course/get', config);
      setCourses(data.courses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="md:h-screen container mx-auto my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
