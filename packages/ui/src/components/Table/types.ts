import type * as React from "react";

/** 508 compliance: table-level semantics and description */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  role?: string;
  "aria-rowcount"?: number;
  "aria-colcount"?: number;
  className?: string;
  version?: string;
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
  version?: string;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
  version?: string;
}

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
  version?: string;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  role?: string;
  "aria-rowindex"?: number;
  "aria-selected"?: boolean;
  className?: string;
  version?: string;
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  role?: string;
  "aria-sort"?: "ascending" | "descending" | "none" | "other";
  "aria-colindex"?: number;
  version?: string;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  role?: string;
  "aria-colindex"?: number;
  "aria-rowindex"?: number;
  version?: string;
}
