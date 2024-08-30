 interface Task {
    _id: string;
    name: string;
    description: string;
    metadata: {
      createdAt: string; 
      createdBy: string;
    };
    progress: "todo" | "inProgress" | "done";
  }

interface ColumnProps {
  title: string;
  tasks: Task[];
  handleDrop: (item: Task) => void;
  deleteTask: (taskId: string) => void; 
  onViewDetails: (task: Task) => void;
}

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: string) => void; 
  onViewDetails: (task: Task) => void;

}
