import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "../shared/lib/prisma";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    emailVerification: {
        autoSignInAfterVerification: true,
    },
    plugins: [nextCookies()]
})