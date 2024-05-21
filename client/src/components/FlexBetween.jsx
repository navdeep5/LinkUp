// Import packages
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({  // Create a styled component that we will reuse in our application
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export default FlexBetween;