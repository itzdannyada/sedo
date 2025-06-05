'use client'
import React, { useState } from 'react';
import { Story } from '@/app/types';
import { useRouter } from 'next/navigation';

interface UserStoryDisplayProps {
  stories: Story[];
}

const UserStoryDisplay: React.FC<UserStoryDisplayProps> = ({ stories }) => {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    

    if (!stories.length) {
        return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg shadow-cyan-500 w-full text-white text-center">
            No stories to display.
        </div>
        );
    }

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg shadow-cyan-500 w-full text-white">
            <h2 className="text-xl font-bold mb-4">Your Active User Stories</h2>
            <div className="flex flex-col gap-2">
                {stories.map((story, idx) => (
                <div key={String(story._id)} className="border-b border-cyan-900 last:border-none">
                    <button
                    className="w-full text-left py-4 px-2 gap-2 text-cyan-300 text-lg font-semibold focus:outline-none flex justify-between items-center transition-colors hover:bg-gray-700"
                    onClick={() => handleToggle(idx)}
                    aria-expanded={openIndex === idx}
                    >
                        <div className='flex items-center gap-4'>
                            <span >{story.title}</span>
                            <span className='ml-2'>Status: {story.status}</span>
                        </div>
                        <span className="ml-2 text-cyan-400">{openIndex === idx ? '▲' : '▼'}</span>
                    </button>
                    {openIndex === idx && (
                    <div className="px-2 pb-4 flex flex-col gap-2 animate-fade-in">
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

export default UserStoryDisplay;