import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      },
      role: {
        type: String,
        enum: ['instructor', 'student'],
        default: 'student',
      },

      enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }],
})


const User = mongoose.model("User",userSchema)


export default User