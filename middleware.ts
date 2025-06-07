/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export const config = {
  // matcher: [
  //   '/', 
  //   '/api',
  //   '/(tr|de|en|)/:path*',
  //   '/((?!_next|_vercel|.*\\..*).*)'
  // ]
    
  matcher: ['/api','/'],
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Loading", "true");
  return res;
}

export { auth } from "@/auth"
