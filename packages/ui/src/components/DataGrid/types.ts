import type { ReactNode } from "react";

export interface DataGridProps {
  rows: ReactNode[][];
  headers: string[];
  renderActions?: (row: ReactNode[]) => ReactNode;
}
