import { createSlice } from "@reduxjs/toolkit";

const initialState = { notification: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;