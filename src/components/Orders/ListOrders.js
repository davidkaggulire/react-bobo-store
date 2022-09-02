import { Link } from "react-router-dom";
import classes from "./ListOrders.module.css";


const ListOrders = (props) => {
  const { id, totalPrice, status, payment_status, createdAt } = props;

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
      <div className={classes.order}>
        <span className={classes.order_id}>{id}</span>

        <span className={classes.order_details}>
            <p className={classes.created}>{createdAt}</p>
            <p className={`${cssClasses} ${classes.status}`}>{status}</p>
            {/* <p>{payment_status}</p> */}
        </span>
      </div>
    </Link>
  );
};

export default ListOrders;
