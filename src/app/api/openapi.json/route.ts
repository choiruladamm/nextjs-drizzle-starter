import { NextResponse } from 'next/server';
import { getOpenApiDocument } from '@/lib/api/openapi';

export async function GET() {
  try {
    const spec = getOpenApiDocument();
    return NextResponse.json(spec);
  } catch (error: any) {
    console.error('OpenAPI Generation Error:', error);
    return NextResponse.json(
      { error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
