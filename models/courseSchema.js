import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    thumbnail: {
        type: String,
        default: "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
      },

    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
        }
    ],

    enrolledStudents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

}) 

const Course = mongoose.model("Course", courseSchema)

export default Course