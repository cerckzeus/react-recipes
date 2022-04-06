import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";


const StyledButton = styled(Button)<ButtonProps>(() => ({
  disabled: "false",
  fontFamily: "Sora",
  color: "#fff",
  backgroundColor: "#28a835",
  "&:hover": {
    backgroundColor: "#2b7c33",
  },
}));

export default StyledButton;
