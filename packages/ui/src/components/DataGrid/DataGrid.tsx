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
        version={props.version}
      >
        <TableHeader version={props.version}>
          <TableRow version={props.version}>
            {checkbox.visible && (
              <TableHead
                scope="col"
                className="azv-datagrid-checkbox-cell"
                version={props.version}
              >
                <Checkbox
                  ref={selectAllRef}
                  checked={checkbox.selectAllChecked}
                  onChange={checkbox.onSelectAllToggle}
                />
              </TableHead>
            )}
            {hasActions && <TableHead scope="col" version={props.version} />}
            {headers.map((header) => (
              <TableHead key={header} scope="col" version={props.version}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody version={props.version}>
          {rows.length === 0 ? (
            <TableRow version={props.version}>
              <TableCell
                colSpan={colCount}
                className="azv-table-empty"
                version={props.version}
              >
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
                  version={props.version}
                >
                  {checkbox.visible && (
                    <TableCell
                      className="azv-datagrid-checkbox-cell"
                      version={props.version}
                    >
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
                    <TableCell className="text-center" version={props.version}>
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
                      version={props.version}
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
