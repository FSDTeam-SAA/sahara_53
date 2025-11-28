// types.ts (or inside the component file)
export interface MenuItem {
  href: string;
  label: string;
  icon?: string; // optional icon
}

export interface ResponsiveMenuProps {
  menuItems: MenuItem[];
  logo: string;
  contactLink?: string; // optional contact button
}
