import { useCallback, useMemo, useState } from "react";
import {
  DATA_GRID_DEFAULT_PAGE_SIZE,
  DATA_GRID_DEFAULT_SEARCH_PLACEHOLDER,
} from "./consts";
import type { DataGridProps } from "./types";

/** Row with its original index (before filter/pagination). */
interface RowWithIndex {
  row: React.ReactNode[];
  originalIndex: number;
}

function stringifyRow(row: React.ReactNode[]): string {
  return row
    .map((cell) => (cell != null ? String(cell) : ""))
    .join(" ")
    .toLowerCase();
}

export interface DataGridSearchResult {
  visible: true;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export interface DataGridPaginationResult {
  visible: true;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export interface DataGridCheckboxResult {
  visible: true;
  selectedSet: Set<number>;
  rowOriginalIndices: number[];
  selectAllChecked: boolean;
  selectAllIndeterminate: boolean;
  onSelectAllToggle: () => void;
  onRowToggle: (originalIndex: number) => void;
}

export interface UseDataGridResult {
  rows: DataGridProps["rows"];
  headers: DataGridProps["headers"];
  renderActions: DataGridProps["renderActions"];
  hasActions: boolean;
  colCount: number;
  search: DataGridSearchResult | { visible: false };
  pagination: DataGridPaginationResult | { visible: false };
  checkbox: DataGridCheckboxResult | { visible: false };
  /** Original row indices for each rendered row (for aria/keys). */
  rowOriginalIndices: number[];
}

/**
 * Encapsulates DataGrid derived state and computations: search filter,
 * pagination slice, and checkbox selection. Keeps DataGrid.tsx presentational.
 */
export function useDataGrid(props: DataGridProps): UseDataGridResult {
  const {
    rows,
    headers,
    renderActions,
    enableSearch = false,
    searchPlaceholder,
    searchValue: controlledSearchValue,
    onSearchChange,
    enablePagination = false,
    pageSize = DATA_GRID_DEFAULT_PAGE_SIZE,
    currentPage: controlledPage,
    onPageChange,
    enableCheckbox = false,
    selectedRowIndices = [],
    onSelectionChange,
  } = props;

  const hasActions = typeof renderActions === "function";
  const colCount =
    headers.length + (hasActions ? 1 : 0) + (enableCheckbox ? 1 : 0);

  const [uncontrolledSearch, setUncontrolledSearch] = useState("");
  const [uncontrolledPage, setUncontrolledPage] = useState(1);

  const isSearchControlled =
    controlledSearchValue !== undefined && onSearchChange !== undefined;
  const searchValue = isSearchControlled
    ? controlledSearchValue
    : uncontrolledSearch;
  const setSearchValue = useCallback(
    (value: string) => {
      if (isSearchControlled) {
        onSearchChange(value);
      } else {
        setUncontrolledSearch(value);
        setUncontrolledPage(1);
      }
    },
    [isSearchControlled, onSearchChange],
  );

  const filteredRowsWithIndex: RowWithIndex[] = useMemo(() => {
    const withIndex: RowWithIndex[] = rows.map((row, i) => ({
      row,
      originalIndex: i,
    }));
    if (!enableSearch || !searchValue.trim()) {
      return withIndex;
    }
    const term = searchValue.trim().toLowerCase();
    return withIndex.filter(({ row }) => stringifyRow(row).includes(term));
  }, [rows, enableSearch, searchValue]);

  const totalFiltered = filteredRowsWithIndex.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));

  const isPaginationControlled =
    controlledPage !== undefined && onPageChange !== undefined;
  const currentPage = isPaginationControlled
    ? Math.min(Math.max(1, controlledPage), totalPages)
    : Math.min(uncontrolledPage, totalPages);
  const setCurrentPage = useCallback(
    (page: number) => {
      const clamped = Math.max(1, Math.min(page, totalPages));
      if (isPaginationControlled) {
        onPageChange(clamped);
      } else {
        setUncontrolledPage(clamped);
      }
    },
    [isPaginationControlled, onPageChange, totalPages],
  );

  const start = (currentPage - 1) * pageSize;
  const paginatedRowsWithIndex = useMemo(
    () => filteredRowsWithIndex.slice(start, start + pageSize),
    [filteredRowsWithIndex, start, pageSize],
  );

  const rowsToRender = useMemo(
    () => paginatedRowsWithIndex.map(({ row }) => row),
    [paginatedRowsWithIndex],
  );
  const rowOriginalIndices = useMemo(
    () => paginatedRowsWithIndex.map(({ originalIndex }) => originalIndex),
    [paginatedRowsWithIndex],
  );

  const selectedSet = useMemo(
    () => new Set(selectedRowIndices),
    [selectedRowIndices],
  );

  const selectAllChecked =
    enableCheckbox &&
    paginatedRowsWithIndex.length > 0 &&
    paginatedRowsWithIndex.every(({ originalIndex }) =>
      selectedSet.has(originalIndex),
    );
  const selectAllIndeterminate =
    enableCheckbox &&
    paginatedRowsWithIndex.some(({ originalIndex }) =>
      selectedSet.has(originalIndex),
    ) &&
    !selectAllChecked;

  const onSelectAllToggle = useCallback(() => {
    if (!onSelectionChange) return;
    const onPage = new Set(
      paginatedRowsWithIndex.map(({ originalIndex }) => originalIndex),
    );
    const next = new Set(selectedRowIndices);
    if (selectAllChecked || selectAllIndeterminate) {
      onPage.forEach((i) => next.delete(i));
    } else {
      onPage.forEach((i) => next.add(i));
    }
    onSelectionChange(Array.from(next));
  }, [
    onSelectionChange,
    paginatedRowsWithIndex,
    selectedRowIndices,
    selectAllChecked,
    selectAllIndeterminate,
  ]);

  const onRowToggle = useCallback(
    (originalIndex: number) => {
      if (!onSelectionChange) return;
      const next = new Set(selectedRowIndices);
      if (next.has(originalIndex)) {
        next.delete(originalIndex);
      } else {
        next.add(originalIndex);
      }
      onSelectionChange(Array.from(next));
    },
    [onSelectionChange, selectedRowIndices],
  );

  const search: UseDataGridResult["search"] = enableSearch
    ? {
        visible: true,
        placeholder: searchPlaceholder ?? DATA_GRID_DEFAULT_SEARCH_PLACEHOLDER,
        value: searchValue,
        onChange: setSearchValue,
      }
    : { visible: false };

  const pagination: UseDataGridResult["pagination"] = enablePagination
    ? {
        visible: true,
        currentPage,
        totalPages,
        pageSize,
        onPageChange: setCurrentPage,
      }
    : { visible: false };

  const checkbox: UseDataGridResult["checkbox"] =
    enableCheckbox && onSelectionChange
      ? {
          visible: true,
          selectedSet,
          rowOriginalIndices,
          selectAllChecked: selectAllChecked ?? false,
          selectAllIndeterminate: selectAllIndeterminate ?? false,
          onSelectAllToggle,
          onRowToggle,
        }
      : { visible: false };

  return {
    rows: rowsToRender,
    headers,
    renderActions,
    hasActions,
    colCount,
    search,
    pagination,
    checkbox,
    rowOriginalIndices,
  };
}
