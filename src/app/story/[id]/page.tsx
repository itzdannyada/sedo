import React from "react";

const StoryPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    // TODO: Fetch story details using the id
    return (
        <main>
            <h1>Story ID: {id}</h1>
        </main>
    );
};

export default StoryPage;