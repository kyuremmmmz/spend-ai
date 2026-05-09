import { z } from "zod";

const auth = z.object({
    fullname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
})

export type Auth = z.infer<typeof auth>;