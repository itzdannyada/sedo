"use server"
import { Story } from "../types";

export async function createStory(story: Omit<Story, '_id' | 'createdAt' | 'updatedAt'>) {
    const authOptions = await import("../utils/auth").then(m => m.authOptions);
    const session = await import("next-auth").then(m => m.getServerSession(authOptions));
    if (!session) {
        throw new Error("You must be logged in to create a story.");
    }
    if (!session.user || !session.user._id) {
        throw new Error("Invalid user session.");
    }

    const client = await import("../utils/mongo").then(m => m.default);
    const db = client.db("sedo");
    const admin = await db.collection("admins").findOne({ userId: session.user._id });
    if (!admin) {
        throw new Error("You must be an admin to create a story.");
    }

    if (!admin.permissions.story.create) {
        throw new Error("You do not have admin permission to create stories.");
    }

    const newStory = {
        ...story,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const existing = await db.collection<Story>("stories").findOne({
        $or: [
            { title: story.title },
            { description: story.description }
        ]
    });
    if (existing) {
        throw new Error("A story with the same title or description already exists.");
    }
    
    const result = await db.collection<Story>("stories").insertOne(newStory);
    if (result){
        console.log("[CREATE STORY] Story created successfully:", String(result.insertedId));
        return {success: true, message: "Story created successfully"};
    }
};