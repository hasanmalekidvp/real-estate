import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export interface IDataUser {
  email: string;
  name: string;
  password: string;
}

// GET method to get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST method to create a new user with hashed password
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    // Validate input
    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing user data" }, { status: 400 });
    }

    // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the user in the database with the hashed password
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword, // Store the hashed password
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
