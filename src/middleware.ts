import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only apply to /api/auth routes
export const config = {
  matcher: ["/api/auth/:path*"],
};

const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequests = 5;
const ipMap = new Map<string, { count: number; firstRequest: number }>();

export async function middleware(request: NextRequest) {

    if (process.env.NODE_ENV !== "production") {
        return NextResponse.next();
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';    
    const now = Date.now();
    const entry = ipMap.get(ip);

    if (!entry || now - entry.firstRequest > rateLimitWindowMs) {
        ipMap.set(ip, { count: 1, firstRequest: now });
    } else {
        if (entry.count >= maxRequests) {
        return new NextResponse("Too Many Requests", { status: 429 });
        }
        entry.count += 1;
        ipMap.set(ip, entry);
    }

    return NextResponse.next();
}