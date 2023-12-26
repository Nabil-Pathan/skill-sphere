import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { ArrowRightIcon } from '@heroicons/react/solid';

const EnrolledCourseCard = ({ course }) => {
  const { user, setUser } = useUserContext();

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg md:w-full w-[400px] mx-auto'>
      <img
        src={course.thumbnail}
        alt='course cover'
        className='md:h-[300px] h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300'
      />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='truncate text-lg font-semibold text-slate-700'>{course.title}</p>
        <p className='text-sm text-gray-600 line-clamp-2'>{course.description}</p>
      </div>

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
    </div>
  );
};

export default EnrolledCourseCard;
