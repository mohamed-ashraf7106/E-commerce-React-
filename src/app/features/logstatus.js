import { createSlice } from "@reduxjs/toolkit";
let initialState=false
if (localStorage.getItem("login") != null) {
  initialState = JSON.parse(localStorage.getItem("login"));
}
export const logSlice = createSlice({
  name: "login status",
  initialState,
  reducers: {
    login:(state,action)=>{
      localStorage.setItem("login",action.payload)
      return action.payload
    }
  },
});
export const {login} = logSlice.actions
export default logSlice.reducer