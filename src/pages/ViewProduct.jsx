import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { addProduct } from "../app/features/cart";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./viewProduct.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ViewProduct() {
  const myparams = useParams();
  let [error, seterror] = useState("");
  let [quantity, setquantity] = useState(0);
  let navigation = useNavigate();
  let loggedIn = useSelector((state) => state.logstatus);
  let [loadingfetch, setloading] = useState(true);
  let [mydata, setmydata] = useState({});
  let dispatch = useDispatch();
  function handleAdd() {
    if (loggedIn) {
      if (quantity == 0) {
        seterror("select at least 1");
      } else {
        dispatch(
          addProduct({
            id: mydata.id,
            quantity,
            price: (
              (mydata.price * (100 - mydata.discountPercentage)) /
              100
            ).toFixed(2),
          })
        );
      }
    } else {
      navigation("/login");
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${myparams.id}`
      );
      const result = await response.json();
      setmydata(result);
      setloading(false);
    };
    fetchData();
  }, [myparams.id]);
  return (
    <>
      <div className="max-w-128 w-full mx-auto px-2">
        {loadingfetch ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap  justify-center">
            <div className="flex flex-col justify-between items-center text-center min-w-51">
              <h1 className="productTitle">{mydata.title}</h1>
              <div className="flex flex-col items-center">
                <p>
                  {(
                    (mydata.price * (100 - mydata.discountPercentage)) /
                    100
                  ).toFixed(2)}
                  $
                </p>
                <p className="discount w-fit">{mydata.price}$</p>
                <label htmlFor={mydata.id}>quantity</label>
                <input
                  min={0}
                  id={mydata.id}
                  value={quantity}
                  onChange={(e) => {
                    setquantity(Math.floor(e.target.value));
                  }}
                  className="border w-16 pl-2 m-1 outline-none"
                  type="number"
                />
                <p className="text-red-700 w-full">{error}</p>
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 mx-auto text-white w-fit px-8 py-2 rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
            <Swiper
              className="max-w-80 self-center min-w-72"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
            >
              {mydata.images.map((e) => (
                <SwiperSlide
                  className="flex relative items-center justify-center"
                  key={e}
                >
                  <img loading="lazy" src={e} alt="" />
                </SwiperSlide>
              ))}
              <span
                className="absolute overflow-hidden ticket p-2 text-xs flex  items-center top-5 left-0 text-black font-bold  h-6  w-20 bg-shop
                  "
              >
                {(mydata.discountPercentage).toFixed(2)}%
              </span>
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewProduct;
