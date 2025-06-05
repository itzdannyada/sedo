 
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth"; 
import UserStoryDisplay from "./components/story/userStoryDisplay";
import clientPromise from "./utils/mongo";
import { Story } from "./types";  
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/auth");
    }

    const client = await clientPromise;
    const db = client.db("sedo"); 
    const stories = await db.collection<Story>("stories").find({
        assignedUser: session.user._id,
        status: { $in: ["todo", "in-progress"] }
    }).toArray(); 

    return (
        <div >
            <UserStoryDisplay stories={stories}/>
        </div>
    );
}
