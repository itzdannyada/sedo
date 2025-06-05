import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId|string; 
    username?: string | null;
    email: string;
    passwordHash: string;
};

export interface Admin {
    _id: ObjectId|string; 
    userId: string;
    permissions: {
        timeLog: Record<"create" | "read" | "update" | "delete", boolean>;
        stories: Record<"create" | "read" | "update" | "delete", boolean>;
    }
};