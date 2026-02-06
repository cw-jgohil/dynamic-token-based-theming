
import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components";
import { useHome } from "./useHome";

const Home = () => {
  const { headers, rows, currentPage, totalPages, onPageChange, searchQuery, onSearchChange } = useHome();

  return (
    <div className="container my-5">
      <h1 className="mb-4">Components demo</h1>
      <div className="mb-3 d-flex justify-content-between">
        <Input
          startIcon={<i className="bi bi-search"></i>}
          placeholder="Search"
          className="azv-input-search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />


        <Button  variant="outline-warning" startIcon="plus">Hello</Button>



      </div>
      <Table aria-label="Data table" aria-rowcount={rows.length} aria-colcount={headers.length}>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headers.length} className="azv-table-empty">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} aria-rowindex={rowIndex + 1}>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showFirstLast
      />
    </div>
  );
};

export default Home;
