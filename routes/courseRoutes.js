import express from "express"
import { createCourseController, deleteCourseController, enrollCourseController, getAllCoursesController, getSingleCourseController, updateCourseController } from "../controllers/courseController.js"
import { verifyToken } from "../middleware/verifyUser.js"

const router = express.Router()


router.post('/create',verifyToken, createCourseController)
router.get('/get',verifyToken, getAllCoursesController)
router.get('/get/:courseId',verifyToken, getSingleCourseController)
router.put('/update/:courseId', verifyToken, updateCourseController )
router.delete('/delete/:courseId', verifyToken, deleteCourseController )
router.post("/:courseId/enroll", verifyToken, enrollCourseController);


export default router