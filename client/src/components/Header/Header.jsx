import React, { useEffect, useState } from 'react';
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
        <Link to="/"  onClick={toggleNav} className="text-white font-bold text-xl gap-1 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>
Skill Sphere 

        </Link>

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
        




        <div className="md:hidden ">
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
            onClick={toggleNav}
            className="text-white   font-bold py-2 w-full hover:text-gray-300 hover:bg-gray-700 text-center  rounded-md   block md:inline-block"
          >
            Signin
          </Link>

          <Link
            to="/signup"
            onClick={toggleNav}
            className="text-white font-bold text-center py-2  w-full hover:text-gray-300 hover:bg-gray-700 block md:inline-block rounded-md"
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



