import authConfig from '@/config/auth.config'
import NextAuth from 'next-auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, id: user.id }
            }
            return token
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.sub!
                session.user.name = token.name!
                session.user.email = token.email!
                session.user.image = token.picture!;
            }
            return session
        }
    },
    ...authConfig
})
