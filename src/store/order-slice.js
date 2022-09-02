import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        changed: false,
    },
    reducers:{
        confirmOrder(state, action){
            state.orders = action.payload.orders;
            state.changed = true;
        },
        showOrders(state, action){
            state.orders = action.payload.orders;
        }
    }
});

export const orderActions = orderSlice.actions;

export default orderSlice;