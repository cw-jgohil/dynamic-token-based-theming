import * as React from "react";
import { Input } from "../Input";
import { Pagination } from "../Pagination";
import { DEFAULT_LISTVIEW_ARIA_LABEL } from "./consts";
import type {
  ListViewBodyProps,
  ListViewColumn,
  ListViewEmptyProps,
  ListViewHeaderProps,
  ListViewItemHeadingProps,
  ListViewItemProps,
  ListViewItemTextProps,
  ListViewProps,
} from "./types";

function isDataDriven<T>(
  props: ListViewProps<T>,
): props is ListViewProps<T> & { rows: T[]; columns: ListViewColumn<T>[] } {
  return (
    Array.isArray(props.rows) &&
    Array.isArray(props.columns) &&
    props.columns.length > 0
  );
}

const ListViewInner = <T extends Record<string, unknown>>(
  props: ListViewProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    id,
    role,
    version,
    rows,
    columns,
    showHeader = true,
    keyExtractor,
    onRowClick,
    activeIndex,
    emptyMessage = "No items to display.",
    getRowVariant,
    getRowDisabled,
    enableSearch,
    searchPlaceholder = "Search...",
    searchValue: controlledSearchValue,
    onSearchChange,
    getSearchFilter,
    enablePagination,
    pageSize = 10,
    currentPage: controlledPage,
    onPageChange,
    paginationSize = "md",
    children,
    ...rest
  } = props;

  const versionClass = version ? `azv-listview-${version}` : "";

  const [internalSearch, setInternalSearch] = React.useState("");
  const [internalPage, setInternalPage] = React.useState(1);

  const searchValue =
    controlledSearchValue !== undefined ? controlledSearchValue : internalSearch;
  const setSearchValue =
    onSearchChange ?? ((v: string) => setInternalSearch(v));
  const currentPage =
    controlledPage !== undefined ? controlledPage : internalPage;
  const setCurrentPage =
    onPageChange ?? ((p: number) => setInternalPage(p));

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue]);

  if (isDataDriven(props)) {
    const dataRows = props.rows;
    const dataColumns = props.columns;
    const hasHeader =
      showHeader &&
      dataColumns.some((col) => col.label != null && col.label !== "");

    const filterRow = getSearchFilter
      ? (row: T) => getSearchFilter(row, searchValue.trim())
      : (row: T) => {
          const term = searchValue.trim().toLowerCase();
          if (!term) return true;
          return dataColumns.some((col) => {
            const v = (row as Record<string, unknown>)[col.key];
            return v != null && String(v).toLowerCase().includes(term);
          });
        };

    const filteredRows = dataRows.filter(filterRow);
    const totalPages = enablePagination
      ? Math.max(1, Math.ceil(filteredRows.length / pageSize))
      : 1;
    const page = Math.min(Math.max(1, currentPage), totalPages);
    const start = (page - 1) * pageSize;
    const paginatedRows = enablePagination
      ? filteredRows.slice(start, start + pageSize)
      : filteredRows;

    return (
      <div
        ref={ref}
        className={`azv-listview-wrapper ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel ?? DEFAULT_LISTVIEW_ARIA_LABEL}
        aria-labelledby={ariaLabelledBy}
        id={id}
        role={role ?? "region"}
        {...rest}
      >
        {enableSearch && (
          <div className={`azv-listview-toolbar ${versionClass}`}>
            <div className={`azv-listview-search-wrap ${versionClass}`}>
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                version={version}
                className="azv-listview-search-input"
                aria-label={searchPlaceholder}
              />
            </div>
          </div>
        )}
        <div className="azv-listview-table-wrap">
          <table
            className={`table azv-listview ${versionClass}`}
            role="table"
            aria-label={ariaLabel ?? DEFAULT_LISTVIEW_ARIA_LABEL}
          >
            {hasHeader && (
              <thead className={`azv-listview-thead ${versionClass}`}>
                <tr className={`azv-listview-row ${versionClass}`}>
                  {dataColumns.map((col) => (
                    <th
                      key={col.key}
                      scope="col"
                      className={`azv-listview-th ${versionClass}`}
                    >
                      {col.label ?? col.key}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className={`azv-listview-tbody ${versionClass}`}>
              {paginatedRows.length === 0 ? (
                <tr className={`azv-listview-row ${versionClass}`}>
                  <td
                    colSpan={dataColumns.length}
                    className={`azv-listview-empty ${versionClass}`}
                  >
                    {filteredRows.length === 0 && searchValue.trim()
                      ? "No results found."
                      : emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, index) => {
                  const key = keyExtractor
                    ? String(keyExtractor(row, index))
                    : index;
                  // const active = activeIndex === index; // active logic commented out
                  const disabled = getRowDisabled?.(row, index) ?? false;
                  const variant = getRowVariant?.(row, index);
                  const variantClass =
                    variant && variant !== "default"
                      ? `table-${variant}`
                      : "";

                  return (
                    <tr
                      key={key}
                      className={`azv-listview-row ${versionClass} ${variantClass} ${onRowClick && !disabled ? "azv-listview-row-action" : ""}`}
                      role="row"
                      aria-disabled={disabled ? true : undefined}
                      onClick={
                        onRowClick && !disabled
                          ? () => onRowClick(row, index)
                          : undefined
                      }
                      onKeyDown={
                        onRowClick && !disabled
                          ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onRowClick(row, index);
                              }
                            }
                          : undefined
                      }
                      tabIndex={onRowClick && !disabled ? 0 : undefined}
                    >
                      {dataColumns.map((col) => {
                        const value = (row as Record<string, unknown>)[col.key];
                        const content = col.render
                          ? col.render(value, row)
                          : value != null
                            ? String(value)
                            : "";
                        return (
                          <td
                            key={col.key}
                            className={`azv-listview-td ${versionClass}`}
                            role="cell"
                          >
                            {content}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {enablePagination && totalPages > 0 && (
          <div className={`azv-listview-pagination-wrap ${versionClass}`}>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              size={paginationSize}
              className="azv-listview-pagination"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`azv-listview ${versionClass}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel ?? DEFAULT_LISTVIEW_ARIA_LABEL}
      aria-labelledby={ariaLabelledBy}
      id={id}
      role={role}
      {...rest}
    >
      {children}
    </div>
  );
};

const ListView = React.forwardRef(ListViewInner) as <T extends Record<string, unknown>>(
  props: ListViewProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;
(ListView as React.ForwardRefExoticComponent<unknown>).displayName = "ListView";

const ListViewHeader = React.forwardRef<HTMLDivElement, ListViewHeaderProps>(
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
    const versionClass = version ? `azv-listview-${version}` : "";
    return (
      <div
        ref={ref}
        className={`azv-listview-header ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
        role={role}
        {...props}
      />
    );
  },
);
ListViewHeader.displayName = "ListViewHeader";

const ListViewBody = React.forwardRef<HTMLUListElement, ListViewBodyProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      id,
      role,
      version,
      flush,
      horizontal,
      numbered,
      ...props
    },
    ref,
  ) => {
    const versionClass = version ? `azv-listview-${version}` : "";
    const flushClass = flush ? "list-group-flush" : "";
    const horizontalClass = horizontal ? "list-group-horizontal" : "";
    const numberedClass = numbered ? "list-group-numbered" : "";
    return (
      <ul
        ref={ref}
        className={`list-group azv-listview-body ${flushClass} ${horizontalClass} ${numberedClass} ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
        role={role ?? "list"}
        {...props}
      />
    );
  },
);
ListViewBody.displayName = "ListViewBody";

const ListViewItem = React.forwardRef<HTMLLIElement, ListViewItemProps>(
  (
    {
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      id,
      role,
      version,
      variant = "default",
      action,
      active,
      disabled,
      ...props
    },
    ref,
  ) => {
    const versionClass = version ? `azv-listview-${version}` : "";
    const variantClass =
      variant !== "default" ? `list-group-item-${variant}` : "";
    const actionClass = action ? "list-group-item-action" : "";
    const activeClass = active ? "active" : "";
    const disabledClass = disabled ? "disabled" : "";
    return (
      <li
        ref={ref}
        className={`list-group-item azv-listview-item ${variantClass} ${actionClass} ${activeClass} ${disabledClass} ${versionClass}${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
        role={role}
        aria-current={active ? true : undefined}
        aria-disabled={disabled ? true : undefined}
        {...props}
      />
    );
  },
);
ListViewItem.displayName = "ListViewItem";

const ListViewItemHeading = React.forwardRef<
  HTMLHeadingElement,
  ListViewItemHeadingProps
>(({ className, as: Component = "h5", version, ...props }, ref) => {
  const versionClass = version ? `azv-listview-${version}` : "";
  return (
    <Component
      ref={ref}
      className={`list-group-item-heading azv-listview-item-heading ${versionClass}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
});
ListViewItemHeading.displayName = "ListViewItemHeading";

const ListViewItemText = React.forwardRef<
  HTMLParagraphElement,
  ListViewItemTextProps
>(({ className, version, ...props }, ref) => {
  const versionClass = version ? `azv-listview-${version}` : "";
  return (
    <p
      ref={ref}
      className={`list-group-item-text azv-listview-item-text ${versionClass}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
});
ListViewItemText.displayName = "ListViewItemText";

const ListViewEmpty = React.forwardRef<HTMLDivElement, ListViewEmptyProps>(
  ({ className, version, ...props }, ref) => {
    const versionClass = version ? `azv-listview-${version}` : "";
    return (
      <div
        ref={ref}
        className={`azv-listview-empty ${versionClass}${className ? ` ${className}` : ""}`}
        role="status"
        {...props}
      />
    );
  },
);
ListViewEmpty.displayName = "ListViewEmpty";

export {
  ListView,
  ListViewBody,
  ListViewEmpty,
  ListViewHeader,
  ListViewItem,
  ListViewItemHeading,
  ListViewItemText,
};
export type {
  ListViewBodyProps,
  ListViewEmptyProps,
  ListViewHeaderProps,
  ListViewItemHeadingProps,
  ListViewItemProps,
  ListViewItemTextProps,
  ListViewProps,
} from "./types";
