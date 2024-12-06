import NextAuth from 'next-auth'
import authConfig from './config/auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { auth as appAuth } from '@/lib/auth'

const { auth } = NextAuth(authConfig)
export default auth(async (req: NextRequest) => {
        const session = await appAuth()

        const isAuthPage =
        req.nextUrl.pathname.startsWith('/login') ||
        req.nextUrl.pathname.startsWith('/register');

        if (isAuthPage) {
            if (session) {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }
            return NextResponse.next();
        }
        if (!session) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        return NextResponse.next();
    }
)

export const config = {
    matcher: ['/dashboard/:path', '/report/:path', '/login', '/register'],
};