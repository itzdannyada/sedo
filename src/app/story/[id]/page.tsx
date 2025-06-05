import React from "react";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  // TODO: Fetch story details using the id
  return (
    <main>
      <h1>Story ID: {id}</h1>
    </main>
  );
}