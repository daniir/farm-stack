type taskModel = {
    _id: string,
    name: string,
    description: string,
    status: boolean
}

type taskInputs = {
    name: string,
    description?: string,
}