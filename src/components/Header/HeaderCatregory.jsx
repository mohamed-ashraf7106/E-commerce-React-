import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
function HeaderCatregory() {
  const myList = useRef(null);
  let [dragging, setDragging] = useState(false);
  let [moveX, setMove] = useState(0);
  let [categories, setCategories] = useState([]);
  function handleClick(direction) {
    switch (direction) {
      case "left":
        myList.current.scrollLeft -= 200;
        break;
      case "right":
        myList.current.scrollLeft += 200;
        break;
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const result = await response.json();
      setCategories(result);
    };
    fetchData();
  }, []);
  function handleMouseDown(e, touch = false) {
    setDragging(true);
    if (touch) {
      setMove(e.touches[0].pageX - myList.current.offsetLeft);
      return;
    }
    setMove(e.pageX - myList.current.offsetLeft);
  }
  function handleMouseOut() {
    setDragging(false);
  }
  function handleMouseMove(e, touch = false) {
    if (dragging) {
      if (touch) {
        myList.current.scrollLeft -=
          e.touches[0].pageX - myList.current.offsetLeft - moveX;
        return;
      }
      myList.current.scrollLeft -= e.pageX - myList.current.offsetLeft - moveX;
    }
  }
  return (
    <div className="flex relative overflow-hidden  bg-category justify-center">
      <div className="max-w-128 w-full relative">
        <button
          onClick={() => {
            handleClick("left");
          }}
          className="absolute  z-50 shadow-hard-blur-white bg-white/90  left-2 border rounded-full w-8 h-8 top-1/2 -translate-y-1/2"
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <ul
          onMouseDown={(e) => {
            e.stopPropagation();
            handleMouseDown(e);
          }}
          onMouseUp={handleMouseOut}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseOut}
          onTouchStart={(e) => {
            e.stopPropagation();
            handleMouseDown(e, true);
          }}
          onTouchMove={(e) => {
            handleMouseMove(e, true);
          }}
          onTouchEnd={(e) => {
            handleMouseOut(e, true);
          }}
          ref={myList}
          className="max-w-128 cursor-grab overflow-hidden w-full px-12  flex gap-2"
        >
          {categories.map((e) => {
            return (
              <Link
              to={`/category/${e.slug}`}
                key={e.name}
                className="min-w-fit py-2 select-none"
              >
                <li>{e.name}</li>
              </Link>
            );
          })}
        </ul>
        <button
          onClick={() => {
            handleClick("right");
          }}
          className="absolute z-50 shadow-hard-blur-white bg-white/90 right-2 border rounded-full w-8 h-8 top-1/2 -translate-y-1/2"
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}

export default HeaderCatregory;
