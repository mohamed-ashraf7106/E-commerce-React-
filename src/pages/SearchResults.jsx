import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Product from "../components/Home/Product";
import Loading from "../components/Loading";

function SearchResults() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      );
      const result = await response.json();
      setData(result.products);
      setLoading(false);
    };
    fetchData();
  }, [query]);

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      {loading ? (
        <Loading />
      ) : (
        <div className="container max-w-128 w-full relative">
          {data.length > 0 ? (
            data.map((product) => <Product key={product.id} data={product} />)
          ) : (
            <p>No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
