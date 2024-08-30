import axios from "axios";
import { getAuth } from "firebase/auth";


//for development
// const apiUrl = "http://localhost:5001";
//for prod
const apiUrl = "https://taskflow-server-production.up.railway.app";

export const fetchTodosAPI = async (firebaseUserId: string, search?: string) => {
  try {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authenticated");

    const idToken = await user.getIdToken();

    const payload: { userId: string; search?: string } = { userId: firebaseUserId };
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


export const createTaskAPI = async (taskData: {
  name: string;
  description: string;
  createdBy: string;
  progress: string;
}) => {
  try {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authenticated");
    const idToken = await user.getIdToken();

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
  taskId: string,
  progress?: string,
  name?: string,
  description?: string
) => {
  try {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authenticated");

    const idToken = await user.getIdToken();

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



export const deleteTaskAPI = async (taskId: string) => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("User not authenticated");
    const idToken = await user.getIdToken();
    const response = await axios.post(`${apiUrl}/deleteTask`,{id:taskId},{headers:{Authorization: `Bearer ${idToken}`}});
    return response.data;
  };