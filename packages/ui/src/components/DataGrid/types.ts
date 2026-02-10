import type { ReactNode } from "react";

/** Optional search config. When enabled, rows are filtered by search term (cell content). */
export interface DataGridSearchConfig {
  /** Show search input above the table. */
  enableSearch?: boolean;
  /** Placeholder for the search input. */
  searchPlaceholder?: string;
  /** Controlled search value. When provided with onSearchChange, search is controlled. */
  searchValue?: string;
  /** Called when the user types in the search input. */
  onSearchChange?: (value: string) => void;
}

/** Optional pagination config. When enabled, only the current page of rows is shown. */
export interface DataGridPaginationConfig {
  /** Show pagination below the table. */
  enablePagination?: boolean;
  /** Number of rows per page. */
  pageSize?: number;
  /** Current page (1-based). Required when enablePagination and controlled. */
  currentPage?: number;
  /** Called when the user changes page. Required when enablePagination and controlled. */
  onPageChange?: (page: number) => void;
}

/** Optional row selection (checkboxes). Indices refer to original row order (before search/filter). */
export interface DataGridCheckboxConfig {
  /** Show checkbox column and row checkboxes. */
  enableCheckbox?: boolean;
  /** Currently selected row indices (original row indices). */
  selectedRowIndices?: number[];
  /** Called when selection changes (e.g. row toggle or select-all). */
  onSelectionChange?: (selectedIndices: number[]) => void;
}

export interface DataGridProps
  extends
    DataGridSearchConfig,
    DataGridPaginationConfig,
    DataGridCheckboxConfig {
  rows: ReactNode[][];
  headers: string[];
  renderActions?: (row: ReactNode[]) => ReactNode;
  version?: string;
}
