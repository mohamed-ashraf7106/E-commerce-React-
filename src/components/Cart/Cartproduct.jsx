import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { removeProduct } from "../../app/features/cart";
import { useDispatch } from "react-redux";
function Cartproduct({ quantity, id }) {
  let [mydata, setdata] = useState({});
  let [loaded, setLoaded] = useState(false);
  let dispatch = useDispatch();
  function handleDeleteItem() {
    dispatch(removeProduct(id));
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await response.json();
      setdata(result);
      setLoaded(true);
    };
    fetchData();
  }, []);
  return (
    <div>
      {loaded ? (
        <div className="flex flex-col border h-96 justify-between ">
          <div className="flex font-bold border py-2 flex-col justify-center items-center">
            <h3>{mydata.title}</h3>
            <p>
              {(
                ((100 - mydata.discountPercentage) * mydata.price) /
                100
              ).toFixed(2)}{" "}
              * {quantity} ={" "}
              {(
                quantity *
                (((100 - mydata.discountPercentage) * mydata.price) / 100)
              ).toFixed(2)}
              $
            </p>
            <button
              onClick={handleDeleteItem}
              className="bg-red-600 hover:bg-red-700 py-2 text-white px-4 rounded "
            >
              Remove from cart
            </button>
          </div>
          <div className="max-h-64">
            <img
            loading="lazy"
              className="h-full w-full object-contain"
              src={mydata.images[0]}
              alt={`product-${mydata.title}`}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Cartproduct;
