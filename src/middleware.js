import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const isAdmin = role === "admin";
  const isUser = role === "user";

  const { pathname } = req.nextUrl;

  const protectedAdminPaths = ["/customers", "/users", "/transactions"];

  const protectedPaths = [
    "/bank-accounts",
    "/customers",
    "/bank-accounts",
    "/users",
    "/transactions",
    "/dashboard",
  ];

  if (!isUser && token && pathname === "/bank-accounts") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Detail transaction page for non-admin users
  if (!isUser && token && pathname.startsWith("/transactions/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users from protected paths to login page
  if (!token && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect logged-in users from login page to dashboard
  if (token && (pathname === "/auth/login" || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect non-admin users to dashboard
  if (!isAdmin && token && protectedAdminPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/dashboard/:path*",
    "/customers/:path*",
    "/bank-accounts/:path*",
    "/users/:path*",
    "/transactions/:path*",
  ],
};
