import { useState } from "react";
import { backendAPI } from "../utils/axios";

export function useAxios() {

    const [message, setMessage] = useState<string>("")

    const handleCreateTask = async(task: taskInputs) => {
        try {
            const { data } = await backendAPI.post('/tasks/', { 
                name: task.name,
                description: task.description
             })
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateTask = async(id: string, task: taskInputs) => {
        try {
            const { data } = await backendAPI.put(`/tasks/${id}`, { 
                name: task.name,
                description: task.description
             })
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateStatus = async (id: string, status: boolean, refreshData: () => void) => {
        try {
            const { data } = await backendAPI.put(`/tasks/status/${id}`, { status })
            setMessage(data.status.detail);
            refreshData();
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleDeleteTaskById = async(id: string, refreshData: () => void) => {
        try {
            const { data } = await backendAPI.delete(`/tasks/${id}`);
            setMessage(data);
            refreshData();
        } catch (error) {
            console.log(error)
        }
    }

    return {
        handleCreateTask,
        handleUpdateTask,
        handleUpdateStatus,
        handleDeleteTaskById,
        message
    }

}