import React, { Fragment } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";

const Layout: React.FC = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <Page>
        <StyledMain>{props.children}</StyledMain>
        <Footer />
      </Page>
    </Fragment>
  );
};

const Page = styled.div`
  margin-top: 79px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #e6e6e6;
`;

const StyledMain = styled.main`
  display: flex;
  flex: 1;
  height: 100vh;
`;

export default Layout;
