import { useState, useEffect } from "react";
import Product from "../components/Home/Product";
import "./home.css";
import Loading from "../components/Loading";
import Pagination from "../components/Home/Pagination";
import { useParams  , useLocation} from "react-router-dom";
function HomePage() {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const myparams = useParams();
  useEffect(() => {    
    let mylink = ""
    let mypage = currentPage
    if (Object.keys(myparams).length > 0) {      
      mylink=`/category/${myparams.product}`
      mypage= 0
    }
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products${mylink}?limit=32&skip=${
          mypage * 32
        }`
      );
      const result = await response.json();
      setData(result);
      setPages(Math.ceil(result.total / 32));
    };
    fetchData();
  }, [currentPage, myparams, myparams]);
  let styles = "container max-w-128 w-full relative ";
  data.length == 0 ? (styles = "flex justify-center p-10") : "";
  return (
    <div className=" flex justify-center items-center flex-col gap-2">
      <div className={styles}>
        {data.length == 0 ? (
          <Loading />
        ) : (
          data.products.map((e) => <Product key={e.id} data={e}></Product>)
        )}
      </div>
      <Pagination pages={pages} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default HomePage;
