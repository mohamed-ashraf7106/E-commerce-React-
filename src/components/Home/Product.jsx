import { useState, useEffect } from "react";
import Loading from "../Loading";
import "./product.css";
import { Link } from "react-router-dom";
function Product({ data, index }) {
  let [loaded, setloaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = data.images[0];
    img.onload = () => setloaded(true);
  }, [data.images]);
  let discount = data.discountPercentage;
  return (
    <div className="h-90 border relative pb-1 flex flex-col justify-between gap-1">
      <div className=" flex justify-center h-60">
        {loaded ? (
          <img
            loading={index < 8 ? "preload" : "lazy"}
            className="max-h-full h-56 max-w-full object-cover"
            src={data.images[0]}
            alt={data.title}
          />
        ) : (
          <Loading />
        )}
      </div>
      <div className="min-h-fit h-14 px-2">
        <h1 className="font-bold">{data.title}</h1>
        <p className="text-xl">
          {((data.price * (100 - data.discountPercentage)) / 100).toFixed(2)}${" "}
          <span className="discount text-base">{data.price}$</span>
        </p>
      </div>
      {data.discountPercentage == 0 ? (
        ""
      ) : (
        <span className="absolute overflow-hidden ticket p-2 text-xs flex  items-center top-5 left-0 text-black font-bold  h-6  w-20 bg-shop">
          -{discount}%
        </span>
      )}
      <Link
        to={`/${data.id}`}
        className=" p-2 bg-blue-600 mx-auto hover:bg-blue-700 text-white w-fit rounded text-center "
      >
        <button>View product</button>
      </Link>
    </div>
  );
}

export default Product;
