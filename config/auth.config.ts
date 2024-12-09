import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default { providers: [
    Google,
    Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async(credentials) => {
            // TODO: https://authjs.dev/getting-started/authentication/credentials
            let user = null

            // logic to verify if the user exists
            // if (!user) {
            //     throw new Error('Invalid credentials')
            // }

            return user
        }
    })
] } satisfies NextAuthConfig
