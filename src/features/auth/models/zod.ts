import { z } from "zod";

export const authSignup = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const authLogin = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

export type Auth = z.infer<typeof authSignup>;

export type AuthLogin = z.infer<typeof authLogin>;