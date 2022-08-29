import { Fragment, useState } from "react";
import classes from "./VerifyEmail.module.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import sendVerificationEmail from "../../store/sendEmailVerification";

const VerifyEmail = () => {
  const [values, setValues] = useState({
    email: "",
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
    if (!email.includes("@")) {
      toast.error("Email should contain '@'", toastOptions);
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

      const res = await sendVerificationEmail(email, "");

      console.log(res);

      if (res.status === "fail") {
        console.log("failed");

        setIsLoading(false);
        navigate("../verifyEmail", { replace: true });
        toast.error(res.error.code, toastOptions);
      }

      if (res.status === "success") {
        console.log("success");
        toast.success("Sent Verify email link to your email", toastOptions);

        setIsLoading(false);

        // navigate("../login", { replace: true });
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
            <h1 className={classes.app_heading}>Verify Email</h1>
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
              Send Link
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

export default VerifyEmail;
