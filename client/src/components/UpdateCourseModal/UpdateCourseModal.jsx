import React, { useState } from 'react'
import axios from 'axios';
import {  toast } from "react-hot-toast"
import { useUserContext } from "../../context/UserContext"
import "./UpdateCourseModal.css"

const UpdateCourseModal = ({courseId , setUpdateModal , title , description , fetchUserCourses }) => {


  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const { user } = useUserContext()


  const handleUpdateCourse = async () => {

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

    const { data } = await axios.put(`/api/course/update/${courseId}`, updatedData , config)

    const updatedCourse = data.course
    setUpdateModal(false);
    toast.success('Course Updated')
    fetchUserCourses()
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
    <label className="text-xl font-bold mb-2">Description</label>
    <textarea className="border border-gray-500 rounded-md px-3 py-2 mb-4 h-20"
    value={newDescription}
    onChange={(e)=> setNewDescription(e.target.value)}
    ></textarea>
    <button  className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 rounded-md mb-2" onClick={handleUpdateCourse}>
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

export default UpdateCourseModal