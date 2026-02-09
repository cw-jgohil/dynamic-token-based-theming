import { DataGrid } from "@repo/ui";
import type { DataGridWrapperProps } from "./types";

/**
 * Shared wrapper around DataGrid from @repo/ui.
 * Use this for consistent data grid usage across apps.
 */
const DataGridWrapper = ({
  rows,
  headers,
  renderActions,
  className,
}: DataGridWrapperProps) => {
  return (
    <div className={className}>
      <DataGrid rows={rows} headers={headers} renderActions={renderActions} />
    </div>
  );
};

export default DataGridWrapper;
