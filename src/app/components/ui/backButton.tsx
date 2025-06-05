'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';



export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan-500  transition-colors cursor-pointer"
            type="button"
        >
            <FaArrowLeft className='w-4 h-4'/>
        </button>
    );
}