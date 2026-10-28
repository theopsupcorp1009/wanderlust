import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
    import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {

const session = await auth.api.getSession({
    headers: await headers()
})

const user = session?.user;
if(!user){
  return NextResponse.redirect(new URL('/sign-in', request.url));
}

}

export const config = {
  matcher: [
    '/add-destination', 
    '/destinations', 
    '/destinations/:path', 
    '/my-bookings', 
    '/my-bookings/:path', 
    '/profile',
],
}