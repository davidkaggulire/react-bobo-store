import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: { contactData: "" },
  reducers: {
    saveOrderData(state, action) {
      state.contactData = action.payload;
    },
  },
});

export const contactActions = contactSlice.actions;
export default contactSlice;
