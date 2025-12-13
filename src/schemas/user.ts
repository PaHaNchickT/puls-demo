import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Имя должно быть минимум 2 символа"),
  email: z.string().email("Неверный формат email"),
  phone: z.string().min(6, "Телефон слишком короткий"),
  role: z.enum(["Admin", "Manager", "User"]),
  subordinates: z.array(z.string()),
});

export type UserFormData = z.infer<typeof userSchema>;
