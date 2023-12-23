import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./database/db.js"
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import lectureRoutes from "./routes/lectureRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from 'cookie-parser';
import path from "path"
import cors from "cors"


dotenv.config()
connectDb()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth',authRoutes)
app.use('/api/course',courseRoutes)
app.use('/api/lecture',lectureRoutes)
app.use('/api/user', userRoutes)

const Port = process.env.PORT 


const __dirname1 = path.resolve()

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1,"/client/build")))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"client","build","index.html"))
    })
}

else{
    app.get('/',(req,res)=>{
        res.send('API Running Successfully !')
    })
}

app.listen(Port , ()=>{
    console.log(`Server Started on Port ${Port}`);
})