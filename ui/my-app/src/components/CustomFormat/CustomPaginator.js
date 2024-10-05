import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPaginator = ({ data, entries, currentPage, paginate }) => {
    const totalPages = Math.ceil(data.length / entries);
    const paginationItems = [];

    paginationItems.push(
        <Pagination.First key="first" onClick={() => paginate(1)} className="rounded-circle" />,
        <Pagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="rounded-circle" />
    );

    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => paginate(i)}
                className="rounded-circle"
            >
                {i}
            </Pagination.Item>
        );
    }
    paginationItems.push(
        <Pagination.Next key="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="rounded-circle" />,
        <Pagination.Last key="last" onClick={() => paginate(totalPages)} className="rounded-circle" />
    );
    return (
        <Pagination className="rounded-circle">
            {paginationItems}
        </Pagination>
    );
};
export default CustomPaginator;
