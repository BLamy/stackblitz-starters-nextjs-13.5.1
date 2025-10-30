'use client';

import { Issue, IssueStatus } from '../types';
import IssueItem from './IssueItem';

interface IssueListProps {
  issues: Issue[];
  onStatusChange: (id: string, status: IssueStatus) => void;
  onDelete: (id: string) => void;
  filterStatus?: IssueStatus | 'all';
}

export default function IssueList({ issues, onStatusChange, onDelete, filterStatus = 'all' }: IssueListProps) {
  const filteredIssues = filterStatus === 'all'
    ? issues
    : issues.filter(issue => issue.status === filterStatus);

  if (filteredIssues.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No issues found</p>
        <p className="text-sm mt-2">Create your first issue to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredIssues.map(issue => (
        <IssueItem
          key={issue.id}
          issue={issue}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
