import React from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  newTask: { name: string; description: string };
  setNewTask: React.Dispatch<React.SetStateAction<{ name: string; description: string }>>;
  addTask: () => void;
}

const AddTaskModal= ({ isOpen, onClose, newTask, setNewTask, addTask }:TaskModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 px-[16px]">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full mb-4"
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border rounded-lg px-4 py-2 w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200">
            Cancel
          </button>
          <button onClick={addTask} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
