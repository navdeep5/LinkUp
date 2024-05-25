// Import packages
import Navbar from "scenes/navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";

const HomePage = () => {
    const isNotMobileScreen = useMediaQuery("(min-width:1000px)");
    const {_id, picturePath} = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
            <Box width="100%"
                 padding="2rem 6%"
                 display={isNotMobileScreen ? "flex" : "block"}
                 gap="0.5rem"
                 justifyContent="space-between"
            >
                <Box flexBasis={isNotMobileScreen ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>

                <Box flexBasis={isNotMobileScreen ? "42%" : undefined}
                     mt={isNotMobileScreen ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                </Box>
                {isNotMobileScreen && (
                    <Box flexBasis="26%">
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;