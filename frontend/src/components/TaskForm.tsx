//import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAxios } from "../hooks/useAxios";

type Props = {
    refreshData: () => void,
    updateTask: taskModel | null,
    isUpdate: boolean,
    resetState: () => void
}

function TaskForm({ refreshData, updateTask, isUpdate, resetState }: Props){

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<taskInputs>({
        defaultValues: updateTask!
    })

    const  { handleCreateTask, handleUpdateTask } = useAxios()
    
    setValue("name", updateTask ? updateTask.name : '');
    setValue("description", updateTask ? updateTask.description : '');
    


    const onSubmit: SubmitHandler<taskInputs> = (data) => {
        !isUpdate ? handleCreateTask(data) : handleUpdateTask(updateTask!._id, data)
        refreshData();
        reset();
        resetState();
    };
    

    return(
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            {
                errors.name?.type === "required" && (
                    <p className="text-red-800 underline my-0.5">*Nombre requerido</p>
                )
            }
            <input className="border-2 border-slate-600 py-2.5 px-3 mr-0.5 text-center my-0.5 rounded-md" 
                type="text"
                placeholder="name"
                {...register('name', { required: true })}
                
            />
            <textarea 
                className="border-2 border-slate-600 text-center resize-none my-0.5 rounded-md"
                rows={5}
                cols={9}
                placeholder="description" 
                {...register('description')}>
            </textarea>
            <button className={`${ !isUpdate ? "bg-blue-800 " : "bg-yellow-600" } rounded-md p-1.5 text-white mt-3`} 
                type="submit"
            >
                {
                    !isUpdate ? "Add" : "Update"
                }
            </button>
        </form>
    );
};

export default TaskForm;