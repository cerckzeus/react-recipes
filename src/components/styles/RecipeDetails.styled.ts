import { Paper } from "@mui/material";
import styled from "styled-components";

export const RecipeDetailsWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  text-align: center;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;
  & .export-actions {
    display: flex;
    padding: 1rem;
    button {
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 0 1rem;
      padding: 0.5rem;
      background-color: #e60000;
      color: #fff;
      :hover {
        background-color: #c40404;
      }
    }
    a {
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
      border-radius: 5px;
      cursor: pointer;
      margin: 0 1rem;
      padding: 0.5rem;
      background-color: #01b336;
      color: #fff;
      text-decoration: none;
      :hover {
        background-color: #02912d;
      }
    }
  }
`;

export const RecipeDetailsContent = styled(Paper)`
  margin-top: 2rem;
  width: 70vw;
  padding: 1rem;
  & h1 {
    margin-bottom: 1rem;
  }

  & .nav {
    display: flex;
    justify-content: space-between;
    a {
      color: #000;
      :hover {
        color: #2c2c2c;
      }
    }
  }

  & .head-content {
    display: flex;
    flex-direction: row;
    div {
      padding: 1rem;
    }
  }

  & .recipe-details {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;

    .col {
      flex: 1;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      strong {
        font-size: 2rem;
      }
      h2 {
        margin-top: 2rem;
      }
      p {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .instructions {
        margin-top: 3rem;
        span {
          font-size: 1.5rem;
        }
        div {
          margin-top: 1.5rem;
        }
        a {
          text-decoration: none;
        }
      }
      .nutrients {
        width: 100%;
        margin: 5px 0;
        display: flex;
        justify-content: space-between;
        span:nth-child(2) {
          font-weight: bold;
        }
      }
    }
    .ingredient {
      width: 100%;
      margin: 10px 0;
      padding-left: 5px;
      display: flex;
      flex-direction: column;
      text-align: start;
    }
  }

  @media screen and (max-width: 780px) {
    width: 95vw;
  }
  @media screen and (max-width: 570px) {
    font-size: 0.8rem;
    .head-content {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 410px) {
    font-size: 0.6rem;
    .head-content {
      flex-direction: column;
    }
    .recipe-details {
      flex-direction: column;
    }
  }
`;
