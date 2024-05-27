// Import packages
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);  // Get posts from state
    const token = useSelector((state) => state.token);

    const getPosts = async () => {  // Get all posts
        const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {  // Get user's posts for their profile page
        const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,  // API call
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {  // If user is viewing their profile
        getUserPosts();
        } else {          // If user is not viewing their profile -- homepage
        getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        {posts.map(  // Create component for each post
            ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
            }) => (
            <PostWidget  // Pass in post data
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
            />
            )
        )}
        </>
    );
};

export default PostsWidget;