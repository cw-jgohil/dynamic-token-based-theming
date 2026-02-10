import * as React from "react";
import { DEFAULT_TABLE_ARIA_LABEL } from "./consts";
import type {
  TableBodyProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
} from "./types";

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      id,
      role,
      "aria-rowcount": ariaRowCount,
      "aria-colcount": ariaColCount,
      tabIndex,
      ...props
    },
    ref,
  ) => (
    <div
      className={`azv-table-wrapper${className ? ` ${className}` : ""}`}
      tabIndex={tabIndex ?? -1}
      role="region"
      aria-label={ariaLabel ?? DEFAULT_TABLE_ARIA_LABEL}
    >
      <table
        ref={ref}
        className={`table azv-table`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        id={id}
        role={role}
        aria-rowcount={ariaRowCount}
        aria-colcount={ariaColCount}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      id,
      role,
      ...props
    },
    ref,
  ) => (
    <thead
      ref={ref}
      className={`azv-table-thead${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
      role={role}
      {...props}
    />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      id,
      role,
      ...props
    },
    ref,
  ) => (
    <tbody
      ref={ref}
      className={`azv-table-tbody${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
      role={role}
      {...props}
    />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      id,
      role,
      ...props
    },
    ref,
  ) => (
    <tfoot
      ref={ref}
      className={`azv-table-tfoot${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
      role={role}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      id,
      role,
      "aria-rowindex": ariaRowIndex,
      "aria-selected": ariaSelected,
      ...props
    },
    ref,
  ) => (
    <tr
      ref={ref}
      className={`azv-table-row${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      id={id}
      role={role}
      aria-rowindex={ariaRowIndex}
      aria-selected={ariaSelected}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      id,
      role,
      "aria-sort": ariaSort,
      "aria-colindex": ariaColIndex,
      scope = "col",
      ...props
    },
    ref,
  ) => (
    <th
      ref={ref}
      className={`azv-table-th${className ? ` ${className}` : ""}`}
      scope={scope}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      id={id}
      role={role}
      aria-sort={ariaSort}
      aria-colindex={ariaColIndex}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      id,
      role,
      "aria-colindex": ariaColIndex,
      "aria-rowindex": ariaRowIndex,
      ...props
    },
    ref,
  ) => (
    <td
      ref={ref}
      className={`azv-table-td${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      id={id}
      role={role}
      aria-colindex={ariaColIndex}
      aria-rowindex={ariaRowIndex}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

export {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
export type {
  TableBodyProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
};
