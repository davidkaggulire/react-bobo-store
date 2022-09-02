import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./OrderDetail.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import OrderListDetail from "./OrderListDetail";

const timeConverter = (time) => {
  // converting firestore timestamp to normal date
  const date = new Date(time._seconds * 1000 + time._nanoseconds / 1000000);

  // const [month, day, year] = [
  //   date.getMonth()+1,
  //   date.getDate(),
  //   date.getFullYear(),
  // ];

  // console.log(month, day, year)
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
  const navigate = useNavigate();

  const { orderId } = orderParams;

  // LOOPing through entire group collecting many orders to which order belongs
  // const group = orderItems.find((order) =>
  //   order.order.some((item) => item.id === orderId)
  // );

  const group = orderItems.find((item) => item.id === orderId);
  console.log(group);

  //   console.log(group.order);

  // getting specific order item
  // const order = group.order.find((item) => item.id === orderId);
  //   console.log(order);

  const createdAt = group.createdAt;

  const finalDate = timeConverter(createdAt);
  //   console.log(finalDate);

  // navigating backwards
  const previousPageHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.order__detail}>
      <div className={classes.header}>
        <MdKeyboardArrowLeft
          onClick={previousPageHandler}
          className={classes.back_button}
        />
      </div>

      <div className={classes.detail__page}>
        <div className={classes.date__details}>
          <p className={classes.status}>Status: {group.status}</p>
          <p>Ordered: {finalDate}</p>
          <p>BOBO ID: {group.id}</p>
        </div>
        <div className={classes.delivery__details}>
          <h4>Delivery details</h4>
          <p>{group.address}</p>
          <p>{group.city}</p>
          <p>{group.country}</p>
        </div>
      </div>
      <div className={classes.order_titles}>
        <p>Product</p>
        <p>Name</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>

      {group.order.map((piece) => (
        <OrderListDetail
          key={piece.id}
          id={piece.id}
          image={piece.image}
          description={piece.description}
          title={piece.name}
          price={piece.price}
          quantity={piece.quantity}
          totalPrice={piece.totalPrice}
        />
      ))}
    </div>
  );
};

export default OrderDetail;
