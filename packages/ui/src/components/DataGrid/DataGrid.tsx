import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table";
import type { DataGridProps } from "./types";

const DataGrid = ({ rows, headers, renderActions }: DataGridProps) => {
  const hasActions = typeof renderActions === "function";

  return (
    <div>
      <Table
        aria-label="Data table"
        aria-rowcount={rows.length}
        aria-colcount={headers.length + (hasActions ? 1 : 0)}
      >
        <TableHeader>
          <TableRow>
            {hasActions && <TableHead></TableHead>}

            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length + (hasActions ? 1 : 0)}
                className="azv-table-empty"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} aria-rowindex={rowIndex + 1}>
                {hasActions && (
                  <TableCell className="text-center">
                    {renderActions(row)}
                  </TableCell>
                )}

                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} aria-colindex={cellIndex + 1}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataGrid;
