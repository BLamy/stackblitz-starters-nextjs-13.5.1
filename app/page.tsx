'use client';

import { useState } from 'react';
import { Issue, IssueStatus, IssuePriority } from './types';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filter, setFilter] = useState<IssueStatus | 'all'>('all');

  const handleCreateIssue = (title: string, description: string, priority: IssuePriority) => {
    const newIssue: Issue = {
      id: Date.now().toString(),
      title,
      description,
      status: 'open',
      priority,
      createdAt: new Date(),
    };
    setIssues([newIssue, ...issues]);
  };

  const handleStatusChange = (id: string, status: IssueStatus) => {
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, status } : issue
    ));
  };

  const handleDelete = (id: string) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  const getStatusCount = (status: IssueStatus) => {
    return issues.filter(issue => issue.status === status).length;
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Issue Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track your project issues</p>
        </header>

        <div className="mb-6">
          <IssueForm onSubmit={handleCreateIssue} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All ({issues.length})
              </button>
              <button
                onClick={() => setFilter('open')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'open'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Open ({getStatusCount('open')})
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'in-progress'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                In Progress ({getStatusCount('in-progress')})
              </button>
              <button
                onClick={() => setFilter('closed')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === 'closed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Closed ({getStatusCount('closed')})
              </button>
            </div>
          </div>
        </div>

        <IssueList
          issues={issues}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          filterStatus={filter}
        />
      </div>
    </main>
  );
}
