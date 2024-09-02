"use client";
import React, { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskTable from "./TaskTable";
import {
  fetchTodosAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "@/services/todos.services";
import AddTaskModal from "./AddTaskModal";
import TaskDetailsModal from "./TaskDetailsModal";
import TopBar from "./TopBar";
import { AuthContextType, useAuth } from "@/context/AuthContext";

const initialTasks: Record<"todo" | "inProgress" | "done", Task[]> = {
  todo: [],
  inProgress: [],
  done: [],
};

const Dashboard = () => {
  const { user,token } = useAuth();
  const authContext:AuthContextType={
    user:user,
    token:token
  }
  const [tasks, setTasks] =
    useState<Record<"todo" | "inProgress" | "done", Task[]>>(initialTasks);
  const [newTask, setNewTask] = useState<{ name: string; description: string }>(
    { name: "", description: "" }
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<"newest" | "oldest">(
    "newest"
  );

  const loadTodos = useCallback(
    async (query: string) => {
      try {
        setLoading(true);
        if (user) {
          const todos = await fetchTodosAPI(authContext, query);

          const sortedTasks = {
            todo: todos.tasks.filter((task: Task) => task.progress === "todo"),
            inProgress: todos.tasks.filter(
              (task: Task) => task.progress === "inProgress"
            ),
            done: todos.tasks.filter((task: Task) => task.progress === "done"),
          };

          setTasks(sortedTasks);
        }
      } catch (error) {
        console.error("Failed to load todos:", error);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  useEffect(() => {
    loadTodos(searchQuery);
  }, [searchQuery, loadTodos]);

  useEffect(() => {
    setTasks((prevTasks) => sortTasks(prevTasks, sortCriteria));
  }, [sortCriteria]);

  const sortTasks = (
    tasks: Record<"todo" | "inProgress" | "done", Task[]>,
    sortCriteria: "newest" | "oldest"
  ): Record<"todo" | "inProgress" | "done", Task[]> => {
    const sortByDate = (a: Task, b: Task) =>
      new Date(b.metadata.createdAt).getTime() -
      new Date(a.metadata.createdAt).getTime();
    const sortByOldestDate = (a: Task, b: Task) =>
      new Date(a.metadata.createdAt).getTime() -
      new Date(b.metadata.createdAt).getTime();

    switch (sortCriteria) {
      case "newest":
        return {
          todo: [...tasks.todo].sort(sortByDate),
          inProgress: [...tasks.inProgress].sort(sortByDate),
          done: [...tasks.done].sort(sortByDate),
        };
      case "oldest":
        return {
          todo: [...tasks.todo].sort(sortByOldestDate),
          inProgress: [...tasks.inProgress].sort(sortByOldestDate),
          done: [...tasks.done].sort(sortByOldestDate),
        };
      default:
        return tasks;
    }
  };

  const handleDrop = async (item: Task, column: keyof typeof initialTasks) => {
    try {
      setLoading(true);
      await updateTaskAPI(authContext,item._id, column);
      await loadTodos(searchQuery);
    } catch (error) {
      console.error("Failed to update task progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    try {
      setTasks((prevTasks) => {
        const updatedTasks: any = { ...prevTasks };
        for (const key in updatedTasks) {
          updatedTasks[key] = updatedTasks[key].filter(
            (task: any) => task._id !== taskId
          );
        }
        return updatedTasks;
      });

      await deleteTaskAPI(authContext,taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const addTask = async () => {
    const task = {
      name: newTask.name,
      description: newTask.description,
      progress: "todo",
      createdBy: user!.uid,
    };

    try {
      setLoading(true);
      await createTaskAPI(authContext,task);

      setNewTask({ name: "", description: "" });
      setIsModalOpen(false);

      await loadTodos(searchQuery);
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const openAddTaskModal = () => {
    setIsModalOpen(true);
  };

  // if (!user) return <SplashScreen />;

  return (
    <div className="container mx-auto px-[16px] md:px-[32px] lg:px-[48px] py-6">
      <TopBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        openAddTaskModal={openAddTaskModal}
      />

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskTable
              title="To Do"
              tasks={tasks.todo}
              handleDrop={(item) => handleDrop(item, "todo")}
              deleteTask={deleteTask}
              onViewDetails={handleViewDetails}
            />
            <TaskTable
              title="In Progress"
              tasks={tasks.inProgress}
              handleDrop={(item) => handleDrop(item, "inProgress")}
              deleteTask={deleteTask}
              onViewDetails={handleViewDetails}
            />
            <TaskTable
              title="Done"
              tasks={tasks.done}
              handleDrop={(item) => handleDrop(item, "done")}
              deleteTask={deleteTask}
              onViewDetails={handleViewDetails}
            />
          </div>
        </DndProvider>
      )}

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />

      <TaskDetailsModal
        task={selectedTask}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
