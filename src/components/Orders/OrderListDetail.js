import Card from "../UI/Card";
import classes from "./OrderListDetail.module.css";

const OrderListDetail = (props) => {
  const { title, quantity, totalPrice, image } = props;

  return (
    <Card>
      <div className={classes.order_item}>

          <img src={image} alt="order item" className={classes.item_image} />
    
          <p className={classes.title}>
            {title}
          </p>
          <p>
            {quantity}
          </p>
          <p>${totalPrice}</p>
      </div>
    </Card>
  );
};
export default OrderListDetail;
