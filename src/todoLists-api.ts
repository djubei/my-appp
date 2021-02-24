import axios from "axios";


export const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8334a105-f6c1-439a-ac3f-1ef8e2360995"
    }
}

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}


export const todoListsApi = {
    get() {
        return axios.get<TodoListType[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    },

    post(title: string) {
        return axios.post<ResponseType<{ item: TodoListType }>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title}, settings)
    },
    delete(todoListId: string) {
        return axios.delete<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)
    },
    put(todoListId: string, title: string) {
        return axios.put<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, {title}, settings)
    }


}