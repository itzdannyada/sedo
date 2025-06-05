"use client"   
import React, { useState } from "react"; 
import { Session } from "next-auth"; 
import Image from "next/image";
import { FaSignOutAlt , FaSignInAlt } from "react-icons/fa"; 
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react"; 
import ConfirmationModal from "./confirmation";
import { MdOutlineTimer } from "react-icons/md";

interface NavProps{ 
    session: Session | null;
}

const Nav: React.FC<NavProps> = ({}) => {  
    const {data: session} = useSession();
    const pathname = usePathname();
    const [showConfirm, setShowConfirm] = useState(false);


    if (pathname === "/auth") {return null}; 

    const handleSignOut = async () => {
        setShowConfirm(true); // Show modal
    };

    const confirmSignOut = async () => {
        setShowConfirm(false);
        await signOut();
    };

    const cancelSignOut = () => {
        setShowConfirm(false);
    };
 
    return (
        <>
        <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-transparent border-b border-white/20 text-black shadow-sm shadow-cyan-500">
            <div className="w-[95%] mx-auto p-2 my-auto flex flex-row items-center justify-between">
            <div className="text-xl font-bold">
                <a
                    href={"/"}
                    className="flex items-center gap-1"
                    >
                    <MdOutlineTimer className="w-8 h-8 my-2"/>
                </a>
            </div>
            <ul className="flex gap-4 text-base font-medium text-md">
                 
                {!session?(<li >
                    <a
                    href={"/auth"}
                    className="hover:text-cyan-500 transition-colors flex items-center gap-1"
                    >
                    <span className="md:hidden"><FaSignInAlt   className="w-6 h-6" /></span>
                    <span className="hidden md:inline-flex items-center gap-1">
                        <FaSignInAlt   className="w-6 h-6" />
                        Log In
                    </span>
                    </a>
                </li> ):
                (<li>
                    <button 
                    onClick={handleSignOut}
                    className="hover:text-cyan-500 transition-colors flex items-center gap-1"
                    >
                    <span className="md:hidden"><FaSignOutAlt   className="w-6 h-6"/></span>
                    <span className="hidden md:inline-flex items-center gap-1">
                        <FaSignOutAlt   className="w-6 h-6"/>
                        Sign Out
                    </span>
                    </button>
                </li>)}
            </ul>
            </div>
        </div>
        <ConfirmationModal
            open={showConfirm}
            message="Are you sure you want to sign out?"
            onConfirm={confirmSignOut}
            onCancel={cancelSignOut}
        />
        </>
    );
};

export default Nav;
