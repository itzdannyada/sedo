import React from "react";
import clientPromise from "@/app/utils/mongo";
import { Story, TimeLog, User } from "@/app/types";
import { ObjectId } from "mongodb"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth"; 
import { redirect } from "next/navigation"; 

export default async function UserPage() { 

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }

  // Fetch the story from MongoDB
  const client = await clientPromise;
  const db = client.db("sedo");

  const user = (await db.collection<User>("users").find({ _id: new ObjectId(session.user._id)}).toArray()).map(log => ({
    ...log,
    _id: String(log._id) ,
  }));


  const timeLogs = (await db.collection<TimeLog>("timeLogs").find({ userId: String(session.user._id) }).toArray()).map(log => ({
    ...log,
    _id: String(log._id) ,
  }));

  const stories = (await db.collection<Story>("stories").find({ assignedUser: String(session.user._id) }).toArray()).map(story => ({
    ...story,
    _id: String(story._id)
  }));

  if (!user) {
    redirect("/auth");
  }

  console.log("User:", user);
  console.log("Time Logs:", timeLogs);
  console.log("Stories:", stories);

  return (
    <div className="w-full h-full space-y-4 p-2">
      
    </div>
  );
}