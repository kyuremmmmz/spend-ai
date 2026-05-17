import { headers } from "next/headers";
import { auth } from "../../lib/auth";

export async function getSession() {
    'use server'
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session;
}


export async function isUserVerified() {
    'use server'
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.user?.emailVerified;
}

export async function getUserData() {
    'use server'
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.user;
}