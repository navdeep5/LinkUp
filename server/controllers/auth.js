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