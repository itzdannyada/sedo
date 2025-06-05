'use client'
import React from 'react';
import { TimeLog } from '@/app/types';

interface StoryTimeLogsProps { 
    logs: TimeLog[]; 
} 

const StoryTimeLogs: React.FC<StoryTimeLogsProps> = ({ logs }) => {

  if (!logs.length) {
    return (
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg shadow-cyan-500 w-full text-white text-center">
        No time logs for this story.
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg shadow-cyan-500 w-full text-white">
      <h2 className="text-xl font-bold mb-4">Time Logs</h2>
      <div className="flex flex-col gap-2">
        {logs.map((log, idx) => (
          <div
            key={String(log._id) || idx}
            className="border-b border-cyan-900 last:border-none py-2"
          >
            <div className="flex justify-between items-center">
              {/* <span className="text-cyan-300 font-semibold">
                {getUserEmail(users, String(log.userId))}
              </span> */}
              <span className="text-sm text-gray-400">
                {new Date(log.startTime).toLocaleString()} - {new Date(log.endTime).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-300">
                Duration: <span className="text-white font-medium">{log.duration} min</span>
              </span>
              {log.description && (
                <span className="text-gray-400 italic ml-4">{log.description}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryTimeLogs;