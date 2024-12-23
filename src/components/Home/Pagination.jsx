import ReactPaginate from "react-paginate";
import"./pagination.css"
function Pagination({pages,setCurrentPage}) {
  function handlePageClick(e) {
    setCurrentPage(e.selected);
  }
  return (
    <ReactPaginate
    previousLabel={<i className="fa-solid fa-angle-left"></i>}
    previousClassName={"paginateBtn"}
    nextClassName={"paginateBtn"}
    nextLabel={<i className="fa-solid fa-angle-right"></i>}
    pageCount={pages}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
    activeClassName={"active"}
    onPageChange={handlePageClick}
    containerClassName={"flex gap-2 justify-center m-2"}
    pageClassName={"subContainer"}
  />
  )
}

export default Pagination
