import "./App.css";
import { Suspense, lazy } from "react";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Loading from "./components/Loading";
const HomePage = lazy(() => import("./pages/HomePage"));
const ViewProduct = lazy(() => import("./pages/ViewProduct"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category" element={<HomePage />}>
          <Route path="/category/:product" element={<HomePage />} />
        </Route>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/:id" element={<ViewProduct />} />
      </Routes>
    </Suspense>
  );
}

export default App;
