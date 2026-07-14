export interface NavLinkItem {
  label: string;
  path: string;
}

export const navLinks: NavLinkItem[] = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/#features" },
  { label: "How it Works", path: "/#how-it-works" },
  { label: "About", path: "/#about" },
];
