import z from "zod";

const userSchema = z.object({
    id: z.string().cuid(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
}).transform((data) => ({
  id: data.id,
  name: data.name,
  email: data.email,
  token: z.string().optional()
}));

export type InputUser = z.input<typeof userSchema>;
export type OutputUser = z.output<typeof userSchema>;