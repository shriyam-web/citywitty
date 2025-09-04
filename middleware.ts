import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Sirf partner subdomain ke liye
  if (url.hostname === "partner.citywitty.com") {
    const path = url.pathname;

    // Agar static files (/_next, /api, /images, /favicon, etc.) hai → untouched
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

    // Agar /partner se start nahi ho raha → /partner ke andar rewrite karo
    if (!path.startsWith("/partner")) {
      url.pathname = `/partner${path}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
