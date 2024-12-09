import type { JWT } from "next-auth/jwt";

// Session を拡張
declare module "next-auth" {
    interface Session {
        accessToken: string;
        provider: string
    }
}

// JWT を拡張
declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        provider: string
    }
}