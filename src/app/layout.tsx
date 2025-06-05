import type { Metadata } from "next"; 
import "./globals.css";
import SessionProvider from "./components/session/sessionProvider"; 
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import Nav from "./components/ui/nav";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "TimeLogger",
  description: "Log your development time with ease",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);  
  return (
    <html lang="en">
      <body className="overflow-auto">
        <SessionProvider session={session}> 

          <Nav session={session}/>
          <main className="flex w-full h-full bg-gray-200 pt-20 pb-8 px-8">
            <div className="flex-1 overflow-y-auto">
              {children}  
              <Toaster 
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "#1e2939",
                    color: "white",
                    fontSize: "16px",
                    borderRadius: "8px",
                    padding: "16px",
                    border: "1px solid #00b8db",
                  },
                  success: {
                    iconTheme: {
                      primary: 'var(--color-green-500)',
                      secondary: 'var(--primary)',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: 'var(--color-red-500)',
                      secondary: 'var(--primary)',
                    },
                  },
                }}
              />
            </div>
          </main>
 
        </SessionProvider>
      </body>
    </html>
  );
}
