import { configureStore } from "@reduxjs/toolkit";
import logstatus from "../features/logstatus";
import cartState from "../features/cart";
export const store = configureStore({
  reducer: {
    logstatus,
    cartState,
  },
});
