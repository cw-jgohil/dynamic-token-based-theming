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
      version,
      ...props
    },
    ref,
  ) => {
    const versionClass = version
      ? `azv-table${version ? `-${version}` : ""}`
      : "";
      
    return (
      <div
        className={`azv-table-wrapper ${versionClass}${className ? ` ${className}` : ""}`}
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
    );
  },
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
      version,
      ...props
    },
    ref,
  ) => {
    const versionClass = version
      ? `azv-table${version ? `-${version}` : ""}`
      : "";

    return (
      <thead
        ref={ref}
        className={`azv-table-thead ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
        role={role}
        {...props}
      />
    );
  },
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
      version,
      ...props
    },
    ref,
  ) => {
    const versionClass = version
      ? `azv-table${version ? `-${version}` : ""}`
      : "";
    return (
      <tbody
        ref={ref}
        className={`azv-table-tbody ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
        role={role}
        {...props}
      />
    );
  },
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
      version,
      ...props
    },
    ref,
  ) => {
    const versionClass = version
      ? `azv-table${version ? `-${version}` : ""}`
      : "";
    return (
      <tfoot
        ref={ref}
        className={`azv-table-tfoot ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
        role={role}
        {...props}
      />
    );
  },
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
      version,
      ...props
    },
    ref,
  ) => {
    const versionClass = version
      ? `azv-table${version ? `-${version}` : ""}`
      : "";
    return (
      <tr
        ref={ref}
        className={`azv-table-row ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        id={id}
        role={role}
        aria-rowindex={ariaRowIndex}
        aria-selected={ariaSelected}
        {...props}
      />
    );
  },
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
      version,
      ...props
    },
    ref,
  ) => {
    const versionClass = version
      ? `azv-table${version ? `-${version}` : ""}`
      : "";
    return (
      <th
        ref={ref}
        className={`azv-table-th ${versionClass}${className ? ` ${className}` : ""}`}
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
    );
  },
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
      version,
      ...props
    },
    ref,
  ) => {
    const versionClass = version
      ? `azv-table${version ? `-${version}` : ""}`
      : "";
    return (
      <td
        ref={ref}
        className={`azv-table-td ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        id={id}
        role={role}
        aria-colindex={ariaColIndex}
        aria-rowindex={ariaRowIndex}
        {...props}
      />
    );
  },
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
