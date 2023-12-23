import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const SingleCoursePage = () => {
  const { user } = useUserContext();
  const params = useParams();
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);

  useEffect(() => {
    // Fetch course data
    const fetchLectures = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/lecture/get/${params.id}`, config);
        setLectures(data.lectures);

        // Set the first lecture as the selected lecture when lectures are fetched
        if (data.lectures.length > 0) {
          setSelectedLecture(data.lectures[0]);
        }
      } catch (error) {
        console.error('Error fetching course data', error.message);
      }
    };

    fetchLectures();
  }, [params.id, user.token]);

  const handleLectureClick = (lecture) => {
    // Handle lecture click, set selectedLecture state
    setSelectedLecture(lecture);
  };

  return (
    <div className="md:h-screen flex md:flex-row  flex-col">
      {/* Left Section - Video or Lecture */}
      <div className="md:w-3/4 w-full p-4">
        {selectedLecture ? (
          <div>
            <iframe
              title={selectedLecture.title}
              width="100%"
              height="400"
              src={selectedLecture.videoUrl}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h2 className="text-3xl font-semibold mt-4">{selectedLecture.title}</h2>

            <p className="text-xl text-gray-600 mt-3">{selectedLecture.description}</p>
          </div>
        ) : (
          <p className="text-gray-600">Select a lecture from the right section to start learning.</p>
        )}
      </div>

      {/* Right Section - List of Lectures */}
      <div className="md:w-1/4 w-full border-l p-4">
        <h2 className="text-xl font-semibold mb-4">Lectures</h2>
        <ul>
          {lectures.map((lecture, index) => (
            <li key={lecture._id} className="mb-2 cursor-pointer hover:bg-gray-200 p-4 rounded-md">
              <span onClick={() => handleLectureClick(lecture)}>
                <span className="font-semibold mr-2">{index + 1}.</span>
                {lecture.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleCoursePage;
