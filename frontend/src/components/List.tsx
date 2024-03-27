import { useAxios } from "../hooks/useAxios"

type Props = {
    data: taskModel,
    refreshData: () => void,
    setUpdateTask: React.Dispatch<React.SetStateAction<taskModel | null>>,
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

function ListItems({ data, refreshData, setUpdateTask, setIsUpdate }: Props) {

    const { 
        handleUpdateStatus,
        handleDeleteTaskById
     } = useAxios()

     const update = (data: taskModel) => {
        setUpdateTask(data)
        setIsUpdate(true)
     }

    return (
        <ul className="list-none">
            <li className="bg-neutral-100 p-3 my-2 rounded-lg w-4/5 mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex justify-between items-center">
                    <div className="ml-5 uppercase font-fold cursor-pointer" onClick={() => update(data)}>
                        <h3>{ data.name }</h3>
                        <p>{ data.description }</p>
                    </div>
                    <div>
                        <button 
                            className={ `${data.status ?  "bg-green-700" : "bg-red-700"} py-0.5 px-3.5 text-white rounded-full mr-2` }
                            onClick={ () => handleUpdateStatus(data._id, !data.status, refreshData) }
                            >
                                { data.status ? "Completa" : "Pendiente" }
                            </button>
                        <button 
                            className="bg-black py-0.5 px-3.5 text-white rounded-full hover:bg-white hover:border-2 hover:border-black hover:text-black"
                            onClick={ () => handleDeleteTaskById(data._id, refreshData) }
                            >
                                Eliminar
                            </button>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default ListItems;