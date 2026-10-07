export type NavItem = { label: string; href: string; engineerOnly?: boolean };

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Engineering", href: "/#engineering", engineerOnly: true },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Resume", href: "/resume" },
  { label: "GitHub", href: "/github" },
  { label: "Contact", href: "/#contact" },
];
