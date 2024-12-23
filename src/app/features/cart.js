import { createSlice } from "@reduxjs/toolkit";
let initialState = []
if (localStorage.getItem("cart") != null) {
  initialState = JSON.parse(localStorage.getItem("cart"));
}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index].quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeProduct: (state, action) => {
      let x = state.filter((e) => e.id != action.payload);
      localStorage.setItem("cart", JSON.stringify(x));
      return x
    },
    clearCart:()=>{
      localStorage.removeItem("cart")
      return []
    }
  },
});
export const { addProduct, removeProduct ,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
