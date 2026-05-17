import { NextRequest, NextResponse } from "next/server";

export  function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const cookie = req.cookies.get("better-auth.session_token")?.value;
    const notAuth = !cookie && pathname == "/";
    const authenticated = cookie && (pathname == "/login" || pathname == "/signup");
    if (!cookie && notAuth) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if(cookie  && authenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/verify-email", "/", "/signup", "/dashboard/:path*", "/settings/:path*"]
}