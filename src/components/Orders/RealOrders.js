import { Link } from "react-router-dom";
import classes from "./RealOrders.module.css";

const RealOrders = (props) => {
  const { id, price, title, quantity, totalPrice, status, description, image } =
    props;

  let cssClasses = "";

  if (status === "pending delivery") {
    cssClasses = classes.status__pending;
  }

  if (status === "delivered") {
    cssClasses = classes.status__delivered;
  }

  if (status === "cancelled") {
    cssClasses = classes.status__cancelled;
  }

  return (
    <Link to={`/realorders/${id}`}>
      <div className={classes.order_item}>
        <div className={classes.order__image}>
          <img src={image} alt="order item" />
        </div>

        <div className={classes.details}>
          <h4 className={classes.title}>
            {quantity}x {title}
          </h4>
          <p>
            <span>{description}</span>
          </p>
          <p>${totalPrice}</p>
        </div>
        <div className={classes.order__status}>
          <p className={`${cssClasses} ${classes.status}`}>
            <span>{status}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RealOrders;
