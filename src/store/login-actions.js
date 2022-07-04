import { loginActions } from "./loginSlice";
import { uiActions } from "./ui-slice";

export const postAuthData = (inputData, url, navigate, setIsLoading) => {
  return async (dispatch) => {
    const authCheck = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: inputData.email,
          password: inputData.password,
          name: inputData.name
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
      console.log(authData.status)

      if (authData.status === "fail") {
        console.log(authData);
        dispatch(
          loginActions.login({
            token: "",
            expirationTime: 0,
          })
        );

        dispatch(
          uiActions.setNotification({
            status: "error",
            message: authData.message.code
          })
        );
        
        setIsLoading(false);

      //   setTimeout(function(){
      //     window.location.reload(1);
      //  }, 5000);
        
        
      } else {
        const expirationTime = new Date(new Date().getTime() + (+authData.expiresIn * 1000));
        console.log(authData);

        dispatch(
          loginActions.login({
            token: authData.idToken,
            expirationTime: expirationTime.toISOString(),
            displayName: authData.displayName,
            email: authData.email
          })
        );

        navigate("../products", { replace: true });
      } 

        
    } catch (error) {
      console.log(error);
      dispatch(
        loginActions.login({
          isLoggedIn: false,
          token: "",
        })
      );

      dispatch(
        uiActions.setNotification({
          status: "error",
        })
      );
    }
  };
};
