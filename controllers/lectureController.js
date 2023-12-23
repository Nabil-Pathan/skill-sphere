import Lecture from "../models/lectureSchema.js"
import User from "../models/userSchema.js";
import Course from "../models/courseSchema.js";

export const createLectureController = async (req, res) => {
    try {
        const { title, description, videoUrl } = req.body

        if (!title || !description || !videoUrl) {
            return res.status(400).json({ error: "Please provide all the required details" });
        }


        const newLecture = await Lecture.create({ title, description, videoUrl })

        return res.status(201).json({ message: "Lecture created successfully", lecture: newLecture });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const addLectureController = async (req, res) => {
    try {
        const { courseId } = req.params

        const { title, description, videoUrl } = req.body

        if (!courseId || !title || !description || !videoUrl) {
            return res.status(400).json({ error: "Please provide all the required details" });
        }

        const requestingUser = await User.findById(req.user.id)

        if (!requestingUser || requestingUser.role !== "instructor") {
            return res.status(403).json({ error: "Permission denied" });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ error: "Permission denied - You are not the instructor of this course" });
        }

        const newLecture = await Lecture.create({
            title,
            description,
            videoUrl
        })

        course.lectures.push(newLecture._id)
        await course.save()

        return res.status(201).json({ message: "Lecture added successfully", lecture: newLecture });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getAllLecturesController = async (req, res) => {
    try {
        const { courseId } = req.params


        if (!courseId) {
            return res.status(400).json({ error: "Please provide the course ID" });
        }

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const requestingUser = await User.findById(req.user.id)

        if(!requestingUser){
            return res.status(404).json({ error: "User not found" });
        }

        if(course.instructor.toString() !== req.user.id &&!course.enrolledStudents.includes(req.user.id)){
            return res.status(403).json({ error: "Permission denied - You are not the creator or an enrolled student of this course" });
        }

        const lectures = await Lecture.find({_id : { $in : course.lectures}})

        return res.status(200).json({ message: "Lectures fetched successfully", lectures });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

