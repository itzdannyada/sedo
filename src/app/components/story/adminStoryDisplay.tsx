'use client'
import React, { useState } from 'react';
import { Story, User } from '@/app/types';
import { useRouter } from 'next/navigation';

interface AdminStoryDisplayProps {
    users: User[]
    stories: Story[];
}

const AdminStoryDisplay: React.FC<AdminStoryDisplayProps> = ({ users, stories }) => {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    

    if (!stories.length) {
        return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg shadow-cyan-500 w-full text-white text-center">
            No stories to display.
        </div>
        );
    }

    const userEmailMap: Record<string, string> = users.reduce((acc, user) => {
        acc[String(user._id)] = user.email;
        return acc;
    }, {} as Record<string, string>);

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg shadow-cyan-500 w-full text-white">
            <h2 className="text-xl font-bold mb-4">All User Stories</h2>
            <div className="flex flex-col gap-2">
                {stories.map((story, idx) => (
                <div key={String(story._id)} className="">
                    <button
                    className={`w-full text-left py-4 px-2 gap-2 text-cyan-300 text-lg font-semibold focus:outline-none flex justify-between items-center transition-colors hover:bg-gray-700 ${openIndex === idx ? "rounded-t-xl bg-gray-700" : "rounded-xl"}`}
                    onClick={() => handleToggle(idx)}
                    aria-expanded={openIndex === idx}
                    >
                        <span >{story.title}</span> 
                        {userEmailMap[String(story.assignedUser)]?.split(',')[0]}
                        <span className="ml-2 text-cyan-400">{openIndex === idx ? '▲' : '▼'}</span>
                    </button>
                    {openIndex === idx && (
                    <div className="p-2 flex flex-col gap-2 animate-fade-in bg-gray-700 rounded-b-xl">
                        <p className="text-gray-300">{story.description}</p>
                        <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-400">
                            Status: <span className="font-medium text-white">{story.status}</span>
                        </span>
                        <button
                            onClick={() => router.push(`/story/${story._id}`)}
                            className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                        >
                            View Story
                        </button>
                        </div>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
};

export default AdminStoryDisplay;