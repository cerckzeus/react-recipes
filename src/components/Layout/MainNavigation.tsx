import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectAuth } from "../../store";
import { authActions, logOutAction } from "../../store/auth-slice";
import {
  Bars,
  Nav,
  NavBtn,
  NavLink,
  NavMenu
} from "../styles/NavbarElements.styled";
import Button from "../UI/Button";

const MainNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectAuth);

  const logoutHandler = () => {
    dispatch(logOutAction());
    dispatch(authActions.logout());
    history.push("/sign-in");
  };

  const signinHandler = () => {
    history.push("/sign-in");
  };
  return (
    <Nav>
      <NavLink to="/">REACT RECIPES</NavLink>
      <Bars />
      {isLoggedIn && (
        <NavMenu>
          <NavLink to="/" exact>
            Recipes
          </NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
        </NavMenu>
      )}
      <NavBtn>
        {!isLoggedIn && <Button onClick={signinHandler}>Sign In</Button>}
        {isLoggedIn && <Button onClick={logoutHandler}>Log out</Button>}
      </NavBtn>
    </Nav>
  );
};

export default MainNavigation;
