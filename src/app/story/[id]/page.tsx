import React from "react";
import clientPromise from "@/app/utils/mongo";
import { Story, TimeLog } from "@/app/types";
import { ObjectId } from "mongodb";
import BackButton from "@/app/components/ui/backButton"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth"; 
import { redirect } from "next/navigation";
import StoryTimeLogs from "@/app/components/time/storyTimeLogs";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }

  // Fetch the story from MongoDB
  const client = await clientPromise;
  const db = client.db("sedo");
  const timeLogs = (await db.collection<TimeLog>("timeLogs").find({ storyId: id, userId: session.user._id }).toArray()).map(log => ({
    ...log,
    _id: String(log._id) ,
  }));

  const story = await db.collection<Story>("stories").findOne({ _id: new ObjectId(id) });

  if (!story) {
    return (
      <main className="p-8 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Story not found</h1>
      </main>
    );
  }

  return (
    <div className="w-full h-full space-y-4 p-2">
      <main className="bg-gray-800 rounded-xl shadow-lg shadow-cyan-500 w-full mx-auto text-white p-4">
        <div className="flex flex-row items-center justify-between mb-2">
          <h1 className="text-2xl font-bold flex-1">{story.title}</h1>
          <BackButton /> 
        </div>
        <p className="mb-2 text-white">{story.description}</p>
        <div className="mb-2">
          <span className="font-semibold text-cyan-400">Status:</span>{" "}
          <span className="text-white">{story.status}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-cyan-400">Assigned User:</span>{" "}
          <span className="text-white">{String(story.assignedUser)}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-cyan-400">Created At:</span>{" "}
          <span className="text-white">{story.createdAt ? new Date(story.createdAt).toLocaleString() : "N/A"}</span>
        </div>
        <div>
          <span className="font-semibold text-cyan-400">Updated At:</span>{" "}
          <span className="text-white">{story.updatedAt ? new Date(story.updatedAt).toLocaleString() : "N/A"}</span>
        </div>
      </main>
      <StoryTimeLogs logs={timeLogs} />
    </div>
  );
}