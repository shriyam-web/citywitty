import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.hostname === "partner.citywitty.com") {
    const path = url.pathname;

    if (
      path.startsWith("/_next") ||
      path.startsWith("/api") ||
      path.startsWith("/images") ||
      path.endsWith(".png") ||
      path.endsWith(".jpg") ||
      path.endsWith(".jpeg") ||
      path.endsWith(".svg") ||
      path.endsWith(".ico")
    ) {
      return NextResponse.next();
    }

    if (!path.startsWith("/partner")) {
      url.pathname = `/partner${path}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
