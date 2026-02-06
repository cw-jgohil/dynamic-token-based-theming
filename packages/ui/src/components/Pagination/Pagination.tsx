import type { PaginationProps } from "./types";
import { usePagination } from "./usePagination";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  size = "md",
  className = "",
  showFirstLast = false,
}: PaginationProps) => {
  const { pages, sizeClass, handlePageClick, isFirstPage, isLastPage } =
    usePagination({
      currentPage,
      totalPages,
      onPageChange,
      size,
      className,
      showFirstLast,
    });

  return (
    <nav className={`azv-pagination ${className}`} aria-label="Pagination navigation">
      <ul className={`pagination mb-0 justify-content-end ${sizeClass}`}>
        <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={handlePageClick(currentPage - 1)}
            aria-label="Previous"
          >
            ‹
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button
              type="button"
              className="page-link"
              onClick={handlePageClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={handlePageClick(currentPage + 1)}
            aria-label="Next"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

