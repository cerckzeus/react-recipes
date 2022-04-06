
import styled from "styled-components";


export const LoadingSpinner: React.FC<{ className?: string }> = (props) => {
  return (
    <StyledLoadingSpinner className={props.className}></StyledLoadingSpinner>
  );
};


const StyledLoadingSpinner = styled.div`
  & {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #15cdfc;
    border-color: #15cdfc transparent #15cdfc transparent;
    animation: spinner 1.2s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledMarketSpinner = styled.div`
  z-index: 5 !important;
  position: fixed;
  top: 50%;
  margin: 0 auto;
  width: 80px;
  height: 80px;

  & div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: rgba(80,80,80,0.7);
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  & div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  & div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  & div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;

