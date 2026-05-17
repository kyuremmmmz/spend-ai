
"use server"
import { auth } from "@/lib/auth"
import { AuthState, SignUpState } from "../models/types";
import { authLogin, authSignup } from "../models/zod";
import { permanentRedirect, redirect } from "next/navigation";
import { headers } from "next/headers";


export async function signOut() {
    await auth.api.signOut({
        headers: await headers()
    });
    permanentRedirect("/")
}


export async function signUp(_state: SignUpState, data: FormData) {
    const formData = Object.fromEntries(data.entries());
    
    const validated = authSignup.safeParse(formData);


    if (!validated.success) {
        return {
            errors: validated.error.flatten().fieldErrors,
        }
    }

    const signUser = await auth.api.signUpEmail({
        body: {
            name: data.get("name") as string,
            email: data.get("email") as string,
            password: data.get("password") as string,
        }
    });
    return {
        user: signUser.user,
        session: signUser.token
    }
}

export async function signIn(_state: AuthState,data: FormData) {
    const formData = Object.fromEntries(data.entries());

    const validated = authLogin.safeParse(formData);
    
    if (!validated.success) { 
        return {
            errors: validated.error.flatten().fieldErrors
        }
    }

    await auth.api.signInEmail({
        body: {
            email: data.get("email") as string,
            password: data.get("password") as string,
        }
    });
    redirect("/")
    
}
