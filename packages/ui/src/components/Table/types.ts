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
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
}

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
  role?: string;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  role?: string;
  "aria-rowindex"?: number;
  "aria-selected"?: boolean;
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  role?: string;
  "aria-sort"?: "ascending" | "descending" | "none" | "other";
  "aria-colindex"?: number;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  id?: string;
  role?: string;
  "aria-colindex"?: number;
  "aria-rowindex"?: number;
}

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  "aria-label"?: string;
  id?: string;
}
