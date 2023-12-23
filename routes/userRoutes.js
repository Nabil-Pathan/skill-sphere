import express from "express"
import { verifyToken } from "../middleware/verifyUser.js"
import { getUserProfile, updateUserController } from "../controllers/userController.js"



const router = express.Router()

router.post('/update/:id',verifyToken, updateUserController)
router.get('/profile/:userId',verifyToken,getUserProfile)

export default router

