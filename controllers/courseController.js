import Course from "../models/courseSchema.js"
import User from "../models/userSchema.js"


export const createCourseController = async (req, res) => {
    try {
        const { title, description, instructor, thumbnail, lectures } = req.body;

        if (!title || !description || !instructor) {
            return res.status(400).json({ error: "Please provide all the required details" });
        }


        const requestingUser = await User.findById(req.user.id);

        if (!requestingUser || requestingUser.role !== "instructor") {
            return res.status(403).json({ error: "Permission denied" });
        }

        const newCourse = await Course.create({
            title,
            description,
            instructor,
            thumbnail,
            lectures
        });


        return res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getAllCoursesController = async (req, res) => {
    try {
        const courses = await Course.find({})
        return res.status(200).json({ courses })
    } catch (error) {
        console.log(error);
    }
}


export const updateCourseController = async (req, res) => {
    try {
        const { courseId } = req.params
        const { title, description, lectures } = req.body

        if (!courseId || !title || !description ) {
            return res.status(400).json({ error: "Please provide all the required details" });
        }

        const requestingUser = await User.findById(req.user.id)

        if (!requestingUser || requestingUser.role !== "instructor") {
            return res.status(403).json({ error: "Permission denied" });
        }


        const course = await Course.findById(courseId)


        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ error: "Permission denied - You are not the instructor of this course" });
        }


        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            title, description, lectures
        }, { new: true, runValidators: true })

        return res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const deleteCourseController = async (req, res) => {
    try {
        const { courseId } = req.params

        const requestingUser = await User.findById(req.user.id)

        if (!requestingUser || requestingUser.role !== "instructor") {
            return res.status(403).json({ error: "Permission denied" });
        }

        const course = await Course.findById(courseId)


        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({ message: "Course Deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const enrollCourseController = async (req, res) => {

    try {
        const { courseId } = req.params

        if (!courseId) {
            return res.status(400).json({ error: "Please provide the course ID" });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (course.enrolledStudents.includes(req.user._id)) {
            return res.status(400).json({ error: "User is already enrolled in this course" });
        }

        course.enrolledStudents.push(req.user._id)
        user.enrolledCourses.push(courseId)
        await course.save()
        await user.save()

        return res.status(200).json({ message: "Enrollment successful", course: course });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const getSingleCourseController = async (req, res) => {
    try {
        const { courseId } = req.params

        if (!courseId) {
            return res.status(400).json({ error: "Please provide the course ID" });
        }

        const course = await Course.findById(courseId).populate("lectures")

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        return res.json({ course }).status(200)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}


export const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user._id

        if (!userId) {
            return res.json({ error: "User Id not Provided " }).status(400)
        }

        const user = await User.findById(userId).populate('enrolledCourses')

        if (!user) {
            return res.json({ error: "User not Found " }).status(400)
        }

        return res.json({ courses: user.enrolledCourses }).status(200)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}


export const searchCoursesController = async (req, res) => {
    try {
        const { searchQuery, sortBy } = req.query;

        let sortOptions = {}

        if (sortBy == "date") {
            sortOptions = { createdAt: -1 }
        }

        const searchCriteria = {
            $or: [
                { title: { $regex: searchQuery || '', $options: 'i' } },
                { description: { $regex: searchQuery || '', $options: 'i' } },
            ]
        }

        const courses = await Course.find(searchCriteria)
            .sort(sortOptions)
            .exec()

        return res.json({ courses })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const unEnrollCourseController = async (req, res) => {

    try {
        const { courseId } = req.params

        if (!courseId) {
            return res.status(400).json({ error: "Please provide the course ID" });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!course.enrolledStudents.includes(req.user._id)) {
            return res.status(400).json({ error: "User is not enrolled in this course" });
        }

        course.enrolledStudents = course.enrolledStudents.filter((id)=> id.toString() !== req.user._id.toString())
        user.enrolledCourses = user.enrolledCourses.filter((id) => id.toString() !== courseId.toString() )

        await course.save()
        await user.save()

        return res.status(200).json({ message: "UnEnrollment successful", course: course });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const getAllCoursesByUser = async (req,res)=>{
    try {
        const userId = req.user._id

        const courses = await Course.find({ instructor : userId})

        res.status(200).json({courses})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}