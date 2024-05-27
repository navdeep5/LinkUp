// Import packages
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {  // Define the functions that can modify the state
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; // Toggle between light and dark mode
        },

        setLogin: (state, action) => {
            state.user = action.payload.user; // Set the user parameter to the user object
            state.token = action.payload.token; // Set the token parameter to the token object
        },

        setLogout: (state) => {
            state.user = null; // Set the user parameter to null when logging out
            state.token = null; // Set the token parameter to null when logging out
        },

        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends; // Set the friends parameter to the friends object
            } else {
                console.error("User friends non-existent :(")
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts; // Set the posts parameter to the posts object
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post; // Update the post object
                } 
                return post;
            });
            state.posts = updatedPosts;
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;