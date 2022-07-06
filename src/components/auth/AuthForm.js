import { Fragment, useEffect, useState, useRef, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postAuthData } from "../../store/login-actions";
import Input from "../UI/Input";

import LoadingSpinner from "../UI/LoadingSpinner";
import Notification from "../UI/Notification";
import classes from "./AuthForm.module.css";
import { emailReducer } from "./reducer";
import { passwordReducer } from "./reducer";
import { nameReducer } from "./reducer";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const notification = useSelector((state) => state.ui.notification);
  const [formIsValid, setFormIsValid] = useState(false);

  const navigate = useNavigate();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: nameIsValid } = nameState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      // console.log("Checking form validity");
      if( isLogin){
        setFormIsValid(emailIsValid && passwordIsValid);
      } else{
        setFormIsValid(emailIsValid && passwordIsValid && nameIsValid);
      }
      
    }, 500);

    // this runs as a clean up function
    return () => {
      // console.log("CLEAN UP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, nameIsValid, isLogin]);

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD", val: event.target.value });
  };

  const nameChangeHandler = (event) => {
      dispatchName({ type: "NAME", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateNameHandler = () => {
    dispatchName({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      setIsLoading(true);
      let url;
      if (isLogin) {
        url =
          "https://us-central1-bobostore-3aabe.cloudfunctions.net/app/api/v1/users/login";
      } else {
        url =
          "https://us-central1-bobostore-3aabe.cloudfunctions.net/app/api/v1/users/signup";
        console.log(url);
      }

      if (isLogin) {
        nameState.isValid = true;
      }

      const inputData = {
        email: emailState.value,
        password: passwordState.value,
        name: nameState.value,
      };

      dispatch(postAuthData(inputData, url, navigate, setIsLoading));
    } else if (!nameIsValid) {
      nameInputRef.current.focus();
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      <section className={classes.form_section}>
        <h1 className={classes.heading}>{isLogin ? "Login" : "Signup"}</h1>
        <form className={classes.authform} onSubmit={submitHandler}>
          {!isLogin && (
            <div className={classes.control}>
              <Input
                ref={nameInputRef}
                id="name"
                label="Name"
                type="text"
                isValid={nameIsValid}
                value={nameState.value}
                onChange={nameChangeHandler}
                onBlur={validateNameHandler}
              />
            </div>
          )}
          <div className={classes.control}>
            <Input
              ref={emailInputRef}
              id="email"
              label="Email"
              type="email"
              isValid={emailIsValid}
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div className={classes.control}>
            <Input
              ref={passwordInputRef}
              id="password"
              label="Password"
              type="password"
              isValid={passwordIsValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>{isLogin ? "Login" : "Signup"}</button>}
            {isLoading && <LoadingSpinner />}

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
          <Link to="/resetPassword" className={classes.forgot__link}>Forgot Password</Link>
        </form>
      </section>
    </Fragment>
  );
};

export default AuthForm;
