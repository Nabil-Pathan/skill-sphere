import express from "express"
import { addLectureController, createLectureController, getAllLecturesController } from "../controllers/lectureController.js"
import { verifyToken } from "../middleware/verifyUser.js"
const router = express.Router()

router.post('/create',verifyToken, createLectureController)
router.post('/add/:courseId',verifyToken, addLectureController)
router.get("/get/:courseId", verifyToken, getAllLecturesController);

export default router