'use client'
import React, { useState } from 'react';
import { TimeLog, User, Story } from '@/app/types';
import { createTimeLog } from '@/app/actions/timelogs';
import toast from 'react-hot-toast';
// import { createTimeLog } from '@/app/actions/admin'; // Uncomment and implement this action

interface TimeLogFormProps {
  user: User;
  stories: Story[];
}

const initialState = {
  userId: '',
  storyId: '',
  durationInput: '', // e.g. "1h 30m"
  description: '',
};

function parseDuration(input: string): number {
  // Returns duration in minutes
  let total = 0;
  const hourMatch = input.match(/(\d+)\s*h/i);
  const minMatch = input.match(/(\d+)\s*m/i);
  if (hourMatch) total += parseInt(hourMatch[1], 10) * 60;
  if (minMatch) total += parseInt(minMatch[1], 10);
  // If only a number is entered, treat as minutes
  if (!hourMatch && !minMatch && /^\d+$/.test(input.trim())) {
    total += parseInt(input.trim(), 10);
  }
  return total;
}

const TimeLogForm: React.FC<TimeLogFormProps> = ({ user, stories }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      const endTime = new Date();
      const duration = parseDuration(form.durationInput);
      if (!duration || duration <= 0) {
        setError('Please enter a valid duration.');
        setLoading(false);
        return;
      }
      const startTime = new Date(endTime.getTime() - duration * 60000);

      const payload: Omit<TimeLog, '_id'> = {
        userId: user._id,
        storyId: form.storyId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration,
        description: form.description,
      };

      console.log('Submitting time log:', payload);  
      await createTimeLog(payload); // Uncomment when action is implemented
      setForm(initialState);
      toast.success('Time log created');
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
      <h2 className="text-white text-xl mb-2">Log Time</h2>
      <input type="hidden" name="userId" value={user._id.toString()} />
      <div className="text-white">
        User: <span className="font-semibold">{user.email}</span>
      </div>
      <label className="text-white">
        Story
        <select
          name="storyId"
          value={form.storyId}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Select a story</option>
          {stories.map((story) => (
            <option key={String(story._id)} value={String(story._id)}>
              {story.title}
            </option>
          ))}
        </select>
      </label>
      <label className="text-white">
        Duration
        <input
          type="text"
          name="durationInput"
          value={form.durationInput}
          onChange={handleChange}
          placeholder="e.g. 1h 30m or 90m"
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
      {error && <div className="text-red-400">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600"
      >
        {loading ? 'Saving...' : 'Log Time'}
      </button>
    </form>
  );
};

export default TimeLogForm;