import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = req.nextUrl.pathname;

  // If NOT authenticated → always redirect to login (except allowed pages)
  const publicPaths = ["/login", "/create-your-account"];
  const isPublic = publicPaths.some((p) => path.startsWith(p));

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in & visiting login/signup → redirect away
  if (token && isPublic) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Role-based protections
  if (token) {
    const role = token.role;

    // USER ROLE BLOCKED FROM ADMIN AREA
    if (role === "user" && path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ADMIN CAN ACCESS DASHBOARD
    if (role === "admin") {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", //
    "/login",
    "/create-your-account",
    "/",
  ],
};
