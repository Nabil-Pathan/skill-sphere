import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useUserContext } from '../../context/UserContext'
import { toast } from "react-hot-toast"
import { app } from "../../firebase"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateCoursePage = () => {
  const { user } = useUserContext()

  const navigate = useNavigate()


  const [course, setCourse] = useState({
    title: '',
    description: '',
    thumbnail: '',
    instructor: user ? user.user._id : ''
  });

  const [file, setFile] = useState(undefined)
  const [filePer, setFilePer] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [ fileUploading , setFileUploading] = useState(false)

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post(`/api/course/create`, course , config)
      console.log(data);
      toast.success('Course Created')
      navigate(`/add-lectures/${data.course._id}`)
    } catch (error) {
      console.log(error);
    }
  };



  const handleFileUpload = (file) => {
    setFileUploading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(progress);
      setFilePer(Math.round(progress))
    }, (error) => {
      setFileError(error)
      setFileUploading(false)
      console.log(error);
    },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setCourse({ ...course, thumbnail: downloadUrl })
          console.log(course.thumbnail);
          setFileUploading(false)
        })
      }
    )
  }


  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="md:w-[50%] sm:w-full h-screen  ">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="md:text-4xl sm:text-3xl font-bold mb-6">Create a New Course</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              name="title"
              type="text"
              value={course.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Course Title"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Course Description"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">
              Upload Thumbnail 
            </label>
            <input
              name="thumbnail"
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e)=> setFile(e.target.files[0])}
            />

            {fileError && (
              <span className='text-red-700'>
                Error Image upload (image must be less than 2 mb)
              </span>
            ) 
            }

            {
             filePer > 0 && filePer < 100 ? (
              <span className='text-green-700 font-bold'>{`Uploading ${filePer}%`}</span>
            ) : filePer === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
            ) : (
              ''
            )}

            {
              fileUploading && (
                <p>Uploading...</p>
              )
            }
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
               disabled= {fileUploading && true}
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
