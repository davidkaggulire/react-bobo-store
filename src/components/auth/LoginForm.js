import { Fragment, useState } from "react";
import classes from "./LoginForm.module.css";
import { toast, ToastContainer } from "react-toastify";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { postLoginData } from "../../store/login-actions";
import { useDispatch } from "react-redux";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const { password, email } = values;
    if (!email.includes('@')) {
      toast.error(
        "Email should contain '@'",
        toastOptions
      );
      return false;
    }
    if (email === "") {
      toast.error("Email can't be empty and must include '@'", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setIsLoading(true);
      const { password, email } = values;
      console.log("clicked");

      const url =
        "https://us-central1-bobostore-3aabe.cloudfunctions.net/app/api/v1/users/login";

      const inputData = {
        password: password,
        email: email,
      };

      dispatch(postLoginData(inputData, url, navigate, setIsLoading));
    }
  };

  return (
    <Fragment>
      <div className={classes.form_div}>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className={classes.form}
        >
          <div className={classes.brand}>
            <h1 className={classes.app_heading}>Login</h1>
          </div>
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <div className={classes.password__input}>
            <input
              className={classes.input}
              type={passwordType}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            {passwordType === "password" ? (
              <FaRegEyeSlash
                className={classes.toggle__btn}
                onClick={togglePassword}
              />
            ) : (
              <FaRegEye
                className={classes.toggle__btn}
                onClick={togglePassword}
              />
            )}
          </div>
          <div className={classes.spinner}>
            {isLoading && <LoadingSpinner />}
          </div>
          <button type="submit" className={classes.button}>
            Login
          </button>

          <span className={classes.switch}>
            Don't have an account? <a href="/signup">Register</a>
          </span>
          <div className={classes.link_actions}>
            <span className={classes.resetPassword}>
              <a href="/resetPassword">Forgot Password?</a>
            </span>

            <span className={classes.resetPassword}>
              <a href="#">Verify account</a>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AuthForm;
