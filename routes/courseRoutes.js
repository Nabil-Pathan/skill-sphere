import express from "express"
import { createCourseController, deleteCourseController, enrollCourseController, getAllCoursesController, getEnrolledCourses, getSingleCourseController, searchCoursesController, updateCourseController } from "../controllers/courseController.js"
import { verifyToken } from "../middleware/verifyUser.js"

const router = express.Router()


router.post('/create',verifyToken, createCourseController)
router.get('/get',verifyToken, getAllCoursesController)
router.get('/search',verifyToken, searchCoursesController)
router.get('/get-enrolledcourses',verifyToken, getEnrolledCourses)
router.get('/get/:courseId',verifyToken, getSingleCourseController)
router.put('/update/:courseId', verifyToken, updateCourseController )
router.delete('/delete/:courseId', verifyToken, deleteCourseController )
router.post("/:courseId/enroll", verifyToken, enrollCourseController);


export default router