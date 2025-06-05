interface PageProps {
    params: { id: string };
}

export default async function StoryPage({ params }: PageProps) {
    const { id } = await params;
    //TODO: Fetch story details using the id
    return (
        <main>
            <h1>Story ID: {id}</h1>
        </main>
    );
}