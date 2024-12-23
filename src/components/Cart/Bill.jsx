import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../app/features/cart";
function Bill({ data }) {
  let dispatch = useDispatch()
  const total = data
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
    function handleOrder() {
      dispatch(clearCart())
    }

  return (
    <div className="flex-grow">
      {data.map((e) => {
        return (
          <div key={e.id}>
            <p >
              +{e.price} * {e.quantity} ={(e.quantity * e.price).toFixed(2)}$
            </p>
            <hr />
          </div>
        );
      })}
      <div className="flex flex-col items-center justify-center">
        <p className="w-full">Total : {total}$</p>
        <button onClick={handleOrder} className="bg-green-500 text-white px-5 py-2 rounded ">Place order</button>
      </div>
    </div>
  );
}

export default Bill;
