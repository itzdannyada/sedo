"use server"

import { TimeLog } from "../types";

export async function createTimeLog(timeLog:TimeLog) {
    const authOptions = await import("../utils/auth").then(m => m.authOptions);
    const session = await import("next-auth").then(m => m.getServerSession(authOptions));
    if (!session) {
        throw new Error("You must be logged in to create a time log.");
    }
    if (!session.user || !session.user._id) {
        throw new Error("Invalid user session.");
    }

    const client = await import("../utils/mongo").then(m => m.default);
    const db = client.db("sedo");

    const result = await db.collection<TimeLog>("timeLogs").insertOne(timeLog);
    if (result) {
        console.log("[CREATE TIMELOG] Time log created successfully:", String(result.insertedId));
        return { success: true, message: "Time log created successfully" };
    } else {
        throw new Error("Failed to create time log.");
    }
}