import { formatDate } from "@/shared/function/helper.function";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { updateTaskAPI } from "@/services/todos.services";
import EditTaskModal from "./EditTaskModal";
import { AuthContextType, useAuth } from "@/context/AuthContext";

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: string) => void;
  onViewDetails: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, deleteTask, onViewDetails }) => {
  const { user,token } = useAuth();
  const authContext:AuthContextType={
    user:user,
    token:token
  }
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [currentTask, setCurrentTask] = useState(task);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask(currentTask._id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEdit = async (updatedTask: any) => {
    try {
      await updateTaskAPI(authContext,currentTask._id, updatedTask?.progress, updatedTask?.name, updatedTask?.description);
      setCurrentTask((prevTask) => ({
        ...prevTask,
        ...updatedTask,
      }));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div
      ref={drag as any}
      className={`p-4 mb-4 rounded-lg shadow-md ${isDragging ? "opacity-50" : "bg-gray-50"}`}
    >
      <h3 className="font-semibold text-lg">{currentTask.name}</h3>
      <p className="text-gray-600 mb-2">{currentTask.description}</p>
      <p className="text-sm text-gray-500 mb-4">Created at: {formatDate(currentTask.metadata.createdAt)}</p>
      <div className="flex flex-col lg:flex-row justify-end gap-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={onViewDetails}
        >
          View Details
        </button>
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
      </div>

      {isEditModalOpen && (
        <EditTaskModal
          task={currentTask}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
};

export default TaskCard;
