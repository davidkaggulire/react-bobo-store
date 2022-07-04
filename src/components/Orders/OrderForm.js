import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { contactActions } from "../../store/contact-slice";
import Input from "../UI/Input";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./OrderForm.module.css";
import {
  countryReducer,
  addressReducer,
  cityReducer,
  firstNameReducer,
  lastNameReducer,
} from "./orderreducer";

const OrderForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  const dispatch = useDispatch();

  const [countryState, dispatchCountry] = useReducer(countryReducer, {
    value: "",
    isValid: null,
  });

  const [firstNameState, dispatchFirstName] = useReducer(firstNameReducer, {
    value: "",
    isValid: null,
  });

  const [lastNameState, dispatchLastName] = useReducer(lastNameReducer, {
    value: "",
    isValid: null,
  });

  const [addressState, dispatchAddress] = useReducer(addressReducer, {
    value: "",
    isValid: null,
  });

  const [cityState, dispatchCity] = useReducer(cityReducer, {
    value: "",
    isValid: null,
  });

  const countryInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();

  const { isValid: countryIsValid } = countryState;
  const { isValid: firstNameIsValid } = firstNameState;
  const { isValid: lastNameIsValid } = lastNameState;
  const { isValid: addressIsValid } = addressState;
  const { isValid: cityIsValid } = cityState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      //   console.log("Checking form validity");

      setFormIsValid(
        countryIsValid &&
          firstNameIsValid &&
          lastNameIsValid &&
          addressIsValid &&
          cityIsValid
      );
    }, 500);

    // this runs as a clean up function
    return () => {
      //   console.log("CLEAN UP");
      clearTimeout(identifier);
    };
  }, [
    countryIsValid,
    firstNameIsValid,
    lastNameIsValid,
    addressIsValid,
    cityIsValid,
  ]);

  const countryChangeHandler = (event) => {
    dispatchCountry({ type: "USER_INPUT", val: event.target.value });
  };

  const firstNameChangeHandler = (event) => {
    dispatchFirstName({ type: "USER_INPUT", val: event.target.value });
  };

  const lastNameChangeHandler = (event) => {
    dispatchLastName({ type: "USER_INPUT", val: event.target.value });
  };

  const addressChangeHandler = (event) => {
    dispatchAddress({ type: "USER_INPUT", val: event.target.value });
  };

  const cityChangeHandler = (event) => {
    dispatchCity({ type: "USER_INPUT", val: event.target.value });
  };

  const validateCountryHandler = () => {
    dispatchCountry({ type: "INPUT_BLUR" });
  };

  const validateFirstNameHandler = () => {
    dispatchFirstName({ type: "INPUT_BLUR" });
  };

  const validateLastNameHandler = () => {
    dispatchLastName({ type: "INPUT_BLUR" });
  };

  const validateAddressHandler = () => {
    dispatchAddress({ type: "INPUT_BLUR" });
  };

  const validateCityHandler = () => {
    dispatchCity({ type: "INPUT_BLUR" });
  };

  const submitContactHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      setIsLoading(true);

      //  contact data
      const contactData = {
        country: countryState.value,
        firstName: firstNameState.value,
        lastName: lastNameState.value,
        address: addressState.value,
        city: cityState.value,
      };

      dispatch(contactActions.saveOrderData(contactData));
      setIsLoading(true);
      navigate("../payments", { replace: true });
    } else if (!countryIsValid) {
      countryInputRef.current.focus();
    } else if (!firstNameIsValid) {
      firstNameInputRef.current.focus();
    } else if (!lastNameIsValid) {
      lastNameInputRef.current.focus();
    } else if (!addressIsValid) {
      addressInputRef.current.focus();
    } else {
      cityInputRef.current.focus();
    }
  };

  return (
    <form className={classes.orderform} onSubmit={submitContactHandler}>
      <h3 className={classes.contact__title}>Contact Information</h3>
      <Input
        ref={countryInputRef}
        id="country"
        label="Country"
        type="text"
        isValid={countryIsValid}
        value={countryState.value}
        onChange={countryChangeHandler}
        onBlur={validateCountryHandler}
      />

      <Input
        ref={firstNameInputRef}
        id="firstname"
        label="First name"
        type="text"
        isValid={firstNameIsValid}
        value={firstNameState.value}
        onChange={firstNameChangeHandler}
        onBlur={validateFirstNameHandler}
      />

      <Input
        ref={lastNameInputRef}
        id="lastname"
        label="Last name"
        type="text"
        isValid={lastNameIsValid}
        value={lastNameState.value}
        onChange={lastNameChangeHandler}
        onBlur={validateLastNameHandler}
      />

      <Input
        ref={addressInputRef}
        id="address"
        label="Address"
        type="text"
        isValid={addressIsValid}
        value={addressState.value}
        onChange={addressChangeHandler}
        onBlur={validateAddressHandler}
      />

      <Input
        ref={cityInputRef}
        id="city"
        label="City"
        type="text"
        isValid={cityIsValid}
        value={cityState.value}
        onChange={cityChangeHandler}
        onBlur={validateCityHandler}
      />
      {isLoading && <LoadingSpinner />}
      <button>Pay</button>
    </form>
  );
};

export default OrderForm;
