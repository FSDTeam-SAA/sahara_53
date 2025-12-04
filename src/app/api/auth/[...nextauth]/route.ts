// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// ------------------------------------------------------
// ⭐ Create proper interface for decoded JWT payload
// ------------------------------------------------------
interface DecodedToken {
  sub: string;   // user ID
  role: string;
  name: string;
  iat: number;
  exp: number;
}

// ------------------------------------------------------
// Extend NextAuth types
// ------------------------------------------------------
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name?: string;
    };
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    role: string;
    name?: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    name?: string;
    accessToken: string;
  }
}

// ------------------------------------------------------
// NextAuth Handler
// ------------------------------------------------------
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          console.log("auth login data:", data);

          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }

          const token = data.data?.token;
          if (!token) throw new Error("No token received");

          // ⭐ Decode token using the typed interface
          const decoded = jwtDecode<DecodedToken>(token);

          return {
            id: decoded.sub,
            email: credentials.email,
            role: decoded.role,
            name: decoded.name,
            token: token,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.name = token.name;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
