import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export interface IDataPost {
  title: string;
  content: string;
  authorId?: number;
}

// GET method to get all users
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST method to create a new post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, authorId } = body;

    // Validate input
    if (!title || !content || !authorId) {
      return NextResponse.json({ error: "Missing post data" }, { status: 400 });
    }

    // Create the post in the database
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId, // This should correspond to an existing user ID
      },
    });

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
