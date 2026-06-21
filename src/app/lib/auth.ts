import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockUsers } from "@/lib/mockData";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email.toLowerCase().trim();
                const password = credentials.password;

                // Admin bypass
                if (email === "admin@example.com" && password === "Admin@12345") {
                    return {
                        id: "user1",
                        email: "admin@example.com",
                        name: "Admin User",
                        role: "admin",
                    };
                }

                // Customer bypass
                if (email === "john@example.com" && password === "User@12345") {
                    return {
                        id: "user2",
                        email: "john@example.com",
                        name: "John Doe",
                        role: "user",
                    };
                }

                // Check other mock users
                const match = mockUsers.find((u) => u.email.toLowerCase() === email);
                if (match) {
                    return {
                        id: match._id,
                        email: match.email,
                        name: match.name,
                        role: match.role,
                    };
                }

                // Allow dynamic logins for convenience
                return {
                    id: "dynamic_" + Math.random().toString(36).substring(7),
                    email: email,
                    name: email.split("@")[0],
                    role: "user",
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET || "dummy-secret-value-for-nextauth-e-commerce",
};
