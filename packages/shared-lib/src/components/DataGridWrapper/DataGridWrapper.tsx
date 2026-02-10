import { DataGrid, Pagination } from "@repo/ui";
import type { DataGridWrapperProps } from "./types";
import { useDataGridWrapper } from "./useDataGridWrapper";

/**
 * Shared wrapper around DataGrid from @repo/ui.
 * Root class: azv-datagrid-wrapper (Azavista CSS Framework).
 * Optional client-side pagination via pagination.pageSize.
 */
const DataGridWrapper = ({
  rows,
  headers,
  renderActions,
  className,
  pagination,
}: DataGridWrapperProps) => {
  const {
    paginatedRows,
    currentPage,
    totalPages,
    onPageChange,
    showPagination,
  } = useDataGridWrapper({ rows, pagination });

  const rootClass = ["azv-datagrid-wrapper", className].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      <DataGrid
        rows={paginatedRows}
        headers={headers}
        renderActions={renderActions}
      />
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default DataGridWrapper;
