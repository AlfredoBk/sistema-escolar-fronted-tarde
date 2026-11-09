import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";


export async function proxy(request: NextRequest) {
    const isLoginPage = request.nextUrl.pathname === "/";
    const token = request.cookies.get("@gestao-escolar/token")?.value;

    if (!token) {
        return isLoginPage
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/", request.url));
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        if (isLoginPage) {
            return NextResponse.redirect(new URL("/perfil", request.url));
        }
        return NextResponse.next();
    } catch {
        if (isLoginPage) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/", "/perfil", "/alunos", "/cursos"],
};