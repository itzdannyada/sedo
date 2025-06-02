import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation"; 
import AuthForm from "../components/forms/auth";

export default async function AuthPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center">  
            <AuthForm />  
        </div>
    );
}