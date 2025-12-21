import { NextRequest, NextResponse } from "next/server";

export function middleware(requeest: NextRequest) {
  const token = requeest.cookies.get("token")?.value;

  if (token) {
    return NextResponse.next();
  }

  const url = new URL(requeest.url);
  url.pathname = "/login";
  return NextResponse.redirect(url.toString());
}

export const config = {
  matcher: ["/add-property/:path*"],
};
