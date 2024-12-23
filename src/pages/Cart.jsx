import React from "react";
import { useSelector } from "react-redux";
import Cartproduct from "../components/Cart/Cartproduct";
import "./cart.css";
import Bill from "../components/Cart/Bill";
import { useNavigate } from "react-router-dom";
function Cart() {
  let data = useSelector((state) => state.cartState);
  let logedIn = useSelector((state) => state.logstatus);
  let navigation = useNavigate();
  if (!logedIn) {
    navigation("/login");
  }
  if (data.length == 0) {
    return<p className="text-center"> empty cart</p>
  }
  return (
    <div className="bill max-w-128 mx-auto">
      <div className="flex  min-w-72 flex-col gap-10">
        {data.map((e) => (
          <Cartproduct key={e.id} id={e.id} quantity={e.quantity} />
        ))}
      </div>
      <Bill data={data}/>
    </div>
  );
}

export default Cart;
