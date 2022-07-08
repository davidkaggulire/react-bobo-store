import { useSelector } from "react-redux";
import OrderForm from "../Orders/OrderForm";
import Orders from "../Orders/Orders";
import Card from "../UI/Card";
import classes from "./OrderPage.module.css";

const OrderPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

//  get total price
  const total = cartItems
    .map((item) => item.totalPrice)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="orders">
      <div className={classes.heading}>
        <h2 className={classes.order__title}>Checkout Page</h2>
      </div>
      <div className={classes.order_details}>
        <OrderForm />
        <Card>
          <h3 className={classes.cart__title}>Items to purchase</h3>
          {cartItems.length > 0 &&
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
            ))}
          <div className={classes.total}>
            <h2>Total</h2>
            <p>
              $ <span>{total}</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderPage;
