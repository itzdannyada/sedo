'use client'
import React, { useState } from 'react';
import { Story, User } from '@/app/types';
import { createStory } from '@/app/actions/admin';

interface StoryFormProps {
    users: User[];
}

const initialState: Omit<Story, '_id' | 'createdAt' | 'updatedAt'> = {
    title: '',
    description: '',
    status: 'To Do',
    assignedUser: '',
};

const StoryForm: React.FC<StoryFormProps> = ({users}) => {
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createStory(form)
            setForm(initialState); // Reset form on success
        } catch (error) {
            setError(String(error));
            setLoading(false);
            return;
        } finally {
            setLoading(false); 
        }

        
    };

    return (
        <form
            className="bg-gray-800 p-8 rounded-xl shadow-lg shadow-cyan-500 w-full flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <h2 className="text-white text-xl mb-2">Create Story</h2>
            <label className="text-white">
                Title
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
                />
            </label>
            <label className="text-white">
                Description
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
                />
            </label>
            <label className="text-white">
                Status
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
                >
                    <option value="To Do">To Do</option>
                    <option value="in-progress">In Progress</option>
                </select>
            </label>
            <label className="text-white">
    Assigned User
    <select
        name="assignedUser"
        value={form.assignedUser ? form.assignedUser.toString() : ""}
        onChange={handleChange}
        required
        className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
    >
        <option value="">Select a user</option>
        {users.map((user) => (
            <option key={String(user._id)} value={String(user._id)}>
                {user.email}
            </option>
        ))}
    </select>
</label>
            {error && <div className="text-red-400">{error}</div>}
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600"
            >
                {loading ? 'Saving...' : 'Create Story'}
            </button>
        </form>
    );
};

export default StoryForm;