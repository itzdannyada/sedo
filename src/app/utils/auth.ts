import { DefaultSession, type NextAuthOptions } from "next-auth";  
import { DefaultJWT, JWT } from "next-auth/jwt";
import clientPromise from "./mongo";  
import Credentials from "next-auth/providers/credentials";
import { Admin, User } from "../types";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

  declare module "next-auth" {
    interface User {
      _id?: string|undefined;  
      email: string;
      password?: string;
    }
  
    interface Session {
      user: {
        _id: string|ObjectId;  
        email: string; 
        isAdmin?: boolean;
      } & DefaultSession['user'];
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      user: {
        _id: string|undefined; 
        username: string | null;
        email: string; 
        isAdmin?: boolean;
      } & DefaultJWT;
    }
  }
 
  
export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "username",
                },
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "email",
                },
                password: {
                    label: "password",
                    type: "text",
                    placeholder: "password",
                },
            },
            async authorize(
        credentials: Record<"email" | "password", string> | undefined
    ): Promise<{ id: string; email: string,} | null> {
        console.log("[AUTH] Starting authorize with credentials:", credentials);
        if (!credentials) return null;

        const client = await clientPromise;
        const db = client.db('sedo');
        console.log("[AUTH] Connected to MongoDB, checking for user:", credentials.email);

        // Find user by email or username
        const user = await db.collection<User>('users').findOne({ email: credentials.email });
        if (user) {
            // Compare password with hash
            console.log("[AUTH] User found?", !!user);
            const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
            console.log("[AUTH] Password valid?", isValid);
            if (!isValid) throw new Error("Passwords do not match"); 
            return {
                id: user._id.toString(), // Convert ObjectId to string
                email: user.email, 
            };
        } else {
            console.log("[AUTH] Registering new user:", credentials.email);
            // Register a new user with hashed password
            const passwordHash = await bcrypt.hash(credentials.password, 10);
            const newUser: User = {
                _id: new ObjectId(), // Use a unique identifier, e.g., timestamp
                email: credentials.email ?? "",
                passwordHash,
                permissions: {
                    story: {
                        create: false,
                        read: true,
                        update: false,
                        delete: false,
                    },
                    timeLog: {
                        create: false,
                        read: true,
                        update: false,
                        delete: false,
                    },
                },
            };

            await db.collection<User>("users").insertOne(newUser);
            console.log("[AUTH] New user inserted:", newUser);

            return {
                id: newUser._id.toString(),
                email: newUser.email ?? "",
            };
        }
    },
}),
    ],
    pages: {
        signIn: `/auth`, //route to custom auth page
    },

    session: { strategy: "jwt" },
    cookies: {},
    callbacks: {
        jwt: async ({ token, user, trigger, session }) => {
            const customToken = token as JWT;

            if (user) {
                console.log("[JWT CALLBACK] User present?", !!user, "User:", user);

                const client = await clientPromise;
                const db = client.db("sedo");

                // Check if user is an admin
                const adminRecord = await db.collection<Admin>("admins").findOne({ userId: user.id });
                console.log("[JWT CALLBACK] Admin record found?", !!adminRecord, "Admin:", adminRecord);
                const isAdmin = !!adminRecord;

                customToken.user = {
                _id: user.id ?? "",
                email: user.email,
                username: null,
                isAdmin: isAdmin,  // <--- Add isAdmin flag
                };

                console.log("[JWT CALLBACK] isAdmin?", isAdmin);
            }

            // Handle session update
            if (trigger === "update" && session?.user) {
                console.log(
                "[JWT CALLBACK] Session update triggered. Session user:",
                session?.user
                );
                customToken.user = { ...customToken.user, ...session.user };
            }

            return customToken;
        },
        session: async ({ session, token }) => {
            const customToken = token as JWT;

            session.user = {
                ...session.user,
                _id: customToken.user._id as string,
                email: customToken.user.email as string,
                isAdmin: customToken.user.isAdmin,
            }; 
            console.log("[SESSION CALLBACK] Returning session for user:", session.user);

            return session;
        },
    },
};