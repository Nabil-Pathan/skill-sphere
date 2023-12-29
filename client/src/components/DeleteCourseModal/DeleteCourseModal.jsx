import React, { useState } from 'react';
import axios from "axios"
import { useUserContext } from "../../context/UserContext"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import './DeleteCourseModal.css'

const DeleteCourseModal = ({ setDeleteModal, courseId, fetchUserCourses }) => {

    const { user } = useUserContext()


    const navigate = useNavigate()

    const handleDeletePost = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            setDeleteModal(false)
            await axios.delete(`/api/course/delete/${courseId}`, config)
            fetchUserCourses()
            toast.success('Course Deleted')
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <div className="text-black modal-wrapper ">
                <div className="modal-container">
                    <button className="absolute text-3xl top-3 right-3 px-2 py-1 rounded-md  text-gray-700 bg-gray-300 hover:bg-gray-200 hover:text-gray-600 " onClick={() => setDeleteModal(false)}>X</button>

                    <div className="text-red-500 w-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>

                    <h2 className="text-2xl mt-3 font-bold  ">Are Your Sure You Want to Delete the Course ?</h2>
                    <div className="flex mt-1 items-center justify-around">
                    <button className="mt-4 bg-red-700 rounded-md hover:bg-red-500 font-bold text-white p-3" onClick={handleDeletePost}>Delete</button>
                    <button className="mt-4 bg-gray-300 hover:bg-gray-500 font-bold  p-3 rounded-md shadow-lg  " onClick={() => setDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteCourseModal;