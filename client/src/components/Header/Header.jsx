import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext} from "../../context/UserContext"
import { toast } from "react-hot-toast"


const Header = () => {
  const { user , setUser} = useUserContext()

  const navigate = useNavigate()


  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };


  const handleLogout = ()=>{
    localStorage.removeItem("userInfo")
    setUser(null)
    setIsNavOpen(!isNavOpen)
    toast.success('Logout Success')
    navigate('/')
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">Skill Sphere</Link>

        {
          user ? (
        <div
        className="md:flex hidden items-center justify-center  md:space-x-4   md:flex-row "
      >
        <Link
          to="/home"
          className="text-white hover:bg-gray-700 px-4 py-2 rounded-md font-semibold hover:text-gray-300 block md:inline-block"
        >
          Home
        </Link>
        
        <Link
          to="/contact"
          className="text-white hover:bg-gray-700 px-4 py-2 rounded-md font-semibold hover:text-gray-300 block md:inline-block"
        >
          Contact
        </Link>
        
        
        <Link
          to="/profile"
          className="text-white hover:bg-gray-700 px-4 py-2 rounded-md font-semibold hover:text-gray-300 block md:inline-block"
        >
          Profile
        </Link>

     
        <button onClick={handleLogout} className="py-3 px-4 hover:bg-green-500 bg-green-600 text-white font-bold">Logout</button>

      </div>
          )  : (
            <div
          className="md:flex hidden  md:space-x-4   md:flex-row "
        >
          <Link
            to="/signin"
            className="py-3 px-4 hover:bg-green-500 bg-green-600 text-white font-bold"
          >
            Signin
          </Link>
        </div>
          )
        }
        




        <div className="md:hidden">
          {/* Hamburger Icon for Mobile */}
          <button onClick={toggleNav} className="text-white fixe focus:outline-none">
           

            {
              isNavOpen ? (
                <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              ) : (
                 <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
              )
            }
            
          </button>
        </div>
      </div>


{/* Mobile Nav */}
     {
      isNavOpen && (
        <>

        {
          user ? (
            <div
            className={`md:hidden  mt-5 flex  flex-col items-center gap-7 `}
          >
            <Link
              to="/"
              className="text-white  hover:bg-gray-700 w-full font-semibold text-center py-2 rounded-md hover:text-gray-300 block md:inline-block"
              onClick={toggleNav}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-white hover:bg-gray-700 w-full font-semibold text-center py-2 rounded-md hover:text-gray-300 block md:inline-block"
              onClick={toggleNav}
            >
              Contact
            </Link>

            <Link
              to="/profile"
              className="text-white hover:bg-gray-700 w-full font-semibold text-center py-2 rounded-md hover:text-gray-300 block md:inline-block"
              onClick={toggleNav}
            >
              Profile
            </Link>
            <button onClick={handleLogout} className="py-3 px-4 hover:bg-green-500 bg-green-600 text-white font-bold">Logout</button>
          </div>
          ) : (
            <div
          className={`md:hidden mt-5 flex  flex-col items-center gap-7  `}
        >
           <Link
            to="/signin"
            className="text-white  py-2 w-full hover:text-gray-300 hover:bg-gray-700 text-center  rounded-md   block md:inline-block"
          >
            Signin
          </Link>

          <Link
            to="/signup"
            className="text-white text-center py-2  w-full hover:text-gray-300 hover:bg-gray-700 block md:inline-block rounded-md"
          >
            Signup
          </Link>
        </div>
          )
        }
        
        </>
       
      )
     }
      
    </nav>
  );
};

export default Header;
