"use client"   
import React, { useState } from "react"; 
import { Session } from "next-auth";  
import { FaSignOutAlt , FaSignInAlt, FaUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react"; 
import ConfirmationModal from "./confirmation";
import { MdOutlineTimer } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";

interface NavProps{ 
    session: Session | null;
}

const Nav: React.FC<NavProps> = ({}) => {  
    const {data: session} = useSession(); 
    const [showConfirm, setShowConfirm] = useState(false); 

    const handleSignOut = async () => {
        setShowConfirm(true);
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
                    <MdOutlineTimer className="w-8 h-8 my-2"/> 
            </div> 
            <ul className="flex gap-4 text-base font-medium text-md">
                <li >
                    <a
                    href={"/"}
                    className="hover:text-cyan-500 transition-colors flex items-center gap-1"
                    >
                    <span className="md:hidden"><FaHouseChimney   className="w-6 h-6" /></span>
                    <span className="hidden md:inline-flex items-center gap-1">
                        <FaHouseChimney   className="w-6 h-6" />
                        Home
                    </span>
                    </a>
                </li>
                <li >
                    <a
                    href={"/dashboard"}
                    className="hover:text-cyan-500 transition-colors flex items-center gap-1"
                    >
                    <span className="md:hidden"><FaHouseChimney   className="w-6 h-6" /></span>
                    <span className="hidden md:inline-flex items-center gap-1">
                        <FaUser className="w-6 h-6" />
                        Dashboard
                    </span>
                    </a>
                </li>
                {session?.user.isAdmin&&(<li >
                    <a
                    href={"/admin"}
                    className="hover:text-cyan-500 transition-colors flex items-center gap-1"
                    >
                    <span className="md:hidden"><FaUserLock   className="w-6 h-6" /></span>
                    <span className="hidden md:inline-flex items-center gap-1">
                        <FaUserLock   className="w-6 h-6" />
                        Admin
                    </span>
                    </a>
                </li>)}
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
