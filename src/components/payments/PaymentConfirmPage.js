// import { useSelector } from "react-redux";
// import Orders from "../Orders/Orders";
import Card from "../UI/Card";
import classes from "./PaymentConfirmPage.module.css";

const PaymentConfirmPage = () => {

  return (
    <div className={classes.receipt_section}>
      <Card>
        <p>Payment Confirmed</p>
        <p>Yay! Order placed! 🛒 You will receive an email confirmation confirming your order.</p>
      </Card>
    </div>
  );
};

export default PaymentConfirmPage;
