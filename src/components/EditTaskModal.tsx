import React, { useState } from 'react';

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Partial<Task>) => void;
}

const EditTaskModal = ({ task, onClose, onSave }: EditTaskModalProps) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onSave({ name, description });
  };

 

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center px-[16px]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <label className="block mb-2">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
