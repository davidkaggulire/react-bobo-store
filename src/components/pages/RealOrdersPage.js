import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../../store/order-actions";
import { dateformatter } from "../../utils/timeConverter";
import ListOrders from "../Orders/ListOrders";
import classes from "./RealOrdersPage.module.css";

const RealOrdersPage = () => {
  const orderItems = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    if (isLoggedIn) {
        dispatch(fetchOrderData(token));
    }
  }, [dispatch, isLoggedIn, token]);

  return (
    <div className={classes.real__orders}>
      <h3 className={classes.real__orders_title}>My orders</h3>

      {orderItems.length === 0 && (
        <p className={classes.empty}>No orders have been made as yet</p>
      )}

      <div className={classes.table_titles}>
        <span>OrderID</span>

        <span className={classes.table_title_details}>
          <p className={classes.created}>createdAt</p>
          <p className={classes.status}>status</p>
        </span>
      </div>
      {orderItems.length > 0 &&
        orderItems.map((item) => (
          <ListOrders
            key={item.id}
            id={item.id}
            totalPrice={item.totalPrice}
            createdAt={dateformatter(item.createdAt)}
            status={item.status}
            payment_status={item.payment_status}
          />
        ))}
    </div>
  );
};

export default RealOrdersPage;
