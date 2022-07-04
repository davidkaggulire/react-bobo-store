import { useSelector } from "react-redux";
// import Orders from "../Orders/Orders";
import Card from "../UI/Card";
import classes from "./PaymentConfirmPage.module.css";

const PaymentConfirmPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  //  get total price
  const total = cartItems
    .map((item) => item.totalPrice)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div className={classes.receipt_section}>
      <Card>
        <p>Payment Confirmed</p>
        <p>Order received</p>
        <h3>Items purchased</h3>
        {/* {cartItems.length > 0 &&
          cartItems.map((item) => (
            <Orders
              key={item.id}
              id={item.id}
              title={item.name}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              description={item.description}
              totalPrice={item.totalPrice}
            />
          ))} */}
        <div className={classes.total}>
          <h3>Total</h3>
          <p>
            $ <span>{total}</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PaymentConfirmPage;
