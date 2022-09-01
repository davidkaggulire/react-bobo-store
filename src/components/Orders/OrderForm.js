import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { contactActions } from "../../store/contact-slice";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./OrderForm.module.css";

import { toast, ToastContainer } from "react-toastify";

const OrderForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const { country, firstName, lastName, address, city } = values;

    if (country.length < 1) {
      toast.error("country should contain at least 3 characters", toastOptions);
      return false;
    } else if (firstName.length < 2) {
      toast.error(
        "firstName should be equal or greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (lastName.length < 2) {
      toast.error(
        "lastName should be equal or greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (address.length < 2) {
      toast.error(
        "address should be equal or greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (city.length < 2) {
      toast.error(
        "city should be equal or greater than 3 characters.",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const submitContactHandler = (event) => {
    event.preventDefault();

    if (validate()) {
      setIsLoading(true);
      const { country, firstName, lastName, address, city } = values;

      const contactData = {
        country: country,
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
      };

      dispatch(contactActions.saveOrderData(contactData));
      setIsLoading(true);
      navigate("../payments", { replace: true });
    }
  };

  return (
    <Fragment>
      <div className={classes.form_div}>
        <form
          onSubmit={(event) => submitContactHandler(event)}
          className={classes.form}
        >
          <div className={classes.brand}>
            <h3 className={classes.app_heading}>Contact information</h3>
          </div>
          <div className={classes.control}>
            <label htmlFor="country">Country</label>
            <input
              className={classes.input}
              type="text"
              placeholder="Country"
              name="country"
              onChange={handleChange}
              label="country"
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="firstName">First name</label>
            <input
              className={classes.input}
              type="text"
              placeholder="First name"
              name="firstName"
              onChange={handleChange}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="lastName">Last name</label>
            <input
              className={classes.input}
              type="text"
              placeholder="Last name"
              name="lastName"
              onChange={handleChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input
              className={classes.input}
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="city">City</label>
            <input
              className={classes.input}
              type="text"
              placeholder="City"
              name="city"
              onChange={handleChange}
            />
          </div>
          <div className={classes.center__spin}>
            {isLoading && <LoadingSpinner />}
          </div>

          <button type="submit" className={classes.button}>
            Submit
          </button>
        </form>
      </div>
      <ToastContainer className={classes.toast} />
    </Fragment>
  );
};

export default OrderForm;
