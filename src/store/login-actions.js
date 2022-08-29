import { loginActions } from "./loginSlice";
// import { uiActions } from "./ui-slice";
import sendVerificationEmail from "./sendEmailVerification";

import { toast } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const postAuthData = (inputData, url, navigate, setIsLoading) => {
  return async (dispatch) => {
    const authCheck = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: inputData.email,
          password: inputData.password,
          name: inputData.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //   if (!response.ok) {
      //     throw new Error("Authentication failed");
      //   }

      const data = await response.json();

      return data;
    };

    try {
      const authData = await authCheck();
      console.log(authData.status);

      if (authData.status === "fail") {
        console.log(authData);
        dispatch(
          loginActions.login({
            token: "",
            expirationTime: 0,
          })
        );

        toast.error(authData.message.code, toastOptions);

        // dispatch(
        //   uiActions.setNotification({
        //     status: "error",
        //     message: authData.message.code
        //   })
        // );

        setIsLoading(false);
      } else {
        const expirationTime = new Date(
          new Date().getTime() + +authData.expiresIn * 1000
        );
        console.log(authData);

        if (authData.emailVerified) {
          dispatch(
            loginActions.login({
              token: authData.idToken,
              expirationTime: expirationTime.toISOString(),
              displayName: authData.displayName,
              email: authData.email,
              emailVerified: authData.emailVerified,
            })
          );

          navigate("../products", { replace: true });
        } else {
          await sendVerificationEmail(inputData.email, inputData.name);

          // dispatch(
          //   uiActions.setNotification({
          //     status: "success",
          //     message: "Sent email verification link",
          //   })
          // );

          dispatch(toast.success("Sent email verification link", toastOptions));

          setIsLoading(false);

          navigate("../auth", { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(
        loginActions.login({
          isLoggedIn: false,
          token: "",
        })
      );

      toast.error("error", toastOptions);

      // dispatch(
      //   uiActions.setNotification({
      //     status: "error",
      //     message: error,
      //   })
      // );
    }
  };
};

export const postLoginData = (inputData, url, navigate, setIsLoading) => {
  return async (dispatch) => {
    const authCheck = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: inputData.email,
          password: inputData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //   if (!response.ok) {
      //     throw new Error("Authentication failed");
      //   }

      const data = await response.json();

      return data;
    };

    try {
      const authData = await authCheck();
      console.log(authData.status);

      if (authData.status === "fail") {
        console.log(authData);
        dispatch(
          loginActions.login({
            token: "",
            expirationTime: 0,
          })
        );

        // dispatch(
        //   uiActions.setNotification({
        //     status: "error",
        //     message: authData.message.code
        //   })
        // );

        toast.error(authData.message.code, toastOptions);

        setIsLoading(false);

        //   setTimeout(function(){
        //     window.location.reload(1);
        //  }, 5000);
      } else {
        const expirationTime = new Date(
          new Date().getTime() + +authData.expiresIn * 1000
        );
        console.log(authData);

        if (authData.emailVerified) {
          dispatch(
            loginActions.login({
              token: authData.idToken,
              expirationTime: expirationTime.toISOString(),
              displayName: authData.displayName,
              email: authData.email,
              emailVerified: authData.emailVerified,
            })
          );

          navigate("../products", { replace: true });
        } else {
          await sendVerificationEmail(inputData.email, inputData.name);

          // dispatch(
          //   uiActions.setNotification({
          //     status: "success",
          //     message: "Sent email verification link",
          //   })
          // );

          toast.success("Sent email verification link", toastOptions);

          setIsLoading(false);

          navigate("../auth", { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(
        loginActions.login({
          isLoggedIn: false,
          token: "",
        })
      );

      // dispatch(
      //   uiActions.setNotification({
      //     status: "error",
      //     message: error,
      //   })
      // );

      toast.error("Error logging in", toastOptions);
    }
  };
};
