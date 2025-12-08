import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Public routes
  const publicPaths = ["/login", "/create-your-account"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));

  // Protected routes
  const protectedRoutes = ["/profile", "/myorder", "/create-book", "/dashboard"];
  const isProtected = protectedRoutes.some((p) => pathname.startsWith(p));

  // Not logged in → redirect to login
  if (!token && isProtected) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in → redirect from login/signup
  if (token && isPublic) {
    if (token.role === "admin") return NextResponse.redirect(new URL("/dashboard", req.url));
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Role-based access
  if (token && token.role) {
    if (token.role === "user" && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// ✅ Important: include all protected routes in matcher
export const config = {
  matcher: [
    "/profile/:path*",
    "/myorder/:path*",
    "/create-book/:path*",
    "/dashboard/:path*",
    "/login",
    "/create-your-account",
  ],
};
