 
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import UnauthorisedModal from "./components/ui/unauthorised"; 

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return( 
      <UnauthorisedModal 
        message={"You must be logged in to view this page."}
        showLoginButton={true} 
      />
    )
  }
  
  return (
    <div > 
         {/* User info */}

         {/* some charts showing productivity by story etc */}
    </div>
  );
}
