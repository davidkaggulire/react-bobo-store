import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import cartSlice from "./cart-slice";
import loginSlice from "./loginSlice";
import uiSlice from "./ui-slice";
import contactSlice from "./contact-slice";
import orderSlice from "./order-slice";

const reducers = combineReducers({
  login: loginSlice.reducer,
  ui: uiSlice.reducer,
  cart: cartSlice.reducer,
  contact: contactSlice.reducer,
  order: orderSlice.reducer
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
