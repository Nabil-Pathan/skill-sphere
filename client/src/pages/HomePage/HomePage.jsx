import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import CourseCard from '../../components/CourseCard/CourseCard';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import HomePic from "../../images/HomePic.jpg"
import { SearchIcon } from '@heroicons/react/solid';

const HomePage = () => {
  const { user } = useUserContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = async (e) => {
    try {
      const query = e.target.value
      setSearchQuery(query)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/course/search?searchQuery=${query}`, config)
      console.log(data);
      setCourses(data.courses)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
        {loading ? (
        <Loader />
      ) : (
        <div className="  md:min-h-screen flex flex-col items-center justify-center">
          {/* Top Section */}
          <div className=' home-banner w-full h-[450px]'>
          
          <div className=" flex h-full flex-col items-center justify-center text-white">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 text-center">
              Discover a  World  of <span className='text-green-600'> Knowledge</span>  
            </h1>
            <div className="relative w-[70%]  md:w-[500px] mt-4 text-center">
              {/* Search bar with search icon */}
              <input
                type="text"
                placeholder="Search Courses..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="text-black shadow-xl border-2 border-gray p-2 w-full pl-10 rounded-full"
              />
              <SearchIcon className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
            </div>
          </div>
          </div>

          {/* Courses Section */}
          <div className="mt-8 md:p-6  mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {courses.length >= 1 ? (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <h1 className="text-center text-3xl">No Courses Found</h1>
              </div>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default HomePage;
