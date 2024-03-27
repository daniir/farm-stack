import { useState, useEffect } from "react";
import { backendAPI } from './utils/axios';
import Layout from "./components/layout/Layout";
import ListItems from "./components/List";
import TaskForm from "./components/TaskForm";

function App() {

  const [data, setData] = useState<taskModel[] | []>([])
  const [updateTask, setUpdateTask] = useState<taskModel | null>(null)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  
  const refreshData = () => setCount(count + 1)
  const resetState = () => {
    setUpdateTask(null)
    setIsUpdate(false)
  }
  
  const getData = async () => {
    try {
      const { data } = await backendAPI.get("/tasks");
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getData()
  }, [count])

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="grid grid-cols-6">
          <div className="mt-8 col-span-2">
            <h2 className="mt-2.5 font-semibold italic text-center text-2xl">{ !isUpdate ? "Add new tasks": "Update tasks" }</h2>
            <TaskForm
              updateTask={updateTask}
              isUpdate={isUpdate}
              resetState={resetState}
              refreshData={refreshData}/>
          </div>
          <div className="mt-8 col-span-4">
            {
              data.length < 1 ?
                (
                  <div className="border-l-8 border-l-red-700 bg-red-400 rounded-md w-3/5 p-8 mx-auto">
                    <p className="text-white uppercase font-bold text-center">list empty</p>
                  </div>
                ) : (
                  data.map((d: taskModel) => (
                    <ListItems 
                      key={d._id} 
                      data={d} 
                      setUpdateTask={setUpdateTask}
                      setIsUpdate={setIsUpdate}
                      refreshData={refreshData}/>
                  ))
                )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
