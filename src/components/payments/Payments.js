import { useState } from "react";
import Card from "../UI/Card";
import PaymentDialog from "./PaymentDialog";
import classes from "./Payments.module.css";

const Payments = () => {
  const [confirmBoxIsShown, setConfirmBoxIsShown] = useState(false);

  const onChangePayHandler = () => {
    console.log("pay");
  };

  const showConfirmBoxHandler = () => {
    setConfirmBoxIsShown(true)
  }

  const hideConfirmBoxHandler = () => {
    setConfirmBoxIsShown(false)
  }

  const submitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className={classes.payment_section}>
      {confirmBoxIsShown && <PaymentDialog onClose={hideConfirmBoxHandler}/> }
      <Card>
        <h2>Payment</h2>
        <p className={classes.pay_info}>
          All transactions are secure and encrypted
        </p>
        <form className={classes.pay_form} onSubmit={submitHandler}>
          <input
            type="radio"
            id="credit-card"
            value="Credit card"
            checked=""
            onChange={onChangePayHandler}
          />
          <label htmlFor="credit-card">Credit card</label>
          <br></br>

          <input
            type="radio"
            id="mobile-money"
            value="Mobile money"
            checked=""
            onChange={onChangePayHandler}
          />
          <label htmlFor="mobile-money">Mobile money</label>
          <br></br>

          <button className={classes.pay_btn} onClick={showConfirmBoxHandler}>Complete order</button>
        </form>
      </Card>
    </div>
    // </Card>
  );
};

export default Payments;
