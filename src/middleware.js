import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl

    const auth = ['/', '/login', '/sign-up', '/forgot-password', '/reset-password', '/verify-otp']

    const cookieValue = request.cookies.get('cheeky')?.value

    const userDetail = cookieValue ? JSON?.parse(cookieValue) : undefined

    const isLoggin = userDetail ? true : false

    const userType = userDetail?.user?.role?.[0];

    if (isLoggin && auth.includes(pathname)) {
        if (userType === 'brandOwner') {
            return NextResponse.redirect(new URL('/market-place', request.url))
        }
        else if (userType === 'Influencer') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    } else if (!isLoggin && !auth.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/sign-up', '/forgot-password', '/reset-password', '/verify-otp', "/dashboard", "/all-chat", "/services", "/services/:path*", "/market-place/:path*", "/chat/:path*", "/wallet", "/profile", "/connection", "/request", "/orders"],
}
