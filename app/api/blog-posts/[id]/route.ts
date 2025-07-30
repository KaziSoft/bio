//app/api/blog-posts/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';

// GET a blog post by ID
export async function GET(_: NextRequest, context: { params: { id: string } }) {
  await connectMongo();

  const { id } = context.params;
  const post = await BlogPost.findById(id);

  if (!post) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

// UPDATE a blog post by ID
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectMongo();

    const { id } = context.params;
    const data = await req.json();

    const updatedPost = await BlogPost.findByIdAndUpdate(id, data, { new: true });

    if (!updatedPost) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ message: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE a blog post by ID
export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  try {
    await connectMongo();

    const { id } = context.params;
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Failed to delete post' }, { status: 500 });
  }
}
