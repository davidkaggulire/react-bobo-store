import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import OrderButton from "../Orders/OrderButton";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();

  const linkToProduct = () => {
    navigate("../products", true)
  }

  return (
    <div className={classes.cartpage}>
      <div className={classes.heading}>
        <h2 className={classes.title}>Shopping Cart</h2>
        {cartItems.length > 0 && <OrderButton />}
      </div>

      {cartItems.length === 0 && (
        <div>
          <p className={classes.empty}>No products added to cart</p>
          <button className={classes.back} onClick={linkToProduct}>Back to Products</button>
        </div>
      )}

      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            title={item.name}
            image={item.image}
            price={item.price}
            quantity={item.quantity}
            description={item.description}
            totalPrice={item.totalPrice}
          />
        ))}
    </div>
  );
};

export default Cart;
