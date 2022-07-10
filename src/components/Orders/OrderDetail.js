import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classes from "./OrderDetail.module.css";

const timeConverter = (time) => {
  // converting firestore timestamp to normal date
  const date = new Date(time._seconds * 1000 + time._nanoseconds / 1000000);

  //   const [month, day, year] = [
  //     date.getMonth(),
  //     date.getDate(),
  //     date.getFullYear(),
  //   ];
  let [hour, minutes] = [date.getHours(), date.getMinutes()];
  if (hour === 0) {
    hour = hour + "0";
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  const output = date.toDateString() + " | " + hour + ":" + minutes;
  return output;
};

const OrderDetail = () => {
  const orderParams = useParams();
  const orderItems = useSelector((state) => state.order.orders);

  const { orderId } = orderParams;

  // LOOPing through entire group collecting many orders to which order belongs
  const group = orderItems.find((order) =>
    order.order.some((item) => item.id === orderId)
  );

  //   console.log(group.order);

  // getting specific order item
  const order = group.order.find((item) => item.id === orderId);
  //   console.log(order);

  const createdAt = group.createdAt;

  const finalDate = timeConverter(createdAt);
  //   console.log(finalDate);

  return (
    <div className={classes.order__detail}>
      <div className={classes.header}>
        <h3 className={classes.order__name}>{order.name}</h3>
      </div>

      <div className={classes.detail__page}>
        <div className={classes.date__details}>
          <p className={classes.status}>Status: {group.status}</p>
          <p>Ordered: {finalDate}</p>
          <p>BOBO ID: {group.id}</p>
        </div>
        <div className={classes.middle_div}>
          <p>Your Bobo</p>
          <div className={classes.pricing}>
            <p>
              {order.quantity}x {order.name} ${order.totalPrice}
            </p>
          </div>
        </div>
        <div className={classes.delivery__details}>
          <h4>Delivery details</h4>
          <p>{group.address}</p>
          <p>{group.city}</p>
          <p>{group.country}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
