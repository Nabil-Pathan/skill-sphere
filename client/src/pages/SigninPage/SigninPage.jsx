import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const SigninPage = () => {

  const navigate = useNavigate()


  const { setUser } = useUserContext()

  const [ formData , setFormData ] = useState({
    email: '',
    password: ''
  })


  const  handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      const { data } = await axios.post('/api/auth/signin', formData)
      localStorage.setItem("userInfo", JSON.stringify (data))
      setUser(data.user)
      navigate('/home')
      toast.success('Login Success')
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div className="h-screen flex  flex-col md:flex-row">
     
      
       {/* Signin Form */}
       <div className="flex-1  p-8">
        <div className="flex flex-col justify-center items-center h-full ">
          <h2 className="text-3xl font-bold mb-4">Sign in</h2>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e)=> setFormData({ ...formData , email : e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e)=> setFormData({...formData , password : e.target.value})}
              />
            </div>
            <button
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Signin
            </button>
            <div className="mt-4">
            <p>Don't  have an account ? <Link to="/signup" className="underline text-blue-600">Signup</Link> </p>
            </div>
          </form>
        </div>
      </div>

      
      {/* Signin Image */}
      <div className="flex-1 w-full  ">
            <img
              className="w-full h-full  object-cover"
              src="https://cdn.pixabay.com/photo/2018/09/04/10/27/never-stop-learning-3653430_960_720.jpg"
              alt=""
            />
      </div>

    </div>
  );
};

export default SigninPage;
