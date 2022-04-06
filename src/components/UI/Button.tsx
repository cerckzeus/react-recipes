import React from "react";
import StyledButton from "../styles/Button.styled";

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<Props> = (props) => {
  return (
    <StyledButton
      className={props.className}
      variant="contained"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButton>
  );
};





export default Button;
