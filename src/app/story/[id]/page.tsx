interface PageProps {
    params: { id: string };
}

export default function StoryPage({ params }: PageProps) {
    const { id } = params;
    //TODO: Fetch story details using the id
    return (
        <main>
            <h1>Story ID: {id}</h1>
        </main>
    );
}