import { useSelector } from "react-redux";
import RealOrders from "../Orders/RealOrders";
import classes from './RealOrdersPage.module.css';

const RealOrdersPage = () => {
  const orderItems = useSelector((state) => state.order.orders);

  return (
    <div className={classes.real__orders}>
      <h3 className={classes.real__orders_title}>My orders</h3>

      {orderItems.length === 0 && (
        <p className={classes.empty}>No products added to cart</p>
      )}
      {orderItems.length > 0 &&
        orderItems.map((item) =>
          item.order.map((piece) => (
            <RealOrders
              key={piece.id}
              id={piece.id}
              image={piece.image}
              description={piece.description}
              title={piece.name}
              price={piece.price}
              quantity={piece.quantity}
              totalPrice={piece.totalPrice}
              status={item.status}
            />
          ))
        )}
    </div>
  );
};

export default RealOrdersPage;
