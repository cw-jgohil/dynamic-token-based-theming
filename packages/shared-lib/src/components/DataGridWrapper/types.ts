import type { DataGridProps } from "@repo/ui";

/**
 * Optional client-side pagination: slice rows by page and show Pagination UI.
 */
export interface DataGridWrapperPaginationConfig {
  /** Rows per page. When set, pagination UI is shown and rows are sliced. */
  pageSize: number;
}

/**
 * DataGridWrapper props. Extends DataGrid from @repo/ui with optional wrapper-specific props.
 */
export interface DataGridWrapperProps extends DataGridProps {
  /** Optional class name for the wrapper container */
  className?: string;
  /** Optional client-side pagination (slices rows and shows Pagination from @repo/ui). */
  pagination?: DataGridWrapperPaginationConfig;
}
