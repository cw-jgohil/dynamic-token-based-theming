import type { DataGridProps } from "@repo/ui";

/**
 * DataGridWrapper props. Extends DataGrid from @repo/ui with optional wrapper-specific props.
 */
export interface DataGridWrapperProps extends DataGridProps {
  /** Optional class name for the wrapper container */
  className?: string;
}
