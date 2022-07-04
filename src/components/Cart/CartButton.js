import classes from "./CartButton.module.css";

const CartButton = (props) => {
  return (
    <button className={classes.cart_button} onClick={props.onClick}>
      Add to Cart
    </button>
  );
};

export default CartButton;
