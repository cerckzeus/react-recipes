import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  z-index: 10 !important;
  background: #000;
  height: 85px;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;

  overflow-x: hidden;
  padding: 0.5rem calc((100vw-1000px) / 2);
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #28a835;
  }
  &:hover {
    color: #28a835;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;