import User from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const SignUpController = async (req, res) => {
    const { username, email, password, role } = req.body

    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: "Please fill all the details" })
    }

    try {
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }

        const saltRound = 10

        const hashedPassword = await bcrypt.hash(password, saltRound)

        const newUser = await User.create({ username, email, password: hashedPassword, role })

        await newUser.save()


        return res.status(201).json({ message: "User registered", user: newUser })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error })
    }
}


export const SigninController = async (req, res) => {

    const { email, password } = req.body

    try {

        const validUser = await User.findOne({ email })

        if (!validUser) {
            return res.status(400).json({ message: "No User with this Credentials !" })
        }

        const validPassword = await bcrypt.compare(password, validUser.password)

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Credentials !" })
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)


        const userWithoutPassword = { ...validUser._doc };
        delete userWithoutPassword.password;

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: userWithoutPassword,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong !" })
    }
}