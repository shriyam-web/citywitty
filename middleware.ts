import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Agar request partner.citywitty.com se aayi hai
  if (url.hostname === "partner.citywitty.com") {
    // Path ko hamesha /partner se start karwao
    if (!url.pathname.startsWith("/partner")) {
      url.pathname = `/partner${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
