import React from 'react'
import { BrowserRouter , Routes , Route} from "react-router-dom"
import LandingPage from "./pages/LandingPage/LandingPage"
import SigninPage from "./pages/SigninPage/SigninPage"
import SignupPage from "./pages/SignupPage/SignupPage"
import HomePage from "./pages/HomePage/HomePage"
import ContactPage from "./pages/ContactPage/ContactPage"
import ProfilePage from './pages/ProfilePage/ProfilePage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Toaster } from 'react-hot-toast'
import CreateCoursePage from './pages/CreateCoursePage/CreateCoursePage'
import CourseDetailsPage from "./pages/CourseDetailsPage/CourseDetailsPage"
import AddLecturesPage from './pages/AddLecturesPage/AddLecturesPage'
import SingleCoursePage from './pages/SingleCoursePage/SingleCoursePage'
import PublicRoute from './components/Routes/PublicRoute'
import PrivateRoute from './components/Routes/PrivateRoute'
import MyLearning from './pages/MyLearning/MyLearning'


const App = () => {
  return (
    <>
 <Toaster
        position="top-center"
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#4aed88',
            },
          },
        }}
      ></Toaster>
      <Header/>
     <Routes>
        <Route  path='/' element={<PublicRoute element={<LandingPage/>}/>}/>
        <Route  path='/signup' element={<PublicRoute element={<SignupPage/>}/>}/>
        <Route  path='/signin' element={<PublicRoute element={<SigninPage/>}/>}/>
        <Route  path='/home' element={<PrivateRoute element={<HomePage/>}/>}/>
        <Route  path='/contact' element={<PrivateRoute element={<ContactPage/>}/>}/>
        <Route path='/profile' element={<PrivateRoute element={<ProfilePage/>}/>}/>
        <Route path='/my-learning' element={<PrivateRoute element={<MyLearning/>}/>}/>
        <Route path='/create-course' element={<PrivateRoute element={<CreateCoursePage/>}/>} />
        <Route path='/course-details/:id' element={<PrivateRoute element={<CourseDetailsPage/>}/>} />
        <Route path='/add-lectures/:id' element={<PrivateRoute element={<AddLecturesPage/>}/>} />
        <Route path='/course/:id' element={<PrivateRoute element={<SingleCoursePage/>}/>} />
     </Routes>
        <Footer/>
    </>
  )
}

export default App