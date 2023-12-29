import React, { useState } from 'react'
import "./UpdateLectureModal.css"
import axios from 'axios';
import {  toast } from "react-hot-toast"
import { useUserContext } from "../../context/UserContext"

const UpdateLectureModal = ({courseId , lectureId, setUpdateModal , title , description , fetchCourse }) => {


  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const { user } = useUserContext()
  const handleUpdateLecture = async () => {

    try {
   
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const updatedData = {
      title: newTitle, // Use the updated title from state
      description: newDescription, // Use the updated content from state
      // Add other fields if needed
    };


    console.log(updatedData);

    const { data } = await axios.put(`/api/lecture/update/${courseId}/${lectureId}`, updatedData , config)

    const updatedLecture = data.updatedLecture
    setUpdateModal(false);
    fetchCourse()
    toast.success('Lecture Updated')
  } catch (error) {
     console.log(error.message);   
  }
  };
  
  return (
    <>
    <div className="text-black modal-wrapper">
  <div className="modal-container bg-white rounded-lg shadow-lg p-4">
    <label className="text-xl font-bold mb-2">Title</label>
    <input type="text" className="border border-gray-500 rounded-md px-3 py-2 mb-4" 
     value={newTitle}
     onChange={(e)=> setNewTitle(e.target.value)}
    />
    <label className="text-xl font-bold mb-2">Content</label>
    <textarea className="border border-gray-500 rounded-md px-3 py-2 mb-4 h-20"
    value={newDescription}
    onChange={(e)=> setNewDescription(e.target.value)}
    ></textarea>
    <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 rounded-md mb-2" onClick={handleUpdateLecture}>
      Update
    </button>
    <button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 rounded-md shadow-lg" onClick={()=> setUpdateModal(false)}>
      Cancel
    </button>
  </div>
</div>

</>
  )
}

export default UpdateLectureModal