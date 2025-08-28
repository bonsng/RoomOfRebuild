export type Item = {
  name: string;
  slug: string;
  disabled: boolean;
};

export const menus: Item[] = [
  { name: "About", slug: "about", disabled: false },
  { name: "Contact", slug: "contact", disabled: false },
  { name: "Login", slug: "login", disabled: false },
  { name: "Register", slug: "register", disabled: false },
];
