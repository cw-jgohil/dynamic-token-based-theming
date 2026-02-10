export interface MenuItem {
  path: string;
  label: string;
  icon?: string;
}

export interface SidebarProps {
  menuItems: MenuItem[];
}
