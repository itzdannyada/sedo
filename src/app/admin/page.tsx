import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import UnauthorisedModal from "../components/ui/unauthorised";
import clientPromise from "../utils/mongo";
import { redirect } from "next/navigation";
import StoryForm from "../components/forms/story";
import { Admin, User } from "../types"; 

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/auth");
    }; 

    const client = await clientPromise;
    const db = client.db("sedo");
    const admin = await db.collection<Admin>("admins").findOne({ userId: String(session?.user._id) });
    
    if (!admin) {
        return( 
        <UnauthorisedModal 
            message={"You must be an admin to view this page."}
            showBackButton={true} 
        />
        )
    }

    const permissions = admin.permissions;

    const users = (await db.collection<User>("users").find().toArray()).map(user => ({
        ...user,
        _id: String(user._id)
    }));
  
    return (
        <div >  
            {permissions.story.create && (<StoryForm users={users}/>)} 
        </div>
    );
}
