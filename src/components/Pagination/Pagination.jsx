import React from 'react';
import "./Pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination col-12">
      <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
        Primera
      </button>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Anterior
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
      <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
        Última
      </button>
    </div>
  );
};

export default Pagination;
