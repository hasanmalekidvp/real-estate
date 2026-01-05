import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/helper/authentication";

const bypassAuth = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (bypassAuth.some((api) => pathname.startsWith(api))) {
    return NextResponse.next();
  }

  const authStatus = await isAuthenticated(req);

  if (!authStatus.status) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
