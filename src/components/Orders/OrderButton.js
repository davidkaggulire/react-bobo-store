import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./OrderButton.module.css";

const OrderButton = (props) => {
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const navigate = useNavigate();
    const orderHandler = (event) => {
        event.preventDefault();

        if(!isLoggedIn){
            navigate("../auth", { replace: true });
        }
        else {
            navigate("../orders", { replace: true });
        }

    }

    return (
        <button className={classes.order_button} onClick={orderHandler}>
          Checkout
        </button>
      );
}

export default OrderButton;