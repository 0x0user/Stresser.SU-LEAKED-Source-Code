import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function Pagination({ itemsPerPage, items, render, ...props }) {

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {React.cloneElement(render, { items: currentItems, props: props })}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<i className="fa fa-arrow-right" aria-hidden="true"></i>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<i className="fa fa-arrow-left" aria-hidden="true"></i>}
        renderOnZeroPageCount={null}
        pageClassName="page-item mb-1"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

export default Pagination;
