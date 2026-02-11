import type * as React from "react";

/** Variants for list item styling (maps to Bootstrap list-group-item-*). */
export const LISTVIEW_ITEM_VARIANTS = [
  "default",
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
] as const;

export type ListViewItemVariant = (typeof LISTVIEW_ITEM_VARIANTS)[number];

/** Column config for data-driven ListView. */
export interface ListViewColumn<T = Record<string, unknown>> {
  /** Key to read from each row object. */
  key: string;
  /** Optional header label (shown in header when showHeader is true). */
  label?: string;
  /** Optional custom render for the cell. */
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface ListViewProps<T = Record<string, unknown>>
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
  version?: string;

  /** Data-driven: rows to render (each row is an object; columns define keys). */
  rows?: T[];
  /** Data-driven: column definitions (key, optional label, optional render). */
  columns?: ListViewColumn<T>[];
  /** Whether to show column labels in thead. Default true when columns have labels. */
  showHeader?: boolean;
  /** Extract unique key for each row (default: index). */
  keyExtractor?: (row: T, index: number) => string | number;
  /** Row click handler (makes rows interactive). */
  onRowClick?: (row: T, index: number) => void;
  /** Index of the active/selected row. */
  activeIndex?: number;
  /** Message or node when rows are empty. */
  emptyMessage?: React.ReactNode;
  /** Optional variant per row (table row styling). */
  getRowVariant?: (row: T, index: number) => ListViewItemVariant | undefined;
  /** Optional disabled per row. */
  getRowDisabled?: (row: T, index: number) => boolean;

  /** Show search input above the table. */
  enableSearch?: boolean;
  /** Search input placeholder. */
  searchPlaceholder?: string;
  /** Controlled search value. */
  searchValue?: string;
  /** Search change handler (use with searchValue for controlled). */
  onSearchChange?: (value: string) => void;
  /** Custom filter: return true if row matches search term. Default: match any column string. */
  getSearchFilter?: (row: T, searchTerm: string) => boolean;

  /** Show pagination below the table. */
  enablePagination?: boolean;
  /** Rows per page when pagination enabled. Default 10. */
  pageSize?: number;
  /** Current page (1-based). Controlled when provided with onPageChange. */
  currentPage?: number;
  /** Page change handler. */
  onPageChange?: (page: number) => void;
  /** Pagination size: sm | md | lg. */
  paginationSize?: "sm" | "md" | "lg";
}

export interface ListViewHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
  version?: string;
}

export interface ListViewBodyProps
  extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
  version?: string;
  flush?: boolean;
  horizontal?: boolean;
  numbered?: boolean;
}

export interface ListViewItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
  version?: string;
  /** Visual variant (Bootstrap list-group-item-{variant}). */
  variant?: ListViewItemVariant;
  /** Actionable item (hover/active); use with as="a" or as="button". */
  action?: boolean;
  /** Active/selected state. */
  active?: boolean;
  /** Disabled state. */
  disabled?: boolean;
}

export interface ListViewItemHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  version?: string;
}

export interface ListViewItemTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  version?: string;
}

export interface ListViewEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  version?: string;
}
