import User from "../models/userSchema.js"


export const updateUserController = async (req,res)=>{
    if (req.user.id !== req.params.id) return res.json({error : "You cannot update the User "})

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar
            }
        }, {new : true})

        const { password , ...rest} = updatedUser._doc

        res.status(200).json({ message : "User Updated"})

        console.log('User Updated');
    } catch (error) {
        console.log(error.message);
    }
}


export const getUserProfile = async (req,res)=>{
    const { userId } = req.params 

    try {
        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json({ error : "User not Found !"})
        }

        return res.status(200).json({ user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error : "Internal server error !"})
    }
}