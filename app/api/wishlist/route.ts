import { NextResponse } from "next/server";

const wishlist: string[] = [];

export async function POST(req: Request) {
  const { propertyId } = await req.json();

  if (!wishlist.includes(propertyId)) {
    wishlist.push(propertyId);
  }

  return NextResponse.json({ success: true });
}
