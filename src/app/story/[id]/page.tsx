import React from "react";

interface PageProps {
    params: { id: string };
}

const StoryPage: React.FC<PageProps> = ({ params }) => {
    const { id } = params;
    // TODO: Fetch story details using the id
    return (
        <main>
            <h1>Story ID: {id}</h1>
        </main>
    );
};

export default StoryPage;