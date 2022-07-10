import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropDown from "../UI/DropDown";
import classes from "./Sidebar.module.css";
import { fetchOrderData } from "../../store/order-actions";

const Sidebar = (props) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();

  const fetchOrdersHandler = () => {
    dispatch(fetchOrderData(token));
  }

  return (
    <DropDown onClose={props.onClose}>
      <div>
        <nav className={classes.sidebar}>
          <div>
            <ul className={classes.side__element}>
              <li onClick={props.onClose} className={classes.side__icon}>
                <svg className={classes.feature__icon}>
                  <use xlinkHref="img/sprite.svg#icon-cross"></use>
                </svg>
              </li>
              <li onClick={props.onClose} className={classes.side__link}>
                <Link to="/products">Products</Link>
              </li>

              {isLoggedIn && <li onClick={props.onClose} className={classes.side__link}>
                <Link to="/cart">Cart</Link>
              </li>}

              {isLoggedIn && <li onClick={props.onClose} className={classes.side__link}>
                <Link to="/realorders" onClick={fetchOrdersHandler}>My Orders</Link>
              </li>}
              {isLoggedIn && <li onClick={props.onClose} className={classes.side__link}>
                <Link to="/profile">Profile</Link>
              </li>}
              <li onClick={props.onClose} className={classes.side__link}>
                <Link to="/">About us</Link>
              </li>
              <li onClick={props.onClose} className={classes.side__link}>
                <Link to="/">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className={classes.side__footer}>
              <li>
                <p>Copyright&copy; 2022 </p>
                <p>All Rights Reserved by Bobo Store</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </DropDown>
  );
};

export default Sidebar;
