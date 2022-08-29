import { Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import classes from "./SignupForm.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postAuthData } from "../../store/login-actions";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmType, setPasswordConfirmType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const togglePasswordConfirm = () => {
    if (passwordConfirmType === "password") {
      setPasswordConfirmType("text");
      return;
    }
    setPasswordConfirmType("password");
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const { password, passwordConfirm, email, name } = values;

    if (password !== passwordConfirm) {
      toast.error("Passwords should match", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("Name should contain at least 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email can't be empty", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      setIsLoading(true);
      const { password, name, email } = values;
      const url =
        "https://us-central1-bobostore-3aabe.cloudfunctions.net/app/api/v1/users/signup";

      const inputData = {
        email: email,
        password: password,
        name: name,
      };

      dispatch(postAuthData(inputData, url, navigate, setIsLoading));
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
            <h1 className={classes.app_heading}>Sign up</h1>
          </div>
          <input
            className={classes.input}
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
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
          <div className={classes.password__input}>
            <input
              className={classes.input}
              type={passwordConfirmType}
              placeholder="Confirm password"
              name="passwordConfirm"
              onChange={handleChange}
            />

            {passwordConfirmType === "password" ? (
              <FaRegEyeSlash
                className={classes.toggle__btn}
                onClick={togglePasswordConfirm}
              />
            ) : (
              <FaRegEye
                className={classes.toggle__btn}
                onClick={togglePasswordConfirm}
              />
            )}
          </div>
          <div className={classes.center__spin}>
            {isLoading && <LoadingSpinner />}
          </div>

          <button type="submit" className={classes.button}>
            Create Account
          </button>

          <span className={classes.switch}>
            Already have an account? <a href="/login">Login</a>
          </span>
        </form>
      </div>
      <ToastContainer className={classes.toast} />
    </Fragment>
  );
}

export default SignUp;
