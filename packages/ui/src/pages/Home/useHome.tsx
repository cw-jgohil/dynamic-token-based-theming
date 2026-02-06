import { Checkbox } from "../../components";
import type { ReactNode } from "react";
import { useState, useMemo, useCallback } from "react";
import { ROWS_PER_PAGE, TABLE_HEADERS, TABLE_ROW_DATA } from "./consts";
import type { TableRowDatum } from "./types";

function filterRowsBySearch(data: TableRowDatum[], query: string): TableRowDatum[] {
  const term = query.trim().toLowerCase();
  if (!term) return data;
  return data.filter(
    (row) =>
      row.name.toLowerCase().includes(term) ||
      row.email.toLowerCase().includes(term) ||
      row.phone.toLowerCase().includes(term) ||
      row.role.toLowerCase().includes(term) ||
      row.status.toLowerCase().includes(term),
  );
}

export function useHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const filteredData = useMemo(
    () => filterRowsBySearch(TABLE_ROW_DATA, searchQuery),
    [searchQuery],
  );

  const tableRows: ReactNode[][] = useMemo(
    () =>
      filteredData.map(({ id, name, email, phone, role, status }) => [
        <Checkbox key={id} id={id} />,
        name,
        email,
        phone,
        role,
        status,
      ]),
    [filteredData],
  );

  const totalPages = Math.max(1, Math.ceil(tableRows.length / ROWS_PER_PAGE));

  const paginatedRows = useMemo(
    () =>
      tableRows.slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE,
      ),
    [tableRows, currentPage],
  );

  return {
    headers: TABLE_HEADERS,
    rows: paginatedRows,
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
    searchQuery,
    onSearchChange,
  };
}
