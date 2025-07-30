export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import NewsEvent from '@/models/NewsEvent';

export async function GET(_: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const item = await NewsEvent.findById(params.id);
    if (!item) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const body = await req.json();
    const { type, title, date, summary, location, image } = body;

    const updated = await NewsEvent.findByIdAndUpdate(
      params.id,
      {
        type,
        title,
        date,
        summary,
        location: type === 'event' ? location : '',
        image,
      },
      { new: true }
    );

    if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ message: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: any }) {
  try {
    await connectMongo();
    const deleted = await NewsEvent.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Failed to delete' }, { status: 500 });
  }
}
