import type { ListViewColumn } from "@repo/ui";

export interface ListViewDemoRow {
  id: number;
  name: string;
  email: string;
  role: string;
}

/** Demo columns for ListView (matches table-style keys). */
export const LISTVIEW_COLUMNS: ListViewColumn<ListViewDemoRow>[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

/** Demo rows for ListView. */
export const LISTVIEW_ROWS: ListViewDemoRow[] = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Jones", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer" },
  { id: 4, name: "David Brown", email: "david@example.com", role: "User" },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", role: "User" },
];
