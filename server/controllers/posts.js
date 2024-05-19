// Import packages
import Post from "../models/Post.js";
import User from "../models/User.js";

// Create
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save(); // Save post

        const post = await Post.find(); // Get all posts so they can be returned to the FrontEnd
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
}

// Read
export const getFeedPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
} 

export const getUserPost = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
} 

// Update
export const likePost = async (req, res) => {
    try {
        const {id} = req.params; // Post ID
        const {userId} = req.body; // User ID
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId); // Check if user has liked post

        if (isLiked) {
            post.likes.delete(userId); // Unlike post by deleting it from the map (dictionary)
        } else {
            post.likes.set(userId, true); // Like post by adding it to the map (dictionary)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true} // New object
        );

        res.status(200).json(updatedPost); // Update FrontEnd
    } catch (err) {
        res.status(404).json({message: err.message});
    }
} 