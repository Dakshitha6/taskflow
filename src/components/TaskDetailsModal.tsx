import { formatDate } from '@/shared/function/helper.function';
import React from 'react';

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetailsModal= ({ task, isOpen, onClose }:TaskDetailsModalProps) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 p-[16px]">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Task Details</h2>
        <p className="text-lg font-semibold mb-2">Title: {task.name}</p>
        <p className="text-gray-600 mb-2">Description: {task.description}</p>
        <p className="text-sm text-gray-500 mb-4">Created at: {formatDate(task.metadata.createdAt)}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
