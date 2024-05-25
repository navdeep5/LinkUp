// Import packages
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
        <img
            style={{ objectFit: "cover", borderRadius: "50%" }}  // Takes up the entire space and crops if necessary
            width={size}
            height={size}
            alt="user"  // Alternative text for screen readers
            src={`http://localhost:3001/assets/${image}`}  // Image source
        />
        </Box>
    );
};

export default UserImage;