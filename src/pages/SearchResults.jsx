import { useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../components/Home/Product";
import Loading from "../components/Loading";
import Pagination from "../components/Home/Pagination";
import useFetchData from "../hooks/useFetchData";
import "./home.css";

function SearchResults() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const query = new URLSearchParams(location.search).get("query");
  const { data, loading, error, totalPages } = useFetchData(
    `https://dummyjson.com/products/search?q=${query}&`,
    currentPage
  );
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `https://dummyjson.com/products/search?q=${query}`
  //     );
  //     const result = await response.json();
  //     setData(result.products);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [query]);
  let myDisplay = loading ? (
    <Loading />
  ) : error ? (
    <p>{error}</p>
  ) : data.length > 0 ? (
    data.map((product) => <Product key={product.id} data={product} />)
  ) : (
    <p>{`No results found for "${query}"`}</p>
  );
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      {/* {loading ? (
        <Loading />
      ) : (
        <div className="container max-w-128 w-full relative">
          {data.length > 0 ? (
            data.map((product) => <Product key={product.id} data={product} />)
          ) : (
            <p>{`No results found for "${query}"`}</p>
          )}
        </div>
      )} */}
      <div className="container max-w-128 w-full relative">{myDisplay}</div>
      <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default SearchResults;
