import express from "express"
import { addLectureController, createLectureController, deleteLectureFromCourse, getAllLecturesController, updateLectureController } from "../controllers/lectureController.js"
import { verifyToken } from "../middleware/verifyUser.js"
const router = express.Router()

router.post('/create',verifyToken, createLectureController)
router.post('/add/:courseId',verifyToken, addLectureController)
router.get("/get/:courseId", verifyToken, getAllLecturesController);
router.delete('/delete/:courseId/:lectureId',verifyToken, deleteLectureFromCourse);
router.put('/update/:courseId/:lectureId',verifyToken, updateLectureController);


export default router