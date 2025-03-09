import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { generateResponse, generateResponseWithImage } from '@/lib/chatbot';

// This is needed for handling form data in Next.js App Router
export const dynamic = 'force-dynamic';

export const POST = auth(async function POST(request: any) {
  try {
    const formData = await request.formData();
    const message = formData.get('message');
    const image = formData.get('image');

    let response;

    if (image && typeof image !== 'string') {
      // Handle request with image
      // Check if the image has arrayBuffer method (it's a Blob/File-like object)
      if (typeof image.arrayBuffer === 'function') {
        const buffer = Buffer.from(await image.arrayBuffer());
        const mimeType = image.type || 'image/jpeg'; // Default to jpeg if type is not available
        response = await generateResponseWithImage(
          message || '',
          buffer,
          mimeType
        );
      } else {
        return NextResponse.json(
          { error: 'Invalid image format' },
          { status: 400 }
        );
      }
    } else if (message) {
      // Handle text-only request
      response = await generateResponse(message);
    } else {
      return NextResponse.json(
        { error: 'No message or image provided' },
        { status: 400 }
      );
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
});
