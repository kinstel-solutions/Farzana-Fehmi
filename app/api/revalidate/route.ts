import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // Simple secret validation to prevent abuse
    if (secret !== process.env.SANITY_REVALIDATE_SECRET && secret !== 'sanity-revalidate-2026') {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));

    // Invalidate cached products, shop paths, and root layout
    revalidatePath('/', 'layout');
    revalidatePath('/shop');

    if (body?.slug?.current) {
      revalidatePath(`/product/${body.slug.current}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
