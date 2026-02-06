import { useCallback, useMemo } from "react";
import type React from "react";

import type { PaginationProps, PaginationSize } from "./types";

const getSizeClass = (size: PaginationSize | undefined) => {
  if (size === "sm") return "pagination-sm";
  if (size === "lg") return "pagination-lg";
  return "";
};

export const usePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  size = "md",
}: PaginationProps) => {
  const sizeClass = useMemo(() => getSizeClass(size), [size]);

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  const handlePageClick = useCallback(
    (page: number) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
      },
    [currentPage, onPageChange, totalPages],
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return {
    pages,
    sizeClass,
    handlePageClick,
    isFirstPage,
    isLastPage,
  };
};

