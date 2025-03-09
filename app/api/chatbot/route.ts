import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { generateResponseWithImage } from '@/lib/chatbot';

export const dynamic = 'force-dynamic';

export const POST = auth(async function POST(request: any) {
  try {
    const formData = await request.formData();
    const size = formData.get('size');
    const tone = formData.get('tone');
    const prompt = formData.get('prompt');
    const image = formData.get('image');

    let response;

    if (image && typeof image !== 'string') {
      if (typeof image.arrayBuffer === 'function') {
        const buffer = Buffer.from(await image.arrayBuffer());
        const mimeType = image.type || 'image/jpeg';
        response = await generateResponseWithImage({
          imageBuffer: buffer,
          mimeType,
          size,
          tone,
          prompt
        });
      } else {
        return NextResponse.json(
          { error: 'Invalid image format' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
});
