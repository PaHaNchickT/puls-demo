export enum UserRole {
  Admin = "Admin",
  Manager = "Manager",
  User = "User",
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  managerId: string | null;
};
