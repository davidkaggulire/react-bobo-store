import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { id, price, title, quantity, description, image, totalPrice } = props;
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        price,
        title,
      })
    );
  };

  const removeItemFromCart = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <section className={classes.shopping}>
      <div className={classes.cart_item}>
        <img src={image} alt="cart item" />
        <div className={classes.details}>
          <h2>{title}</h2>
          <p className={classes.description}>{description}</p>
          <p className={classes.quantity}>
            Quantity: <span>{quantity}</span>
          </p>
          <div className={classes.actions}>
            <button onClick={addItemToCartHandler} className={classes.addbtn}>
              Add To Cart
            </button>
            <span className={classes.btnspan}></span>
            <button onClick={removeItemFromCart} className={classes.deletebtn}>
              Delete
            </button>
          </div>
        </div>
        <p className={classes.price}>
          Price: <span>{totalPrice}</span>
        </p>
      </div>
    </section>
  );
};

export default CartItem;
