import { User, UserRoleEnum } from "@/types/user";

export const seedUsers: User[] = [
  {
    id: "6nj7NCHDktaHLsK01D9K3",
    name: "Иван Петров",
    email: "ivan.petrov@mail.ru",
    phone: "+7 912 111-22-33",
    role: UserRoleEnum.Admin,
    managerId: null,
    subordinates: ["hK5mpxjO89OJPDWfi7FYq	", "Ahtr1fLNmbUYyGO1GemGR"],
  },
  {
    id: "FSKa5cPMzHVsldivdvkuE",
    name: "Ольга Смирнова",
    email: "olga.smirnova@gmail.com",
    phone: "+79122223344",
    role: UserRoleEnum.Manager,
    managerId: "hK5mpxjO89OJPDWfi7FYq	",
    subordinates: [],
  },
  {
    id: "hK5mpxjO89OJPDWfi7FYq	",
    name: "Петр Иванов",
    email: "petr.ivanov@yandex.ru",
    phone: "+7 (912) 333 44 55",
    role: UserRoleEnum.User,
    managerId: "6nj7NCHDktaHLsK01D9K3",
    subordinates: ["FSKa5cPMzHVsldivdvkuE"],
  },
  {
    id: "Ahtr1fLNmbUYyGO1GemGR",
    name: "Анна К.",
    email: "anna.k@mail.ru",
    phone: "+7 912 444 55 66",
    role: UserRoleEnum.User,
    managerId: "6nj7NCHDktaHLsK01D9K3",
    subordinates: ["mk-vkACJBzufT8_MS79zB"],
  },
  {
    id: "mk-vkACJBzufT8_MS79zB",
    name: "Сергей П.",
    email: "sergey.p@rambler.ru",
    phone: "+7 912 555-66-77",
    role: UserRoleEnum.Manager,
    managerId: "Ahtr1fLNmbUYyGO1GemGR",
    subordinates: [],
  },
];
