export enum UserRoleEnum {
  Admin = "Admin",
  Manager = "Manager",
  User = "User",
}

export type UserRole = "Admin" | "Manager" | "User";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "Manager" | "User";
  managerId: string | null;
  subordinates: Array<string>;
};
