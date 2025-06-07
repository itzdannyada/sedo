 
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth"; 
import UserStoryDisplay from "./components/story/userStoryDisplay";
import clientPromise from "./utils/mongo";
import { Admin, Story, User } from "./types";  
import { redirect } from "next/navigation"; 
import TimeLogForm from "./components/forms/timeLog";
import { ObjectId } from "mongodb";

export default async function Home() {
    // Ensure the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/auth");
    }


    // Fetch Data for components
    const client = await clientPromise;
    const db = client.db("sedo"); 
    const user = await db.collection<User>("users").findOne({ _id: new ObjectId(session.user._id) });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const admin = await db.collection<Admin>("admins").findOne({ userId: String(session.user._id) },{projection:{_id:0}});
    
    
    if (user) {
        user._id = user._id.toString();
        
    }


    const stories = (await db.collection<Story>("stories").find({
        assignedUser: session.user._id,
        status: { $in: ["To Do", "in-progress"] }
    }).toArray()).map(story => ({
        ...story,
        _id: story._id.toString(), // Convert ObjectId to string
        createdAt: String(story.createdAt), // Convert Date to string
        updatedAt: String(story.updatedAt)  // Convert Date to string
    }));

    return (
        <div className="space-y-8">
            <TimeLogForm user={user!} stories={stories} />
            <UserStoryDisplay stories={stories}/>
        </div>
    );
}
