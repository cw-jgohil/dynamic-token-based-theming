export type PaginationSize = 'sm' | 'lg' | 'md';

export interface PaginationProps {
  /** Current active page (1-based index). */
  currentPage: number;
  /** Total number of pages available. */
  totalPages: number;
  /** Handler called when a new page is selected. */
  onPageChange: (page: number) => void;
  /** Optional size variant mapped to Bootstrap pagination sizes. */
  size?: PaginationSize;
  /** Optional additional class names for the root element. */
  className?: string;
  /** Whether to show "First" and "Last" controls. */
  showFirstLast?: boolean;
}

