import { Paper } from "@mui/material";
import styled from "styled-components";

export const FilterContainer = styled(Paper)``;

export const FilterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem;
  @media screen and (max-width: 725px) {
    flex-direction: column;
    align-items: center;
  }
  @media screen and (max-width: 370px) {
    & div {
      width: 96%;
      text-align: center;
    }
  }
`;

export const RecipeHeader = styled.div<{ filterContainerHeight: string }>`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 700px;
  

  & .search-filled {
    margin-top: 1rem;
    padding: 0.5rem;
    width: 100%;
  }

  & .filters-container {
    height: 0px;
    overflow: hidden;
  }

  & .filters-enter {
    height: 0px;
    overflow: hidden;
  }
  & .filters-enter-active {
    height: ${(p) => p.filterContainerHeight};
    transition: all 0.3s ease-in-out;
  }
  & .filters-exit {
    height: ${(p) => p.filterContainerHeight};
  }
  & .filters-exit-active {
    height: 0px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  @media screen and (max-width: 720px) {
    width: 90vw;
  }
`;

export const FiltersButton = styled.button`
  cursor: pointer;
  border: 2px solid transparent;
  text-decoration: none;
  font-size: 1rem;
  color: #28a835;
  border-radius: 5px;
  background-color: transparent;
  margin-top: 10px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  &:hover {
    color: #28a835;
    border: 2px solid #28a835;
  }
`;