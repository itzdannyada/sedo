'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

interface UnauthorisedModalProps {
    message?: string;  
    showLoginButton?: boolean; 
}

const UnauthorisedModal: React.FC<UnauthorisedModalProps> = ({
    message = "You are not authorised to view this page.",  
    showLoginButton = false, 
}) => { 
    const router = useRouter();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-60">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg shadow-red-500 w-full max-w-md">
                <div className="mb-6 text-white text-lg flex items-center gap-2">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9.5l5 5m0-5l-5 5" />
                    </svg>
                    {message}
                </div>
                <div className="flex justify-end gap-4">
                    {showLoginButton && (
                        <button
                            className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600"
                            onClick={()=>{router.push('/auth')}}
                            type="button"
                        >
                            Log In
                        </button>
                    )} 
                </div>
            </div>
        </div>
    );
};

export default UnauthorisedModal;