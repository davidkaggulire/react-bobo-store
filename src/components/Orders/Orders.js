import classes from "./Orders.module.css";

const Orders = (props) => {
  const { id, price, title, quantity, image, totalPrice } = props;
  return (
    <div className={classes.cart_item}>
      <img src={image} alt="cart item" />
      <div className={classes.details}>
        <h2 className={classes.title}>{title}</h2>
        <p>
          Quantity: <span>{quantity}</span>
        </p>
        <p>
          Price: <span>{price}</span>
        </p>
      </div>
      <div className={classes.cart__totalprice}>
        <p>
          Total Price: <span>{totalPrice}</span>
        </p>
      </div>
    </div>
  );
};

export default Orders;
