// Import packages
import User from "../models/User.js";

// Read
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

// Read
export const getUserFriends = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      // Make multiple API calls to the databse
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

// Updaate
export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id); // Grab current user
        const friend = await User.findById(friendId); // Grab friend

        // Check if friend is already a friend
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId); // Remove friend
            friend.friends = friend.friends.filter((id) => id !== id); // Remove user
        } else {
            user.friends.push(friendId); // Add friend
            friend.friends.push(id); // Add user
        }

        await user.save(); // Save user
        await friend.save(); // Save friend

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );

        res.status(200).json(formattedFriends); // Send back updated friends to the FrontEnd
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};