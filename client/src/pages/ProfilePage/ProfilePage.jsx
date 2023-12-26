import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { useUserContext } from '../../context/UserContext'
import { toast } from "react-hot-toast"
import { app } from "../../firebase"
import axios from "axios"
import Loader from "../../components/Loader/Loader"


const ProfilePage = () => {

  const { user } = useUserContext()
  const fileRef = useRef(null)
  


  const [file , setFile] = useState(undefined)
  const [filePer , setFilePer] = useState(0)
  const [ fileError , setFileError] = useState(false)
  const [formData , setFormData] = useState({})
  const [loading , setLoading] = useState(false)

  const [ userProfile , setUserProfile] = useState()


  const getUserProfile = async ()=>{
    try {
      setLoading(true)
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`/api/user/profile/${user.user._id}`,config)
      setUserProfile(data.user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try {      
      setLoading(true)
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post(`/api/user/update/${user.user._id}`,formData, config)
      toast.success('Profile Updated')
      setLoading(false)
    } catch (error) {
       toast.error(error.message)
       console.log(error.message);
       setLoading(false)
    }
  }

  useEffect(()=>{

    if(user){
      getUserProfile()
    }
    if(file){
        handleFileUpload(file)
    }

  },[file , user])

  const handleFileUpload = (file)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const stogareRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(stogareRef , file)

    uploadTask.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setFilePer(Math.round(progress))
    }, (error)=>{
      setFileError(true)
      console.log(error);
    },  ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
        setFormData({...formData , avatar : downloadUrl})
      })
   })

   
  }


  const handleChange = async (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <>
    {
      loading ? (<Loader/>) : (
        userProfile && (
          <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-center text-3xl font-bold">{userProfile.username}</h1>
        <form 
        onSubmit={handleSubmit}
         className='flex flex-col gap-4'>
    
          <input 
          onChange={(e)=> setFile(e.target.files[0])} 
          type="file" 
          ref={fileRef} 
          hidden accept='image/*'/>
  
          <img
          onClick={()=> fileRef.current.click()}
            src={formData.avatar || userProfile.avatar}
            alt='profile'
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />
           <p className='text-sm self-center'>
            {fileError ? (
              <span className='text-red-700'>
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePer > 0 && filePer < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePer}%`}</span>
            ) : filePer === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
            ) : (
              ''
            )}
          </p>
          <input
            type='text'
            placeholder='username'
            defaultValue={userProfile.username}
            id='username'
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='email'
            id='email'
            defaultValue={userProfile.email}
            className='border p-3 rounded-lg'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='password'
            onChange={handleChange}
            id='password'
            className='border p-3 rounded-lg'
          />
          <button
            className='bg-slate-700 font-semibold text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
          >
            Update
          </button>
         

          
         
        </form>
  
  
        <div className="">
          <div className='flex justify-between mt-5'>
          {
             userProfile.role === "instructor" && (
                  <Link
                  className='bg-green-600 font-semibold text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
                  to={'/create-course'}
                >
                  Create Course
                </Link>
              )
          }
          
           <Link to='/my-learning'>
           <button className="bg-gray-800 text-white hover:bg-gray-700 font-semibold rounded-md  px-4 py-3">
            My Learning
          </button>
           </Link>
          </div>
        </div>
  
      
      </div>
        )
      )
    }
    </>
    
  )
}

export default ProfilePage