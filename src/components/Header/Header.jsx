import { useState } from "react";
import HeaderCatregory from "./HeaderCatregory";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../app/features/logstatus";
import "./header.css";
function Header() {
  let loggedIn = useSelector((state) => state.logstatus);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/E-commerce-React-/search?query=${search}`);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="flex justify-center bg-shop ">
        <div className="p-2 max-w-128 w-full">
          <div className="flex gap-1 items-center justify-between">
            <Link to="/E-commerce-React-">
              <div className="text-3xl logo font-bold">SwiftCart</div>
            </Link>
            <form
              onSubmit={handleSearchSubmit}
              className="relative searchBar flex-shrink max-w-fit"
            >
              <input
                className="outline-none max-w-48 w-full rounded px-3 py-1"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <i className="fa-solid absolute top-1/2 right-2 -translate-y-1/2 fa-magnifying-glass"></i>
              </button>
            </form>
            <div>
              <ul className="flex gap-4 items-center">
                {loggedIn ? (
                  <>
                    <button
                      className="min-w-fit"
                      onClick={() => {
                        dispatch(login(false));
                        navigate("/E-commerce-React-/login");
                      }}
                    >
                      sign out
                    </button>
                    <Link className="flex gap-3" to="/E-commerce-React-/cart">
                      <li>
                        <i className="fa-solid fa-cart-shopping"></i>
                      </li>
                    </Link>
                  </>
                ) : (
                  <Link to="/E-commerce-React-/login">
                    <li className="flex gap-2 items-center">
                      <i className="fa-solid fa-user"></i>
                      <span className="font-bold">Login</span>
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <HeaderCatregory />
    </div>
  );
}

export default Header;
