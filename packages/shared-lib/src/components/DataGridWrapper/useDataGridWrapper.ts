import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { DataGridWrapperPaginationConfig } from "./types";

export interface UseDataGridWrapperParams {
  rows: ReactNode[][];
  pagination?: DataGridWrapperPaginationConfig;
}

export interface UseDataGridWrapperResult {
  /** Rows to pass to DataGrid (either full list or current page slice). */
  paginatedRows: ReactNode[][];
  /** Current page (1-based). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Call when user changes page. */
  onPageChange: (page: number) => void;
  /** True when Pagination UI should be shown. */
  showPagination: boolean;
}

/**
 * Hook for DataGridWrapper business logic (pagination state and sliced rows).
 * Keep UI in DataGridWrapper.tsx; put data/event logic here.
 */
export function useDataGridWrapper({
  rows,
  pagination,
}: UseDataGridWrapperParams): UseDataGridWrapperResult {
  const pageSize = pagination?.pageSize ?? 0;
  const showPagination = pageSize > 0 && rows.length > pageSize;

  const totalPages = useMemo(
    () => (pageSize > 0 ? Math.max(1, Math.ceil(rows.length / pageSize)) : 1),
    [rows.length, pageSize],
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const onPageChange = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(totalPages, page)));
    },
    [totalPages],
  );

  const paginatedRows = useMemo(() => {
    if (!showPagination || pageSize <= 0) return rows;
    const start = (currentPage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, currentPage, pageSize, showPagination]);

  return {
    paginatedRows,
    currentPage,
    totalPages,
    onPageChange,
    showPagination,
  };
}
