// src/components/Pagination.js
import React from 'react';

const Pagination = ({ totalRows, rowsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-center space-x-2 mt-4 float-left">
      <button
        className={`px-2 py-1 border ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'}`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-2 py-1 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`px-2 py-1 border ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'}`}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
