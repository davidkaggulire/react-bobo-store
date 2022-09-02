import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginActions } from "../../store/loginSlice";

import classes from "./Navigation.module.css";
import Sidebar from "./Sidebar";
import { fetchOrderData } from "../../store/order-actions";
import { MdMenu, MdPowerSettingsNew } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayMenu, setDisplayMenu] = useState(false);
  const name = useSelector((state) => state.login.displayName);

  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const token = useSelector((state) => state.login.token);

  const fetchOrdersHandler = () => {
    dispatch(fetchOrderData(token));
  };

  const logoutHandler = () => {
    // send request to logout user
    dispatch(
      loginActions.logout({
        isLoggedIn: false,
        token: null,
        expirationTime: null,
        remainingTime: null,
        email: null,
        displayName: null,
      })
    );

    navigate("../", { replace: true });
  };

  const viewMenuHandler = () => {
    setDisplayMenu((prevState) => !prevState);
  };

  const hideMenuHandler = () => {
    setDisplayMenu(false);
  };

  return (
    <header className={classes.main_nav}>
      {displayMenu && <Sidebar onClose={hideMenuHandler} />}
      <nav>
        <ul className={classes.nav_element}>
          <div className={classes.nav_logo}>
            <button className={classes.icon__btn} onClick={viewMenuHandler}>
              {/* <svg className={classes.feature__icon}>
                <use xlinkHref="img/sprite.svg#icon-menu"></use>
              </svg> */}
              <MdMenu className={classes.feature__icon} />
            </button>
            <li className={classes.logo}>
              <Link to="/">Bobo</Link>
            </li>
          </div>
          <div className={classes.nav_menus}>
            <li className={classes.menu}>
              <Link to="/products">Products</Link>
            </li>

            {isLoggedIn && (
              <li className={classes.menu}>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className={classes.menu}>
                <Link to="/realorders" onClick={fetchOrdersHandler} >
                  Orders
                </Link>
              </li>
            )}
          </div>
          <div className={classes.nav_buttons}>
            {isLoggedIn && (
              <li className={classes.menu}>{name.split(" ")[0]}</li>
            )}
            {!isLoggedIn && (
              <li className={classes.menu}>
                <Link to="/login">Login</Link>
              </li>
            )}

            <li className={classes.cart_link}>
              <Link to="/cart" className={classes.cart__menu}>
                <span className={classes.badge__icon}>{cartQuantity}</span>
                <BsCart2 className={classes.cart__icon}/>
              </Link>
            </li>

            {isLoggedIn && (
              <li className={classes.menu}>
                <button className={classes.logoutbtn} onClick={logoutHandler}>
                  <MdPowerSettingsNew
                    className={classes.feature__icon_switch}
                  />
                  {/* <svg className={classes.feature__icon_switch}>
                    <use xlinkHref="img/sprite.svg#icon-switch"></use>
                  </svg> */}
                </button>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
