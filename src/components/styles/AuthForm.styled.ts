import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAuthForm = styled(Box)<BoxProps>(() => ({
  width: "100vw",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundImage: "url('/images/hero_bg.jpg')",
  flex: "1",
  display: "flex",
  alignItems: "center",
  fontFamily: "Sora",
  padding: "1rem",
  ".MuiPaper-root": {
    maxWidth: "25rem",
    minHeight: "58vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: "2rem",
  },
  "& form": {
    textAlign: "center",
    ".MuiBox-root": {
    },
    ".action": {
      marginTop: "40px"
    }
  },
  "& h1": {
    textAlign: "center",
    marginBottom:"30px",
    fontSize: "3rem",
    color: "#15cdfc"
  },
  "& .toggle": {
    cursor: "pointer",
    margin: "10px 0",
    fontSize: "12px",
    color: "#1c1c1c",
  },
  "& .toggle:hover": {
    color: "#7e7e7e",
    textDecoration: "underline",
  },
}));

export default StyledAuthForm;