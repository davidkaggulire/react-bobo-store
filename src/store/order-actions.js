import { orderActions } from "./order-slice";
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const postOrderData = (inputData, url, navigate, setIsLoading) => {
  return async (dispatch) => {
    const postOrder = async () => {
      const token = inputData.token;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          firstName: inputData.contactInfo.firstName,
          lastName: inputData.contactInfo.lastName,
          country: inputData.contactInfo.country,
          address: inputData.contactInfo.address,
          city: inputData.contactInfo.city,
          orderData: inputData.orderData,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`,
        },
      });

      //   if (!response.ok) {
      //     throw new Error("Authentication failed");
      //   }

      const data = await response.json();

      return data;
    };

    try {
      const response = await postOrder();
      console.log(response.status);

      if (response.status === "fail") {
        console.log(response);
        dispatch(
          orderActions.confirmOrder({
            orders: [],
          })
        );

        dispatch(
          uiActions.setNotification({
            status: "error",
            message: response.message.code,
          })
        );

        setIsLoading(false);
        navigate("../orders", { replace: true });
      } else {
        // correct order
        dispatch(
          orderActions.confirmOrder({
            status: "",
            orders: "",
          })
        );

        // clear cart on make purchase
        dispatch(
          cartActions.replaceCart({
            totalQuantity: 0,
            items: [],
          })
        );

        navigate("../paymentConfirm", { replace: true });
      }
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setNotification({
          status: "error",
        })
      );
    }
  };
};

export const fetchOrderData = (token) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const url =
        "https://us-central1-bobostore-3aabe.cloudfunctions.net/app/api/v1/orders";
      
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

      if (!response.ok) {
        throw new Error("Could not fetch order data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const orderData = await fetchData();
      dispatch(
        orderActions.showOrders({
          orders: orderData.data || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "No orders found",
        })
      );
    }
  };
};
