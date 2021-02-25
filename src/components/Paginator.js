import ReactPaginate from 'react-paginate';


export const Paginator = ({ pageCount, onPageChange}) => {
    return (
        <ReactPaginate
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            pageClassName={'page-item'}
            previousClassName={'page-item'}
            containerClassName={'pagination'}
            pageLinkClassName={'page-link'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            previousLabel={'<<'}
            nextLabel={'>>'}
            nextClassName={'page-item'}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
      />
    )
}