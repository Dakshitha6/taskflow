import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';



const TaskTable = ({ title, tasks, handleDrop, deleteTask, onViewDetails }:ColumnProps) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: Task) => handleDrop(item),
  });

  return (
    <div ref={drop as any} className="bg-white p-4 rounded-lg shadow-md min-h-[200px] flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      {tasks.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 text-lg">No items</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="mb-2">
            <TaskCard
              task={task}
              deleteTask={deleteTask}
              onViewDetails={() => onViewDetails(task)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskTable;
