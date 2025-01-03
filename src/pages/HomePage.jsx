import { useState, useEffect } from "react";
import Product from "../components/Home/Product";
import "./home.css";
import Loading from "../components/Loading";
import Pagination from "../components/Home/Pagination";
import { useParams, useLocation } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
function HomePage() {
  // const [data, setData] = useState([]);
  // const [pages, setPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  // const myparams = useParams();
  // useEffect(() => {
  //   let mylink = ""
  //   let mypage = currentPage
  //   if (Object.keys(myparams).length > 0) {
  //     mylink=`/category/${myparams.product}`
  //     mypage= 0
  //   }
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `https://dummyjson.com/products${mylink}?limit=32&skip=${
  //         mypage * 32
  //       }`
  //     );
  //     const result = await response.json();
  //     setData(result);
  //     setPages(Math.ceil(result.total / 32));
  //   };
  //   fetchData();
  // }, [currentPage, myparams, myparams]);
  // return (
  //   <div className=" flex justify-center items-center flex-col gap-2">
  //     <div className="container max-w-128 w-full relative ">
  //       {data.length == 0 ? (
  //         <Loading />
  //       ) : (
  //         data.products.map((e) => <Product key={e.id} data={e}></Product>)
  //       )}
  //     </div>
  //     <Pagination pages={pages} setCurrentPage={setCurrentPage} />
  //   </div>
  // );
  const category = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (Object.keys(category).length > 0) {
      setCurrentPage(0);
    }
  }, [category]);
  const url =
    Object.keys(category).length > 0
      ? `https://dummyjson.com/products/category/${category.product}?`
      : "https://dummyjson.com/products";
  const { data, loading, error, totalPages } = useFetchData(url, currentPage);

  let myDisplay = loading ? (
      <Loading />
  ) : error ? (
    <p>{error}</p>
  ) : data.length > 0 ? (
    data.map((product, index) => (
      <Product key={product.id} data={product} index={index} />
    ))
  ) : (
    <p>No products found</p>
  );
  return (
    <>
      {/*<div className="flex justify-center items-center flex-col gap-2">*/}
      <div className="container max-w-128 mx-auto relative">{myDisplay}</div>
      <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
      {/* </div> */}
    </>
  );
}

export default HomePage;
