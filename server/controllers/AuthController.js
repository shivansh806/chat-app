import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import { compare } from "bcrypt"
import { renameSync, unlinkSync } from "fs"

const maxAge = 3 * 24 * 60 * 60 // 3 days in seconds

const createToken = (userId) =>{
    return jwt.sign({ id: userId }, process.env.JWT_KEY, {
        expiresIn: maxAge,
    })
}

export const signup = async (req, res, next) => {
    try{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).send("Email and password are required")
    }
    const user = await User.create({email, password})

    res.cookie("jwt", createToken(email, user.id), {
        maxAge: maxAge,
        sameSite: "none",
        secure: true
    })

    return res.status(201).json({
    user: {
        id: user.id,
        email:user.email,
        profileSetup: user.profileSetup
    }})

    }catch(error){
        console.log({error})
        return res.status(500).send("Internal server error")
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid email or password");
        }

        // Generate JWT token
        const token = createToken(user.id);

        // Set JWT token as an HTTP-only cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // Convert seconds to milliseconds
            sameSite: "strict", // Use "strict" for CSRF protection
            secure: process.env.NODE_ENV === "production", // Only secure cookies in production
        });

        // Return user details (exclude sensitive data like password)
        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send("Internal server error");
    }
};


export const getUserInfo = async (req, res, next) => {
    try { 
        console.log("User ID from Middleware:", req.userId); // Debug log

        // Fetch user data from the database using userId
        const userData = await User.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user data
        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        });

    } catch (error) {
        console.error("Error in getUserInfo:", error); // Debug log
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateProfile = async (req, res, next) => {
    try { 
        console.log("Request Body:", req.body); // Debug log
        console.log("User ID in Request:", req.userId); // Debug log

        const { userId } = req;
        const { firstName, lastName, color } = req.body;

        // Validate required fields
        if (!firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Update user in the database
        const userData = await User.findByIdAndUpdate(
            userId, 
            { firstName, lastName, color, profileSetup: true },
            { new: true, runValidators: true }
        );

        // Check if user exists
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with updated user data
        return res.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        });

    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const addProfileImage = async (req, res, next) => {
    try { 
        if(!req.file){
            return res.status(400).json('File is required');
        }

        const data = Date.now();
        let fileName = "uploads/profile/" + data + req.file.originalname;
        renameSync(req.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { image: fileName},
            { new: true, runValidators: true }
        )

        

        // Respond with updated user data
        return res.status(200).json({
            image: updatedUser.image,
        });

    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



export const removeProfileImage = async (req, res, next) => {
    try { 
        console.log("Request Body:", req.body); // Debug log
        console.log("User ID in Request:", req.userId); // Debug log

        const { userId } = req;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("User not found");
        }

        if(user.image){
            unlinkSync(user.image);
        }

        user.image = null;
        await user.save();

        return res.status(200).send("Profile Image removed successfully");

    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const logout = async (req, res, next) => {
    try { 
        res.cookie("jwt", "", {
            maxAge: 1,
            sameSite: "None",
            secure: true
        });
        return res.status(200).json("User logged out successfully");

    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};