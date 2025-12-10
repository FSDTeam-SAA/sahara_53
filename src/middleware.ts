import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    // Public routes (authentication pages)
    const publicPaths = ["/login", "/create-your-account"];
    const isPublic = publicPaths.some((p) => pathname.startsWith(p));

    // Protected routes (require authentication)
    const protectedRoutes = [
      "/profile",
      "/myorder",
      "/create-book",
      "/dashboard",
    ];
    const isProtected = protectedRoutes.some((p) => pathname.startsWith(p));

    // 1. Not logged in AND trying to access protected route → redirect to login
    if (!token && isProtected) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Logged in AND trying to access public auth pages → redirect away
    if (token) {
      if (isPublic) {
        // Redirect admins to dashboard, regular users to home
        const redirectPath = token.role === "admin" ? "/dashboard" : "/";
        return NextResponse.redirect(new URL(redirectPath, req.url));
      }

      // 3. Role-based access control: dashboard only for admins
      if (pathname.startsWith("/dashboard") && token.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, allow request to proceed (fail open)
    return NextResponse.next();
  }
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
