import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.AUTH_TOKEN;

  // Check if the header exists and matches "Bearer <YOUR_TOKEN>"
  if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
        { error: 'Unauthorized access.' },
        { status: 401 }
    );
  }
}
 
export const config = {
  matcher: '/api/:path*',
}