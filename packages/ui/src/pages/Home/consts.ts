import type { TableRowDatum } from "./types";

export const TABLE_HEADERS = ["#", "Name", "Email", "Phone", "Role", "Status"] as const;

export const ROWS_PER_PAGE = 5;

/** Table data: each row has id, name, email, phone, role, status. */
export const TABLE_ROW_DATA = [
  { id: "checkbox-1", name: "Alice", email: "alice@example.com", phone: "+1 555-0101", role: "Developer", status: "Active" },
  { id: "checkbox-2", name: "Bob", email: "bob@example.com", phone: "+1 555-0102", role: "Designer", status: "Active" },
  { id: "checkbox-3", name: "Charlie", email: "charlie@example.com", phone: "+1 555-0103", role: "Manager", status: "Away" },
  { id: "checkbox-4", name: "Diana", email: "diana@example.com", phone: "+1 555-0104", role: "Developer", status: "Active" },
  { id: "checkbox-5", name: "Eve", email: "eve@example.com", phone: "+1 555-0105", role: "QA", status: "Active" },
  { id: "checkbox-6", name: "Frank", email: "frank@example.com", phone: "+1 555-0106", role: "Designer", status: "Inactive" },
  { id: "checkbox-7", name: "Grace", email: "grace@example.com", phone: "+1 555-0107", role: "Manager", status: "Active" },
  { id: "checkbox-8", name: "Henry", email: "henry@example.com", phone: "+1 555-0108", role: "Developer", status: "Away" },
  { id: "checkbox-9", name: "Ivy", email: "ivy@example.com", phone: "+1 555-0109", role: "QA", status: "Active" },
  { id: "checkbox-10", name: "Jack", email: "jack@example.com", phone: "+1 555-0110", role: "Developer", status: "Active" },
] satisfies TableRowDatum[];
