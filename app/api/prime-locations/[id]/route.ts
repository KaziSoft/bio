import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { PrimeLocation } from '@/models/PrimeLocation';

// PATCH: Update a prime location
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectMongo();

    const { id } = context.params;
    const body = await req.json();

    const updated = await PrimeLocation.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ message: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Location updated', location: updated });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

// DELETE: Remove a prime location
export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  try {
    await connectMongo();

    const { id } = context.params;
    const location = await PrimeLocation.findByIdAndDelete(id);

    if (!location) {
      return NextResponse.json({ message: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
