import React from 'react'
import ReactPaginate from 'react-paginate';

function Pagination({pageCount, handlePageChange, currentPage}) {
    
  return (
    <ReactPaginate
    previousLabel={'Previous'}
    nextLabel={'Next'}
    pageCount={pageCount}
    onPageChange={handlePageChange}
        containerClassName="flex my-3 mr-1 rounded"
        pageClassName="px-3 py-2 border-e-2 bg-gray-300 hover:bg-[#c3c3c3] text-gray-700 cursor-pointer"
        breakClassName="px-3 py-2 bg-gray-300 text-gray-700"
        previousClassName={`px-6 rounded-s-lg border-e-2 py-2 ${currentPage === 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
          }`}
        nextClassName={`px-3 py-2 rounded-r-lg ${currentPage === pageCount
          ? 'bg-gray-300 text-gray-500  cursor-not-allowed'
          : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
          }`}
        activeClassName="px-3 py-2 bg-blue-500 text-white hover:bg-[#c3c3c3]"
        pageLinkClassName="w-8 h-4 flex items-center justify-center"
        previousLinkClassName="w-8 h-4 flex items-center justify-center"
        nextLinkClassName="w-8 h-4 flex items-center justify-center"
      />
  )
}

export default Pagination