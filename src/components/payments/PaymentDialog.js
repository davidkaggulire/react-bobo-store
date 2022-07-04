import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import classes from "./PaymentDialog.module.css";
import { postOrderData } from "../../store/order-actions";

const PaymentDialog = (props) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const contactInfo = useSelector((state) => state.contact.contactData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const confirmHandler = () => {
    setIsLoading(true);

    const url =
      "https://us-central1-bobostore-3aabe.cloudfunctions.net/app/api/v1/users/orders";

    const inputData = {
      contactInfo,
      orderItems: cartItems,
    };

    console.log(inputData);

    dispatch(postOrderData(inputData, url, navigate, setIsLoading));

  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.pay_dialog}>
        <p>Do you confirm purchase of the items?</p>
        <div className={classes.actions}>
          <button className={classes.confirm_order} onClick={confirmHandler}>
            Yes
          </button>
          <button className={classes.cancel} onClick={props.onClose}>
            No
          </button>
        </div>
        {isLoading && <LoadingSpinner />}
      </div>
    </Modal>
  );
};

export default PaymentDialog;
