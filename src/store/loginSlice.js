import { createSlice } from "@reduxjs/toolkit";
import retrieveStoredToken from "./retrieveStoredToken";

const loginSlice = createSlice({
  name: "login",
  initialState: { isLoggedIn: false, token: "", expirationTime: 0, remainingTime: 0, email: "", displayName: "", emailVerified: false },
  reducers: {
    logout(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
      state.remainingTime = action.payload.remainingTime;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    login(state, action){
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.emailVerified = action.payload.emailVerified;

      const value = retrieveStoredToken(state.token, state.expirationTime);
      console.log(value);
      if(value !== null && value !== undefined){
        state.remainingTime = value.duration;
        state.token = value.token
        state.isLoggedIn = true
      }
      else{
        state.isLoggedIn = false
        state.token = ""
        state.remainingTime = ""
        state.expirationTime = ""
      }
    }, expire(state, action){
      state.remainingTime = action.payload.remainingTime;
      if(state.remainingTime <= 3600){
        state.isLoggedIn = false
        state.token = ""
        state.remainingTime = ""
        state.expirationTime = ""
      }else{
        state.isLoggedIn = true
      }
    }
  },
});



export const loginActions = loginSlice.actions;

export default loginSlice;
