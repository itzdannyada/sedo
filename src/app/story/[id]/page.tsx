import React from "react";

type Props = {
    params: { id: string };
};

const StoryPage = ({ params }: Props) => {
    const { id } = params;
    // TODO: Fetch story details using the id
    return (
        <main>
            <h1>Story ID: {id}</h1>
        </main>
    );
};

export default StoryPage;