import { useState } from "react";
import { useAppSelector } from "../redux/store";
import "./CssBuilderPage.css";
import {
  ComponentKey,
  componentRegistry,
} from "../utils/json/componentsMapping";
import {
  LISTVIEW_COLUMNS,
  LISTVIEW_ROWS,
  type ListViewDemoRow,
} from "../constants/listview";

type CssBuilderPageProps = {
  previewDisabled: boolean;
};

const CssBuilderPage = ({ previewDisabled }: CssBuilderPageProps) => {
  const { selectedComponents, selectedVariant, selectedVersion } =
    useAppSelector((state) => state.components);
  const [listViewActiveIndex, setListViewActiveIndex] = useState<number>(0);
  const [paginationPage, setPaginationPage] = useState<number>(1);

  const selectedCompData = selectedComponents
    ? componentRegistry[selectedComponents["component-key"] as ComponentKey]
    : null;

  return (
    <div className="css-builder-container">
      <div className="css-builder-header">
        <h5 className="mb-0">CSS Builder</h5>
      </div>
      <div className="css-builder-content">
        {selectedCompData ? (
          <div className="css-builder-content-item m-2">
            {selectedComponents?.["component-key"] === "table" ? (
              <selectedCompData.component
                variant={selectedVariant}
                version={selectedVersion}
                rows={[
                  ["Action", "Name", "Email", "Role"],
                  ["Action", "Name", "Email", "Role"],
                  ["Action", "Name", "Email", "Role"],
                ]}
                headers={["Action", "Name", "Email", "Role"]}
                enableSearch={true}
                searchPlaceholder="Search..."
                enablePagination={true}
                pageSize={5}
                enableCheckbox={true}
              />
            ) : selectedComponents?.["component-key"] === "listview" ? (
              <div style={{ maxWidth: "480px" }}>
                <selectedCompData.component
                  version={selectedVersion}
                  rows={LISTVIEW_ROWS}
                  columns={LISTVIEW_COLUMNS}
                  showHeader={true}
                  enableSearch={true}
                  searchPlaceholder="Search team..."
                  enablePagination={true}
                  pageSize={2}
                  paginationSize="sm"
                  keyExtractor={(row: ListViewDemoRow) => row.id}
                  onRowClick={(
                    _row: ListViewDemoRow,
                    index: number,
                  ) => setListViewActiveIndex(index)}
                  activeIndex={listViewActiveIndex}
                  emptyMessage="No items to display."
                  aria-label="Team list"
                />
              </div>
            ) : selectedComponents?.["component-key"] === "input" ? (
              <div style={{ maxWidth: "320px" }}>
                <selectedCompData.component
                  version={selectedVersion}
                  placeholder="Type here..."
                  aria-label="Demo input"
                  disabled={previewDisabled}
                />
              </div>
            ) : selectedComponents?.["component-key"] === "pagination" ? (
              <selectedCompData.component
                version={selectedVersion}
                currentPage={paginationPage}
                totalPages={5}
                onPageChange={setPaginationPage}
                showFirstLast
              />
            ) : selectedComponents?.["component-key"] === "badge" ? (
              <div className="d-flex flex-wrap gap-2">
                <selectedCompData.component
                  variant={selectedVariant}
                  version={selectedVersion}
                  disabled={previewDisabled}
                >
                  {selectedVariant ?? "primary"} badge
                </selectedCompData.component>
              </div>
            ) : selectedComponents?.["component-key"] === "checkbox" ? (
              <selectedCompData.component
                label="Checkbox label"
                defaultChecked
                disabled={previewDisabled}
              />
            ) : selectedComponents?.["component-key"] === "select" ? (
              <div style={{ maxWidth: "320px" }}>
                <selectedCompData.component
                  version={selectedVersion}
                  defaultValue="option1"
                  aria-label="Demo select"
                  disabled={previewDisabled}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </selectedCompData.component>
              </div>
            ) : (
              <selectedCompData.component
                variant={selectedVariant}
                version={selectedVersion}
                disabled={previewDisabled}
              >
                {selectedCompData.label}
              </selectedCompData.component>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CssBuilderPage;
