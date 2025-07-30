import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { Project } from '@/models/Project';

// GET a project by ID
export async function GET(_: NextRequest, context: { params: { id: string } }) {
  try {
    await connectMongo();

    const { id } = context.params;
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Error fetching project' }, { status: 500 });
  }
}

// PATCH a project by ID
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectMongo();

    const { id } = context.params;
    const updates = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ message: 'Error updating project' }, { status: 500 });
  }
}

// DELETE a project by ID
export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  try {
    await connectMongo();

    const { id } = context.params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Error deleting project' }, { status: 500 });
  }
}
