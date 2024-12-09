import authConfig from '@/config/auth.config'
import NextAuth from 'next-auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user && account?.access_token) {
                token.accessToken = account.access_token
                token.provider = account.provider
                return { ...token, id: user.id }
            }
            return token
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.sub!
                session.user.name = token.name!
                session.user.email = token.email!
                session.user.image = token.picture!
                session.accessToken = token.accessToken
                session.provider = token.provider
            }
            return session
        }
    },
    ...authConfig
})
