import z from "zod";

const userSchema = z.object({
    id: z.string().cuid(),
    name: z.string(),
    password: z.string().min(6),
    token: z.string().optional(),
    createdAt: z.date().default(() => new Date()).optional(),
    updatedAt: z.date().default(() => new Date()).optional(),
}).transform((data) => ({
  id: data.id,
  name: data.name,
  token: data.token,
}));

export type InputUser = z.input<typeof userSchema>;
export type OutputUser = z.output<typeof userSchema>;