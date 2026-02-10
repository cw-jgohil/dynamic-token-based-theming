import { useRef, useEffect } from "react";
import { Input } from "../Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table";
import { Pagination } from "../Pagination";
import { DATA_GRID_EMPTY_MESSAGE } from "./consts";
import type { DataGridProps } from "./types";
import { useDataGrid } from "./useDataGrid";
import { Checkbox } from "../Checkbox";

const DataGrid = (props: DataGridProps) => {
  const {
    rows,
    headers,
    renderActions,
    hasActions,
    colCount,
    search,
    pagination,
    checkbox,
    rowOriginalIndices,
  } = useDataGrid(props);

  const selectAllRef = useRef<HTMLInputElement>(null);

  const selectAllIndeterminate =
    checkbox.visible && checkbox.selectAllIndeterminate;

  useEffect(() => {
    const el = selectAllRef.current;
    if (!el) return;
    el.indeterminate = selectAllIndeterminate ?? false;
  }, [selectAllIndeterminate]);

  return (
    <div className="azv-datagrid">
      {search.visible && (
        <div className="azv-datagrid-search mb-2">
          <Input
            type="search"
            placeholder={search.placeholder}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            aria-label="Search table"
          />
        </div>
      )}

      <Table
        aria-label="Data table"
        aria-rowcount={rows.length}
        aria-colcount={colCount}
      >
        <TableHeader>
          <TableRow>
            {checkbox.visible && (
              <TableHead scope="col" className="azv-datagrid-checkbox-cell">
                <Checkbox
                  ref={selectAllRef}
                  checked={checkbox.selectAllChecked}
                  onChange={checkbox.onSelectAllToggle}
                />
              </TableHead>
            )}
            {hasActions && <TableHead scope="col" />}
            {headers.map((header) => (
              <TableHead key={header} scope="col">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colCount} className="azv-table-empty">
                {DATA_GRID_EMPTY_MESSAGE}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => {
              const originalIndex = rowOriginalIndices[rowIndex] ?? rowIndex;
              const isSelected =
                checkbox.visible && checkbox.selectedSet.has(originalIndex);
              return (
                <TableRow
                  key={originalIndex}
                  aria-rowindex={rowIndex + 1}
                  aria-selected={checkbox.visible ? isSelected : undefined}
                >
                  {checkbox.visible && (
                    <TableCell className="azv-datagrid-checkbox-cell">
                      <input
                        type="checkbox"
                        className="form-check-input azv-checkbox__input"
                        aria-label={`Select row ${rowIndex + 1}`}
                        checked={isSelected}
                        onChange={() => checkbox.onRowToggle(originalIndex)}
                      />
                    </TableCell>
                  )}
                  {hasActions && renderActions && (
                    <TableCell className="text-center">
                      {renderActions(row)}
                    </TableCell>
                  )}
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      aria-colindex={
                        (checkbox.visible ? 1 : 0) +
                        (hasActions ? 1 : 0) +
                        cellIndex +
                        1
                      }
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {pagination.visible && (
        <div className="azv-datagrid-pagination mt-2">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default DataGrid;
