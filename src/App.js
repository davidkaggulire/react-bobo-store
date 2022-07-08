import React, { Suspense, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/pages/NotFound";
import { loginActions } from "./store/loginSlice";
import { calculateRemainingTime } from "./store/retrieveStoredToken";
import { fetchOrderData } from "./store/order-actions";

const AuthPage = React.lazy(() => import("./components/pages/AuthPage"));
const HomePage = React.lazy(() => import("./components/pages/HomePage"));
const ProductsPage = React.lazy(() =>
  import("./components/pages/ProductsPage")
);
const ProfilePage = React.lazy(() => import("./components/pages/ProfilePage"));

const CartPage = React.lazy(() => import("./components/pages/CartPage"));

const ProductDetail = React.lazy(() =>
  import("./components/products/ProductDetail")
);

const OrderPage = React.lazy(() => import("./components/pages/OrderPage"));

const PaymentsPage = React.lazy(() =>
  import("./components/pages/PaymentsPage")
);

const PaymentConfirmPage = React.lazy(() =>
  import("./components/payments/PaymentConfirmPage")
);

const ResetPassword = React.lazy(() =>
  import("./components/auth/ResetPassword")
);

const RealOrdersPage = React.lazy(() =>
  import("./components/pages/RealOrdersPage")
);

let logoutTimer;

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();

  const expirationTime = useSelector((state) => state.login.expirationTime);
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const remainingTime = calculateRemainingTime(expirationTime);
      dispatch(
        loginActions.expire({
          remainingTime: remainingTime,
        })
      );
      console.log(remainingTime);
      logoutTimer = setTimeout(logoutHandler, remainingTime);
      if (remainingTime < 0) {
        navigate("../", { replace: true });
      }
    }
  }, [logoutHandler, isLoggedIn, expirationTime, dispatch, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOrderData(token));
    }
  }, [dispatch, isLoggedIn, token]);

  return (
    <Layout>
      <Suspense fallback={<HomePage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId/*" element={<ProductDetail />} />
          {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
          {isLoggedIn && <Route path="/orders" element={<OrderPage />} />}
          {isLoggedIn && <Route path="/payments" element={<PaymentsPage />} />}
          {isLoggedIn && (
            <Route path="/paymentConfirm" element={<PaymentConfirmPage />} />
          )}
          {isLoggedIn && (
            <Route path="/realorders" element={<RealOrdersPage />} />
          )}
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
