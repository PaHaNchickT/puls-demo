import { User, UserRole } from "@/modules/users/types";

export const seedUsers: User[] = [
  {
    id: "u-1",
    name: "Ivan Petrov",
    email: "ivan.petrov@example.com",
    phone: "+7 912 111-22-33",
    role: UserRole.Admin,
    managerId: null,
  },
  {
    id: "u-2",
    name: "Olga Smirnova",
    email: "olga.smirnova@example.com",
    phone: "+7 912 222-33-44",
    role: UserRole.Manager,
    managerId: "u-1",
  },
  {
    id: "u-3",
    name: "Petr Ivanov",
    email: "petr.ivanov@example.com",
    phone: "+7 912 333-44-55",
    role: UserRole.User,
    managerId: "u-2",
  },
  {
    id: "u-4",
    name: "Anna K.",
    email: "anna.k@example.com",
    phone: "+7 912 444-55-66",
    role: UserRole.User,
    managerId: "u-2",
  },
  {
    id: "u-5",
    name: "Sergey P.",
    email: "sergey.p@example.com",
    phone: "+7 912 555-66-77",
    role: UserRole.Manager,
    managerId: "u-1",
  },
];
