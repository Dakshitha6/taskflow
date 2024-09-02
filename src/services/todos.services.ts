import { AuthContextType } from "@/context/AuthContext";
import axios from "axios";


const apiUrl =process.env.SERVER_URL || "http://localhost:5001";

export const fetchTodosAPI = async (authContext: AuthContextType, search?: string) => {
  try{
    const user =authContext?.user;
    if (!user) throw new Error("User not authenticated");

    const idToken = authContext?.token;

    const payload: { userId: string; search?: string } = { userId: authContext.user!.uid };
    if (search) {
      payload.search = search;
    }

    console.log('`${apiUrl}/getAllTasks`', `${apiUrl}/getAllTasks`)
    const response = await axios.post(
      `${apiUrl}/getAllTasks`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};


export const createTaskAPI = async (authContext: AuthContextType,taskData: {
  name: string;
  description: string;
  createdBy: string;
  progress: string;
}) => {
  try {
    const user =authContext?.user;
    if (!user) throw new Error("User not authenticated");
    const idToken = authContext?.token;

    const response = await axios.post(`${apiUrl}/createTask`, taskData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};


export const updateTaskAPI = async (
  authContext: AuthContextType,
  taskId: string,
  progress?: string,
  name?: string,
  description?: string
) => {
  try {
    const user =authContext?.user;
    if (!user) throw new Error("User not authenticated");

    const idToken = authContext?.token;

    const response = await axios.post(
      `${apiUrl}/updateTask`,
      {
        id: taskId,
      name,
      description,
      progress,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw new Error("Failed to update task");
  }
};



export const deleteTaskAPI = async (authContext: AuthContextType,taskId: string) => {
  const user =authContext?.user;
    if (!user) throw new Error("User not authenticated");
    const idToken = authContext?.token;
    const response = await axios.post(`${apiUrl}/deleteTask`,{id:taskId},{headers:{Authorization: `Bearer ${idToken}`}});
    return response.data;
  };