import "./App.css";
import Header from "./components/Header/Header";
import ViewProduct from "./pages/ViewProduct";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
function App() {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="w-128 px-4"></div>
      </div>
      <Routes>
        <Route path="/E-commerce-React-/" element={<HomePage />} />
        <Route path="/E-commerce-React-/cart" element={<Cart />} />
        <Route path="/E-commerce-React-/login" element={<Login />} />
        <Route path="/E-commerce-React-/category" element={<HomePage/>}>
          <Route path="/E-commerce-React-/category/:product" element={<HomePage/>} />
        </Route>
        <Route path="/E-commerce-React-/search" element={<SearchResults />} />
        <Route path="/E-commerce-React-/:id" element={<ViewProduct />} />
      </Routes>
    </>
  );
}

export default App;
