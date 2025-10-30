'use client';

import { Issue, IssueStatus } from '../types';

interface IssueItemProps {
  issue: Issue;
  onStatusChange: (id: string, status: IssueStatus) => void;
  onDelete: (id: string) => void;
}

export default function IssueItem({ issue, onStatusChange, onDelete }: IssueItemProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const statusColors = {
    open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'in-progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{issue.title}</h3>
        <button
          onClick={() => onDelete(issue.id)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
        >
          Delete
        </button>
      </div>

      {issue.description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{issue.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[issue.priority]}`}>
          {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[issue.status]}`}>
          {issue.status === 'in-progress' ? 'In Progress' : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(issue.createdAt).toLocaleDateString()}
        </span>

        <select
          value={issue.status}
          onChange={(e) => onStatusChange(issue.id, e.target.value as IssueStatus)}
          className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>
  );
}
