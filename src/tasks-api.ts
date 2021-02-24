import axios from "axios";


export const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8334a105-f6c1-439a-ac3f-1ef8e2360995"
    }
}

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
        ...settings
    }
)


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}


export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type TaskResponseType = {
    error: string | null
    totalCount: null
    items: TaskType[]
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const taskListsApi = {
    get(todoListId: string) {
        /*   debugger*/
        return instance.get<TaskResponseType>(`/${todoListId}/tasks`)
    },

    post(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/${todoListId}/tasks`, {title})
    },
    delete(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`/${todoListId}/tasks/${taskId}`)
    },
    put(todoListId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<TaskType>>(`/${todoListId}/tasks/${taskId}`, model)
    }
}