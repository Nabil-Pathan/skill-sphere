import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useUserContext } from '../../context/UserContext'
import { toast } from "react-hot-toast"
import { app } from "../../firebase"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const AddLecturesPage = () => {

  const user = useUserContext()

  const params = useParams()

  const [lecture, setLecture] = useState({
    title: '',
    description: '',
    videoUrl: '',
  });

  const [ file , setFile] = useState(undefined)
  const [filePer, setFilePer] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [ fileUploading , setFileUploading] = useState(false)



  const handleChange = (e) => {
    setLecture({ ...lecture, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    
    try {
      const config = {
        headers:{
          Authorization: `Bearer ${user.user.token}`
        }
      }

        const { data } = await axios.post(`/api/lecture/add/${params.id}`,lecture, config)   
        console.log(data); 
        setLecture({
            title: '',
            description: '',
            videoUrl: ''
        })
        setFile(undefined)
        toast.success('Lecture Added')
    } catch (error) {
        console.log(error.message);
    }
  };

  const handleFileUpload = (file)=>{

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
            setLecture({ ...lecture, videoUrl: downloadUrl })
            setFileUploading(false)
          })
        }
      )
  }


  useEffect(()=>{
    if(file){
        handleFileUpload(file)
    }
  },[file])
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="md:w-[50%] sm:w-full h-screen">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="md:text-4xl sm:text-3xl font-bold mb-6">Add Lectures to Your Course</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Lecture Title
            </label>
            <input
              name="title"
              type="text"
              value={lecture.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Lecture Title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Lecture Description
            </label>
            <textarea
              name="description"
              value={lecture.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Lecture Description"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="videoUrl" className="block text-gray-700 text-sm font-bold mb-2">
              Upload Video 
            </label>
            <input
              name="videoUrl"
              type="file"
              onChange={(e)=> setFile(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Video URL"
            />
          </div>

          {
                fileUploading && (
                    <p className='text-xl font-bold'>Uploading...</p>
                )
            }
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Lecture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLecturesPage;




