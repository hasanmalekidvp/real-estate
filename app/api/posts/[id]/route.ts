import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get method to update a post by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const postId = Number(id);

    // Validate ID
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Find post
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    // Post not found
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Success
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("GET /api/posts/[id] error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT method to update a post by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();
  const { title, content, authorId } = body;

  try {
    // Ensure 'id' is a valid number
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Find the post by ID
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update post details
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title || post.title,
        content: content || post.content,
        authorId: authorId || post.authorId,
      },
    });

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE method to delete a post by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const postId = parseInt(id);
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { message: "Post deleted successfully", post: deletedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Post not found or unable to delete" },
      { status: 404 }
    );
  }
}
