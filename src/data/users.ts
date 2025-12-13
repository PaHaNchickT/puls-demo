import { User, UserRole } from "@/modules/users/types";

export const seedUsers: User[] = [
  {
    id: "u-1",
    name: "Иван Петров",
    email: "ivan.petrov@mail.ru",
    phone: "+7 912 111-22-33",
    role: UserRole.Admin,
    managerId: null,
  },
  {
    id: "u-2",
    name: "Ольга Смирнова",
    email: "olga.smirnova@gmail.com",
    phone: "+79122223344",
    role: UserRole.Manager,
    managerId: "u-1",
  },
  {
    id: "u-3",
    name: "Петр Иванов",
    email: "petr.ivanov@yandex.ru",
    phone: "+7 (912) 333 44 55",
    role: UserRole.User,
    managerId: "u-2",
  },
  {
    id: "u-4",
    name: "Анна К.",
    email: "anna.k@mail.ru",
    phone: "+7 912 444 55 66",
    role: UserRole.User,
    managerId: "u-2",
  },
  {
    id: "u-5",
    name: "Сергей П.",
    email: "sergey.p@rambler.ru",
    phone: "+7 912 555-66-77",
    role: UserRole.Manager,
    managerId: "u-1",
  },
];
