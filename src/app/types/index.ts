import { ObjectId } from "mongodb";

// This interface is used to define the structure of a user
export interface User {
    _id: ObjectId|string; 
    username?: string | null;
    email: string;
    passwordHash: string;
    permissions?: {
        timeLog?: Record<"create" | "read" | "update" | "delete", boolean>;
        story?: Record<"create" | "read" | "update" | "delete", boolean>;
    }
};

// This interface is used to define the structure of an admin user
export interface Admin {
    _id: ObjectId|string; 
    userId: string;
    permissions: {
        timeLog: Record<"create" | "read" | "update" | "delete", boolean>;
        story: Record<"create" | "read" | "update" | "delete", boolean>;
    }
};

// This interface is used to define the structure of a time log entry
export interface TimeLog {
    _id?: ObjectId|string; 
    userId: ObjectId|string; 
    storyId: ObjectId|string; 
    startTime: Date | string;
    endTime: Date | string;
    duration: number; 
    description?: string;
}

// This interface is used to define the structure of a story
export interface Story {
    _id?: ObjectId|string; 
    title: string;
    description?: string;
    status: "To Do" | "in-progress" | "done";
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignedUser: ObjectId|string; 
}