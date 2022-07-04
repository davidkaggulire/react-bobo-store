import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        status: ""
    },
    reducers:{
        confirmOrder(state, action){
            state.status = action.payload.status;
            state.orders = action.payload.orders;
        }
    }
});

export const orderActions = orderSlice.actions;

export default orderSlice;