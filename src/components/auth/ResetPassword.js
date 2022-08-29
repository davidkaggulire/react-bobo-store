import { Fragment, useState } from "react";
import classes from "./ResetPassword.module.css";
import { toast, ToastContainer } from "react-toastify";
import sendPasswordReset from "./sendPasswordReset";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const ResetPassword = () => {
  const [values, setValues] = useState({
    email: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validate = () => {
    const { email } = values;
    if (!email.includes('@')) {
      toast.error(
        "Email should contain '@'",
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
      const { email } = values;
      console.log("clicked");

      const res = await sendPasswordReset(email);

      console.log(res);
      

      if (res.status === "fail") {
        console.log("failed");

        setIsLoading(false);
        navigate("../resetPassword", { replace: true });
        toast.error(res.error.code, toastOptions);
      }

      if (res.status === "success") {
        console.log("success");
        toast.success("Sent password Reset link to your email", toastOptions)

        setIsLoading(false);

        navigate("../login", { replace: true });
      }
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
            <h1 className={classes.app_heading}>Reset Password</h1>
          </div>
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <div className={classes.button__holder}>
            <button type="submit" className={classes.button}>
              Reset Password
            </button>
            <span className={classes.switch}>
              <a href="/login">Cancel</a>
            </span>
          </div>
          <div className={classes.spinner}>
            {isLoading && <LoadingSpinner />}
          </div>
        </form>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default ResetPassword;