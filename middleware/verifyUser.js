import jwt from "jsonwebtoken"
import User from "../models/userSchema.js";
import dotenv from 'dotenv';


export const verifyToken = async (req, res, next) => {
   
    try {
        const { authorization } = req.headers;

        // console.log("Authorization : ", authorization);

        if (!authorization) {
            return res.status(401).json({ err: "You must be logged in! Token not given" });
        }

        const token = authorization.replace("Bearer ", "");

        // console.log("Token : ", token);

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
    
        // console.log("Decoded Token : ", decodedToken);

        // Find the user and attach it to the request object
        const user = await User.findById(decodedToken.id);


        if (!user) {
            return res.status(401).send({ err: "User not found" });
        }

        req.user = user; // Attach user object to req

        next(); 
    } catch (err) {
        console.error(err.message);
        return res.status(401).send({ err: "Invalid token" });
    }

}


 // const token = req.cookies.access_token;

    // if (!token) return res.json({ error : "User not Authorized "})

    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err) return res.json({ error : "Forbidden "})
    //     req.user = user;
    //     next();
    // })

