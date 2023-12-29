import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import axios from 'axios';
import { toast } from "react-hot-toast"
import Loader from "../../components/Loader/Loader"
import UpdateLectureModal from '../../components/UpdateLectureModal/UpdateLectureModal';


const EditCoursePage = () => {
    const { user } = useUserContext();
    const params = useParams();
    const [course, setCourse] = useState({});
    const [loading , setLoading] = useState(false)
    const [updateModal, setUpdateModal] = useState({
        isOpen: false,
        lectureId: null,
        title: "",
        description : ""
    });
    const [lectures, setLectures] = useState([])
    const [formData , setFormData] = useState({
        newTitle : '',
        newDescription: ''
    })

    const fetchCourse = async () => {
        setLoading(true)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`/api/course/get/${params.id}`, config);
            setCourse(data.course);
            setFormData({
                newTitle: data.course.title,
                newDescription: data.course.description
            })
            setLectures(data.course.lectures)
            setLoading(false)
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    };



    useEffect(() => {
        fetchCourse();
    }, []);

   
    const handleFormSubmit = async (e)=>{
        e.preventDefault()

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            console.log(formData);
            const { data } = await axios.put(`/api/course/update/${params.id}`,{title : formData.newTitle , description : formData.newDescription}, config)
            toast.success('Course Updated')
        } catch (error) {
             console.log(error.message);
        }
    }

    const handleDeleteLecture = async (lectureId) =>{
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.delete(`/api/lecture/delete/${course._id}/${lectureId}`,config) 
            toast.success('Lecture Deleted')
            fetchCourse()
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
        {
            loading ? (<Loader/>) :(
                <div className="md:min-h-screen p-4">
           

                <form onSubmit={handleFormSubmit} className="max-w-md mx-auto p-3 mt-8">
                    <label className="block text-gray-700 text-xl font-bold mb-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.newTitle}
                        onChange={(e)=> setFormData({...formData , newTitle : e.target.value})}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    />
    
    
                    <label className="block text-gray-700 text-xl font-bold mb-2">
                        Description:
    
                    </label>
                    <textarea
                        name="description"
                        value={formData.newDescription}
                        onChange={(e)=> setFormData({...formData , newDescription : e.target.value})}
                        rows="4"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    />
    
    
                    <button
                        type="submit"
                        className="bg-green-600 font-bold mt-4 text-white p-2 rounded-md hover:bg-green-500 "
                    >
                        Save Changes
                    </button>
                </form>
    
    
    
                <div className="flex flex-col gap-4 max-w-md mx-auto mt-8">
                    <h1>Lectures</h1>
    
                    {
                        lectures && lectures.map((lecture)=>(
                              <div key={lecture._id} className='bg-gray-300 flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 rounded-md'>
                        <h1>{lecture.title}</h1>
                        <div className='flex gap-2'>
                            <button onClick={()=> setUpdateModal({ isOpen : true , lectureId : lecture._id , title : lecture.title , description : lecture.description})}>  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            </button>
                            <button onClick={()=>handleDeleteLecture(lecture._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div> 
                        ))
                    }
                   
                </div>
            </div>
            )
        }
       

       {
        updateModal.isOpen && <UpdateLectureModal courseId={course._id} lectureId={updateModal.lectureId} title={updateModal.title} description={updateModal.description} setUpdateModal={setUpdateModal} fetchCourse={fetchCourse}/>
       }

        </>
    );
};

export default EditCoursePage;
