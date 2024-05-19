// Import packages
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register user
export const register = async (req, res) => {
    try {
        // Create new user
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occipation,
            viewedProfile,
            impressions,
            } = req.body;

            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            const newUser = new User({
                firstName,
                lastName,
                email,
                password: passwordHash,
                picturePath,
                friends,
                location,
                occipation,
                viewedProfile: Math.floor(Math.random() * 10000),
                impressions: Math.floor(Math.random() * 10000),
            });

            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(500).json({error: err.messgage});
        } 
};

// Login user
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        const isMath = await bcrypt.compare(password, user.password);  // Compare the password the user entered with the hashed password in the database
        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);  // Create a token
        delete user.password;  // Delete the password from the user object to make sure it does not get sent anywhere
        res.status(200).json({token, user}); // Send the token and the user object to the client
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
